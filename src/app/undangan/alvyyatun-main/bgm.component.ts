import { Component, OnInit, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-background-music',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="fixed bottom-3 right-3 z-50 flex flex-col items-center gap-2">
      <!-- Volume Slider (shows when music is playing) -->
      @if (isPlaying()) {
        <div 
          class="bg-[#58010F]/10 p-2 rounded-lg shadow-lg transition-all duration-300 transform hover:bg-[#58010F] rotate-90 mb-4"
          style="width: 80px;"
        >
          <div class="flex items-center gap-2">
            <!-- Volume Icon -->
            <button 
              (click)="toggleMute()" 
              class="text-white hover:text-gray-200 transition-colors"
            >
              @if (isMuted()) {
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clip-rule="evenodd"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"/>
                </svg>
              } @else {
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/>
                </svg>
              }
            </button>
            
            <!-- Volume Slider -->
            <input 
              type="range" 
              [value]="volume() * 100"
              (input)="updateVolume($event)"
              class="w-full h-1 bg-gray-300 rounded-full appearance-none cursor-pointer"
              min="0" 
              max="100" 
              step="1"
            >
          </div>
        </div>
      }

      <!-- Play/Pause Button -->
      <button 
        (click)="togglePlay()"
        class="bg-[#58010F] hover:bg-[#58010F]/80 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
        [class.animate-pulse]="isPlaying()"
      >
        @if (isPlaying()) {
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 4h4v16H6zM14 4h4v16h-4z" />
          </svg>
        } @else {
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
      </button>
    </div>
  `,
  styles: [`
    /* Custom slider styling */
    input[type="range"] {
      -webkit-appearance: none;
      background: transparent;
    }

    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 16px;
      width: 16px;
      border-radius: 50%;
      background: #ffffff;
      cursor: pointer;
      margin-top: -6px;
    }

    input[type="range"]::-moz-range-thumb {
      height: 16px;
      width: 16px;
      border-radius: 50%;
      background: #ffffff;
      cursor: pointer;
      border: none;
    }

    input[type="range"]::-webkit-slider-runnable-track {
      width: 50%;
      height: 4px;
      background: #ffffff50;
      border-radius: 2px;
    }

    input[type="range"]::-moz-range-track {
      width: 50%;
      height: 4px;
      background: #ffffff50;
      border-radius: 2px;
    }
  `]
})
export class BackgroundMusicComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private audio: HTMLAudioElement | null = null;
  private visibilityHandler: (() => void) | null = null;
  private previousVolume = 1;

  isPlaying = signal<boolean>(false);
  volume = signal<number>(1);
  isMuted = signal<boolean>(false);

  ngOnInit() {
    console.log('BackgroundMusicComponent initialized');
    if (isPlatformBrowser(this.platformId)) {
      this.audio = new Audio('https://res.cloudinary.com/dxeyja0ob/video/upload/v1728487210/KEMBANG_WANGI_-_VICKY_PRASETYO_Cover_by_Surepman_1_k9roc1.mp3');
      if (this.audio) {
        this.audio.loop = true;
        this.audio.volume = this.volume();
      }
      const shouldPlayMusicStr = localStorage.getItem('shouldPlayMusic');
      this.isPlaying.set(shouldPlayMusicStr === 'true');
  
      if (this.isPlaying()) {
        this.playAudio();
      }
      this.playAudio();
      this.visibilityHandler = this.handleVisibilityChange.bind(this);
      document.addEventListener('visibilitychange', this.visibilityHandler);
    }
  }

  playAudio() {
    if (this.audio) {
      this.audio.play().catch((error) => {
        console.log('Playback prevented:', error);
      });
      this.isPlaying.set(true);
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.audio) {
        this.audio.pause();
        this.audio = null;
      }
      if (this.visibilityHandler) {
        document.removeEventListener('visibilitychange', this.visibilityHandler);
      }
    }
  }

  togglePlay() {
    if (!this.audio || !isPlatformBrowser(this.platformId)) return;

    if (this.isPlaying()) {
      this.audio.pause();
      this.isPlaying.set(false);
    } else {
      this.audio.play().catch((error) => {
        console.log('Playback prevented:', error);
      });
      this.isPlaying.set(true);
    }
  }

  updateVolume(event: Event) {
    if (!this.audio || !isPlatformBrowser(this.platformId)) return;
    
    const value = Number((event.target as HTMLInputElement).value);
    const normalizedValue = value / 100;
    
    this.audio.volume = normalizedValue;
    this.volume.set(normalizedValue);
    
    if (normalizedValue > 0) {
      this.isMuted.set(false);
      this.previousVolume = normalizedValue;
    } else {
      this.isMuted.set(true);
    }
  }

  toggleMute() {
    if (!this.audio || !isPlatformBrowser(this.platformId)) return;

    if (this.isMuted()) {
      // Unmute
      this.audio.volume = this.previousVolume;
      this.volume.set(this.previousVolume);
      this.isMuted.set(false);
    } else {
      // Mute
      this.previousVolume = this.volume();
      this.audio.volume = 0;
      this.volume.set(0);
      this.isMuted.set(true);
    }
  }

  private handleVisibilityChange() {
    if (!this.audio || !isPlatformBrowser(this.platformId)) return;

    if (document.hidden) {
      this.audio.pause();
      this.isPlaying.set(false);
    } else if (this.isPlaying()) {
      this.audio.play().catch((error) => {
        console.log('Playback prevented:', error);
      });
    }
  }
}