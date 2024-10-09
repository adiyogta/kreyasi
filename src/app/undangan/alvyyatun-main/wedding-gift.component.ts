import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wedding-gift',
  standalone: true,
  imports: [CommonModule],
  template:`
  <div class="flex items-center justify-center p-4">
  <div class="bg-card-2 bg-[#F7BE84] rounded-lg shadow-lg p-4 sm:p-6 mx-auto container">
    <div class="bg-[#FEFBE8] bg-opacity-80 p-3 mb-2">
      <h1 class="text-center text-xl sm:text-2xl md:text-3xl font-bold text-[#58010F] mb-4">Wedding Gift</h1>
      <p class="text-center text-[#58010F] mb-6 text-sm sm:text-base px-2 sm:px-4 md:px-8">
        Doa Restu Anda merupakan karunia yang sangat berarti bagi kami. Dan jika memberi adalah ungkapan tanda kasih Anda, Anda dapat memberi kado secara cashless.
      </p>
    </div>
    <button 
      (click)="toggleBankCards()"
      class="bg-[#58010F] text-[#fefae1] px-8 py-3 rounded-full hover:bg-opacity-90 transition duration-300 flex items-center justify-center mx-auto text-sm sm:text-base"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4 sm:h-5 sm:w-5 mr-2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
      </svg>
      Klik Disini
    </button>
    
    <div *ngIf="showBankCards" class="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
      <div class="atm-card relative shadow-lg bg-white text-black p-3 sm:p-4 rounded-lg">
        <img src="https://upload.wikimedia.org/wikipedia/commons/9/97/Logo_BRI.png" alt="JAGO Logo" class="absolute top-2 right-2 h-6 sm:top-4 sm:right-4 sm:h-8">
        <div class="chip bg-gold h-4 w-6 sm:h-6 sm:w-8 rounded-sm mb-2 sm:mb-4"></div>
        <p class="font-semibold text-sm sm:text-lg mt-2 mb-1 sm:mb-2">Alvyyatun Fauziah</p>
        <div class="flex justify-between items-center tracking-widest mb-2 sm:mb-4">
          <span class="font-mono text-xs sm:text-base">1858 0100 3812 507</span>
          <button 
            (click)="copyToClipboard('185801003812507')"
            class="bg-white hove:bg-gray-300 font-bold text-blue-500 px-2 py-1 rounded text-xs sm:text-sm"
          >
            Copy
          </button>
        </div>
      </div>
      <div class="atm-card relative shadow-lg bg-white text-black p-3 sm:p-4 rounded-lg">
        <img src="https://shopeepay.co.id/src/pages/home/assets/images/new-homepage/new-spp-logo.svg" alt="JAGO Logo" class="absolute top-2 right-2 h-6 sm:top-4 sm:right-4 sm:h-8">
        <div class="chip bg-gold h-4 w-6 sm:h-6 sm:w-8 rounded-sm mb-2 sm:mb-4"></div>
        <p class="font-semibold text-sm sm:text-lg mt-2 mb-1 sm:mb-2">Alvyyatun Fauziah</p>
        <div class="flex justify-between items-center tracking-widest mb-2 sm:mb-4">
          <span class="font-mono text-xs sm:text-base">0852 6704 9273</span>
          <button 
            (click)="copyToClipboard('085267049273')"
            class="bg-white hove:bg-gray-300 font-bold text-orange-500 px-2 py-1 rounded text-xs sm:text-sm"
          >
            Copy
          </button>
        </div>
      </div>
      
    </div>
    
  </div>

  <!-- Toast Notification -->
  <div *ngIf="showToast" class="fixed top-1/2 transform -translate-y-1/2 left-1/2 transform -translate-x-1/2 items-center bg-opacity-80 justify-center text-center p-3 text-white rounded shadow-lg text-sm sm:text-base" [ngClass]="toastBackground">
    {{ toastMessage }}
  </div>


</div>

@if (showQRModal) {
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
    <div class="bg-white rounded-lg p-6 max-w-sm w-full">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">Kode QR</h2>
        <button (click)="closeQRModal()" class="text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="w-full aspect-square qris-bg"></div>
      <p class="mt-4 text-center text-sm text-gray-600">Terima Kasih</p>
    </div>
  </div>
}
  `,
  styles: `
/* wedding-gift.component.css */
.atm-card {
    aspect-ratio: 89 / 51;
    width: 100%;
    max-width: 280px; /* Sesuaikan ukuran maksimum sesuai kebutuhan */
    margin: 0 auto;
    background: linear-gradient(135deg, #f0f0f0 25%, #ffffff 75%);
    position: relative;
  }

  .atm-card .chip {
    background-color: #d4af37;
}

.atm-card button {
  white-space: nowrap;
    display: flex;
    align-items: center;
    justify-content: center;
}

.atm-card img {
    position: absolute;
    top: 1rem;
    right: 1rem;
}
  
  @media (min-width: 640px) {
    .atm-card {
      max-width: 100%;
    }
  }
  
  @media (min-width: 768px) {
    .atm-card {
      max-width: 360px;
    }
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
  `
})
export class WeddingGiftComponent {
  showBankCards = false;
  showToast = false;
  toastMessage = '';
  toastBackground = '';

  showQRModal: boolean = false;

  openQRModal() {
    this.showQRModal = true;
  }

  closeQRModal() {
    this.showQRModal = false;
  }

  toggleBankCards() {
    this.showBankCards = !this.showBankCards;
  }
  

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(
      () => {
        this.showToastMessage('Nomor rekening berhasil disalin, Terima Kasih', 'success');
      },
      (err) => {
        this.showToastMessage('Gagal menyalin nomor rekening', 'error');
      }
    );
  }

  showToastMessage(message: string, type: string) {
    this.toastMessage = message;
    this.showToast = true;

    // Memilih warna latar belakang berdasarkan jenis pesan
    if (type === 'success') {
      this.toastBackground = 'bg-green-500';
    } else if (type === 'error') {
      this.toastBackground = 'bg-red-500';
    }

    setTimeout(() => {
      this.showToast = false;
    }, 2000); // Hapus toast setelah 3 detik
  }
}
