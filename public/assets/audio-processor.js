class VoskProcessor extends AudioWorkletProcessor {
    process(inputs, outputs, parameters) {
        if (inputs.length > 0 && inputs[0].length > 0) {
            this.port.postMessage(inputs[0]); // Send audio data to main thread
        }
        return true;
    }
}

registerProcessor('vosk-processor', VoskProcessor);
