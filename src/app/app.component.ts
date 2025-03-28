import { Component } from '@angular/core';
import { DfaCkeditorComponent } from './components/dfa-ckeditor/dfa-ckeditor.component';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { AudioStreamerService } from './services/audio-streamer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [DfaCkeditorComponent, CommonModule, MatTabsModule, MatButtonModule,]
})

export class AppComponent {

  ngOnInit() {
    this.loadModel();
  }

  constructor(private audioService: AudioStreamerService) { }

  tabs = [
    { title: 'Headline Statement', content: '' },
    { title: 'Outcome analytical statement of progress', content: '' },
    { title: 'Lesson Learned and Innovations', content: '' },
    { title: 'Details of UNICEFs contribution', content: '' },
    { title: 'Partnerships', content: '' },
  ];

  activeTabIndex = 0;

  onTabChange(index: number) {
    this.activeTabIndex = index;
  }

  selectedLanguage = 'english';
  async loadModel() {
    const selectedModel = '/assets/model-' + this.selectedLanguage + '.zip';
    await this.audioService.loadModel(selectedModel);
  }

}
