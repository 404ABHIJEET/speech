import { TestBed } from '@angular/core/testing';

import { AudioStreamerService } from './audio-streamer.service';

describe('AudioStreamerService', () => {
  let service: AudioStreamerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AudioStreamerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
