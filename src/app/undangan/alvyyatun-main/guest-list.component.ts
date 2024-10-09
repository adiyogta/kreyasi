import { Component, OnInit, OnDestroy, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { interval, Subscription, BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, catchError, tap, first } from 'rxjs/operators';
import { trigger, transition, style, animate } from '@angular/animations';

interface Guest {
  nama: string;
  ucapan: string;
  kehadiran: string;
  timestamp: number;
}

@Component({
  selector: 'app-guest-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
  <div class="container mx-auto px-4 p-8">
    <div class="bg-[#F7BE84] bg-card-2 rounded-xl p-6 shadow-inner">
      <div class="bg-[#58010F] bg-opacity-70 mx-auto rounded-xl p-2 mb-2 items-center">
        <h2 class="text-3xl font-medium font-serif mb-2 text-center text-white">Wishes</h2>
        <p class="text-white text-sm md:text-md mb-4 text-center">Ucapan, harapan, dan do'a kepada kedua mempelai</p>
      </div>
      
      <div class="h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
        <ng-container *ngIf="guests$ | async as guestList">
          <!-- No Guests Message -->
          <div *ngIf="guestList.length === 0 && !error" class="bg-[#F7BE84]/50 rounded-full text-[#58010F] text-center p-2">
            Belum ada tamu
          </div>

          <!-- Guest List -->
          <div *ngIf="guestList.length > 0" class="grid grid-cols-1 gap-6">
            <div *ngFor="let guest of guestList; trackBy: trackByName" 
                 class="bg-white shadow-lg rounded-xl p-4 md:p-6"
                 [@fadeIn]>
              <div class="flex items-center justify-start mb-2">
                <h3 class="text-md font-semibold text-gray-800 truncate">{{ guest.nama }}</h3>
                <span class="ml-2">
                  <svg *ngIf="guest.kehadiran === 'Hadir'" class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <svg *ngIf="guest.kehadiran !== 'Hadir'" class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </span>
              </div>
              <p class="text-gray-600 text-sm italic transition duration-300 ease-in-out transform hover:scale-105 hover:translate-x-2">"{{ guest.ucapan }}"</p>
            </div>
          </div>
        </ng-container>

        <!-- Error Message -->
        <div *ngIf="error" class="text-red-500 text-center p-4">
          {{ error }}
        </div>
      </div>
    </div>
  </div>
  `,
  styles: `
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(247, 100, 120, 0.8);
    border-radius: 7px;
  }
  
  .bg-card-2 {
    position: relative;
    background-image: 
    linear-gradient(rgba(241,239,228, 0.8), rgba(241,239,228, 0.8)),
    url('https://res.cloudinary.com/dvqq3izfb/image/upload/v1728484658/bg2_a3hvpt.png'),
    url('https://res.cloudinary.com/dvqq3izfb/image/upload/v1728484659/bg1_bcuaos.png');
    background-position: center;
    image-rendering: optimizeQuality;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center, center;
    opacity: 1;
  }
  `,
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class GuestListComponent implements OnInit, OnDestroy {
  private guestsSubject = new BehaviorSubject<Guest[]>([]);
  guests$: Observable<Guest[]> = this.guestsSubject.asObservable();
  error: string | null = null;
  private updateSubscription!: Subscription;
  private apiUrl: string = 'https://script.google.com/macros/s/AKfycbw_rMcTyxrn7VtJWHCPrF7tmDFRyPnXOJr95QkO8w0uqUY648jsicSDxYFNzsKIY5ps/exec';

  constructor(private http: HttpClient, private applicationRef: ApplicationRef) {}

  ngOnInit() {
    this.loadGuests();
    
    // Check for application stability before starting the interval
    this.applicationRef.isStable.pipe(first(isStable => isStable)).subscribe(() => {
      this.startAutoRefresh();
    });
  }

  ngOnDestroy() {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }

  loadGuests() {
    this.http.get<{ data: Guest[] }>(this.apiUrl).pipe(
      tap(response => this.updateGuestList(response.data)),
      catchError(this.handleError.bind(this))
    ).subscribe();
  }

  startAutoRefresh() {
    this.updateSubscription = interval(500).pipe(
      switchMap(() => this.http.get<{ data: Guest[] }>(this.apiUrl).pipe(
        catchError(error => {
          console.error('Error refreshing guests:', error);
          return of(null);
        })
      ))
    ).subscribe(
      response => {
        if (response) {
          this.updateGuestList(response.data);
          this.error = null;
        }
      }
    );
  }

  private updateGuestList(newGuests: Guest[]) {
    const currentGuests = this.guestsSubject.getValue();
    const updatedGuests = this.mergeGuestLists(currentGuests, newGuests);
    this.guestsSubject.next(updatedGuests);
  }

  private mergeGuestLists(currentGuests: Guest[], newGuests: Guest[]): Guest[] {
    const mergedGuests = [...currentGuests];
    
    newGuests.forEach(newGuest => {
      const existingIndex = mergedGuests.findIndex(g => g.nama === newGuest.nama);
      if (existingIndex === -1) {
        mergedGuests.unshift({ ...newGuest, timestamp: Date.now() });
      } else {
        mergedGuests[existingIndex] = { ...newGuest, timestamp: mergedGuests[existingIndex].timestamp };
      }
    });

    return mergedGuests;
  }

  private handleError(error: HttpErrorResponse) {
    this.error = 'Data tidak dapat diambil. Cek koneksi Anda kembali.';
    return of(null);
  }

  trackByName(index: number, guest: Guest): string {
    return guest.nama;
  }
}
