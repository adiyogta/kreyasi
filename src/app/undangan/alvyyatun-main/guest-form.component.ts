import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Guest {
  nama: string;
  ucapan: string;
  kehadiran: string;
}

@Component({
  selector: 'app-guest-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template:`
 <div class="bg-[#FEFBE8] bg-card-2 py-6 px-2 md:px-4 rounded-xl">
      <div class="max-w-md mx-auto">
        <!-- Header Decoration -->
        <div class="text-center mb-2">
          <div class="text-brown-600 mb-2">❈❈❈</div>
          <h2 class="text-3xl font-semibold bg-[#FEFBE8]/60 p-2 rounded-lg text-amber-900 mb-2 font-serif">Lenggah Atur RSVP</h2>
          <div class="text-brown-600">❈❈❈</div>
        </div>

        <div class="container mx-auto px-4 py-8">
          <form (ngSubmit)="submitForm()" class="max-w-6xl mx-auto bg-[#58010F] shadow-xl rounded-lg p-8 text-white text-center">
            <!-- Nama -->
            <div class="relative mb-6">
              <label for="nama" class="block mb-2 text-sm font-medium text-white">
                Nama
              </label>
              <input
                type="text"
                id="nama"
                name="nama"
                [(ngModel)]="guest.nama"
                required
                placeholder="Monggo dipun isi..."
                class="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-2 px-3 leading-25 transition-colors duration-200 ease-in-out"
              />
            </div>

            <!-- Ucapan -->
            <div class="relative mb-6">
              <label for="ucapan" class="block mb-2 text-sm font-medium text-white">
                Ucapan & Do'a
              </label>
              <textarea
                id="ucapan"
                name="ucapan"
                [(ngModel)]="guest.ucapan"
                required
                rows="4"
                class="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-2 px-3 leading-6 transition-colors duration-200 ease-in-out"
                placeholder="Monggo dipun paringi pandongo..."
              ></textarea>
            </div>

            <!-- Kehadiran -->
            <div class="relative mb-6">
              <label for="kehadiran" class="block mb-2 text-sm font-medium text-white">
                Kehadiran
              </label>
              <select
                id="kehadiran"
                name="kehadiran"
                [(ngModel)]="guest.kehadiran"
                required
                class="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
              >
                <option value="" disabled selected>Monggo dipun pilih...</option>
                <option value="Hadir">Hadir</option>
                <option value="Tidak Hadir">Tidak Hadir</option>
              </select>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              class="w-full font-semibold text-[#58010F] py-3 px-4 rounded-full bg-[#FEFBE8] hover:bg-[#FEFBE8]/40 hover:text-[#FEFBE8] transition duration-300"
            >
              Kirim
            </button>
          </form>
        </div>

        <!-- Footer Decoration -->
        <div class="text-center mt-2">
          <div class="text-brown-600">❈❈❈</div>
          <p class="text-amber-900 mt-2 font-serif">Matur Nuwun</p>
        </div>
      </div>
    </div>

    <!-- Modal Component -->
    <div *ngIf="isModalOpen" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 text-center">
      <div class="bg-white bg-card-2 p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
        <h3 class="text-xl font-bold mb-4 text-[#58010F]">{{ modalTitle }}</h3>
        <p class="text-[#58010F] mb-6">{{ modalMessage }}</p>
        <button 
          (click)="closeModal()" 
          class="rounded font-bold py-3 px-4 rounded-lg bg-[#58010F] hover:bg-white text-white hover:text-[#58010F] transition duration-300"
        >
          Tutup
        </button>
      </div>
    </div>
`,
  styles:`
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
export class GuestFormComponent {
  guest: Guest = {
    nama: '',
    ucapan: '',
    kehadiran: ''
  };

  isModalOpen = false;
  modalTitle = '';
  modalMessage = '';

  private readonly SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw_rMcTyxrn7VtJWHCPrF7tmDFRyPnXOJr95QkO8w0uqUY648jsicSDxYFNzsKIY5ps/exec';
  @Output() formSubmitted = new EventEmitter<void>();
  submitForm() {
    if (!this.isFormValid()) {
      this.showModal('Error', 'Data tamu tidak lengkap. Pastikan untuk mengisi semua kolom.');
      return;
    }

    fetch(this.SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.guest)
    })
    .then(response => {
      if (response.type === 'opaque') {
        this.handleSuccess();
        return null;
      }
      return response.json();
    })
    .then(data => {
      if (data) {
        console.log('Respon dari server:', data);
        this.handleSuccess();
      }
    })
    .catch(error => {
      console.error('Gagal mengirim data:', error);
      this.showModal('Error', `Gagal mengirim data: ${error.message}. Silakan coba lagi nanti.`);
    });
  }

  private isFormValid(): boolean {
    return !!this.guest.nama && !!this.guest.ucapan && !!this.guest.kehadiran;
  }

  private handleSuccess() {
    let message = `Terima kasih, ${this.guest.nama} Data kehadiran Anda telah terkirim.`;
  
  
  this.showModal('Sukses', message);
  this.resetForm();
  this.formSubmitted.emit();
  }

  private showModal(title: string, message: string) {
    this.modalTitle = title;
    this.modalMessage = message;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  private resetForm() {
    this.guest = {
      nama: '',
      ucapan: '',
      kehadiran: ''
    };
  }
}