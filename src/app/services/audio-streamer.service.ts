import { Injectable, signal } from '@angular/core';
import { createModel, KaldiRecognizer, Model } from 'vosk-browser';
import * as winkNLP from 'wink-nlp-utils';

@Injectable({
  providedIn: 'root'
})

export class AudioStreamerService {
  private audioContext!: AudioContext;
  private processorNode!: AudioWorkletNode;
  private mediaStream!: MediaStream;
  private recognizer!: KaldiRecognizer;
  private model!: Model;
  private transcript = signal('');
  isListening = signal(false);

  async loadModel(modelPath: string) {
    const SAMPLE_RATE = 48000;
    this.model = await createModel(modelPath);
    this.recognizer = new this.model.KaldiRecognizer(SAMPLE_RATE);
    this.recognizer.setWords(true);
    this.recognizer.on("result", (message: any) => {
      let tmp = message.result.text;
      let text = tmp
      console.log("Final Result:", message.result.text);
      text = this.addPunctuation(tmp);
      text = this.wordsToNumbers(text)
      text += ' ';
      this.transcript.set(text);
    });

    // this.recognizer.on("partialresult", (message: any) => {
    //   console.log("Partial Result:", message.result.partial);
    //   const tmp = message.result.partial + ' ';
    //   this.transcript.set(tmp);
    // });

    console.log("Model Loaded:", modelPath);
  }

  async startRecognition() {
    if (this.isListening) {
      this.stopRecognition();
      this.isListening.set(false);
    }
    this.isListening.set(true);
    if (!this.model) {
      console.error("Model not loaded. Please load a model first.");
      return;
    }

    this.audioContext = new AudioContext({ sampleRate: 48000 });
    await this.audioContext.audioWorklet.addModule('/assets/audio-processor.js');

    this.processorNode = new AudioWorkletNode(this.audioContext, 'vosk-processor', {
      numberOfInputs: 1,
      numberOfOutputs: 0,
      processorOptions: { sampleRate: 48000 }
    });

    this.processorNode.port.onmessage = (event) => {
      const inputChannels: Float32Array[] = event.data;
      this.processMultiChannelAudio(inputChannels, 48000);
    };

    this.mediaStream = await navigator.mediaDevices.getUserMedia({
      video: false,
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 48000
      }
    });

    const source = this.audioContext.createMediaStreamSource(this.mediaStream);
    source.connect(this.processorNode);
    console.log("Speech recognition started.");
  }

  private processMultiChannelAudio(inputChannels: Float32Array[], sampleRate: number) {
    const numChannels = inputChannels.length;
    const frameLength = inputChannels[0].length;
    let monoData = new Float32Array(frameLength);
    for (let i = 0; i < frameLength; i++) {
      let sum = 0;
      for (let channel = 0; channel < numChannels; channel++) {
        sum += inputChannels[channel][i];
      }
      monoData[i] = sum / numChannels;
    }
    this.recognizer.acceptWaveformFloat(monoData, sampleRate);
  }

  stopRecognition() {
    if (!this.isListening()) {
      return
    }
    this.isListening.set(false);
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
    }
    if (this.audioContext) {
      this.audioContext.close();
    }
    console.log("Speech recognition stopped.");
  }

  getTranscript(): string {
    return this.transcript()
  }

  private addPunctuation(text: string): string {
    if (!text) return '';
    text = winkNLP.string.removeExtraSpaces(text);
    text = text.charAt(0).toUpperCase() + text.slice(1);
    if (!/[.!?]$/.test(text)) {
      text += '.';
    }
    return text;
  }

  wordsToNumbers(input: string): string {
    const numWords: Record<string, number> = {
      "one": 1, "two": 2, "three": 3, "four": 4, "five": 5,
      "six": 6, "seven": 7, "eight": 8, "nine": 9, "ten": 10,
      "eleven": 11, "twelve": 12, "thirteen": 13, "fourteen": 14,
      "fifteen": 15, "sixteen": 16, "seventeen": 17, "eighteen": 18,
      "nineteen": 19, "twenty": 20, "thirty": 30, "forty": 40,
      "fifty": 50, "sixty": 60, "seventy": 70, "eighty": 80, "ninety": 90,
      "hundred": 100, "thousand": 1000, "million": 1_000_000
    };

    return input.replace(/(?:\b(?:one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|thousand|million)\b\s*)+/gi, (match) => {
      let words = match.trim().split(/\s+/);
      let num = 0, temp = 0;

      for (let word of words) {
        let value = numWords[word.toLowerCase()];
        if (value === 100) {
          temp = temp ? temp * value : value;
        } else if (value === 1000 || value === 1_000_000) {
          temp = temp ? temp * value : value;
          num += temp;
          temp = 0; 
        } else {
          temp += value;
        }
      }
      num += temp;
      return num.toString() + ' ';
    });
  }

}
