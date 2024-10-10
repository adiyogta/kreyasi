import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-alvyyatun-jhoni',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterModule],
  template:`
<div class="min-h-screen max-h-screen bg-img bg-[#58010F] flex items-center justify-center p-8 md:p-8">
  <div class="md:hidden max-w-md w-full bg-[#FEFBE8] outline outline-offset-4 outline-1 outline-[#F7BE84] rounded-t-full shadow-xl overflow-hidden">
    <div class="relative">
      
      <!-- Konten utama dengan padding untuk menghindari tumpang tindih dengan frame -->
      <div class="relative text-center pt-16 px-4">
        <div class="flex justify-center">
          <div 
            class="w-48 h-48 bg-no-repeat bg-cover bg-center rounded-t-full border-4 border-[#58010F]/20"
            style="background-image: url('https://res.cloudinary.com/dxeyja0ob/image/upload/v1728308217/1727480481052_-_Alvyyatun_Fauziah_pq9mwu.jpg')"
          ></div>
        </div>

        <h1 class="text-xl font-serif text-brown-800 mt-4 mb-2">THE WEDDING OF</h1>
        <h2 class="text-4xl font-script text-red-800 mb-0">Jhoni</h2>
        <h2 class="text-2xl font-script text-red-800 mb-0">&</h2>
        <h2 class="text-4xl font-script text-red-800 mb-4">Alvyyatun</h2>

        <div class="text-gray-700 mb-4">
          <p class="mb-2">Kepada Yth.</p>
          <p class="mb-2">Bapak/Ibu/Saudara/i</p>
          <p>Tamu Undangan</p>
        </div>

        <button class="bg-red-800 text-white px-8 py-3 rounded-full hover:bg-red-900 transition-colors duration-300 mb-8">
          Open Invitation
        </button>
      </div>

      <!-- Frame bawah -->
      <div class="absolute bottom-0 left-0 right-0 flex justify-between">
        <div class="w-24 h-24 bg-contain bg-no-repeat rotate-[270deg]" style="background-image: url('https://res.cloudinary.com/dvqq3izfb/image/upload/v1728056730/frame_1_id5zr5.png')"></div>
        <div class="w-24 h-24 bg-contain bg-no-repeat rotate-180" style="background-image: url('https://res.cloudinary.com/dvqq3izfb/image/upload/v1728056730/frame_1_id5zr5.png')"></div>
      </div>
    </div>
  </div>

  <!-- Desktop Design -->
  <div class="hidden md:block max-w-6xl w-full">
    <div class="grid grid-cols-12 gap-4 bg-[#FEFBE8] rounded-xl shadow-2xl overflow-hidden outline outline-offset-8 outline-2 outline-[#F7BE84]">
      <!-- Left Section -->
      <div class="col-span-7 p-12 relative flex items-center">
        <!-- Frame Ornaments -->
        <div class="absolute top-0 left-0 w-32 h-32 bg-contain bg-no-repeat" 
             style="background-image: url('https://res.cloudinary.com/dvqq3izfb/image/upload/v1728056730/frame_1_id5zr5.png')">
        </div>
        <div class="absolute bottom-0 left-0 w-32 h-32 bg-contain bg-no-repeat rotate-[270deg]" 
             style="background-image: url('https://res.cloudinary.com/dvqq3izfb/image/upload/v1728056730/frame_1_id5zr5.png')">
        </div>
        
        <!-- Profile Image -->
        <div class="w-full flex justify-center items-center">
          <div 
            class="w-80 h-80 bg-no-repeat bg-cover bg-center rounded-full"
            style="background-image: url('https://res.cloudinary.com/dxeyja0ob/image/upload/v1728308217/1727480481052_-_Alvyyatun_Fauziah_pq9mwu.jpg')"
          ></div>
        </div>
      </div>

      <!-- Right Content Section -->
      <div class="col-span-5 p-12 flex flex-col justify-center relative">
        <!-- Frame Ornaments -->
        <div class="absolute top-0 right-0 w-32 h-32 bg-contain bg-no-repeat rotate-90" 
             style="background-image: url('https://res.cloudinary.com/dvqq3izfb/image/upload/v1728056730/frame_1_id5zr5.png')">
        </div>
        <div class="absolute bottom-0 right-0 w-32 h-32 bg-contain bg-no-repeat rotate-180" 
             style="background-image: url('https://res.cloudinary.com/dvqq3izfb/image/upload/v1728056730/frame_1_id5zr5.png')">
        </div>

        <!-- Content -->
        <div class="max-w-xl mx-auto text-center">
          <h1 class="text-3xl font-serif text-brown-800 mb-4">THE WEDDING OF</h1>
          
          <h2 class="text-6xl font-script text-red-800 mb-0">Jhoni</h2>
          <h2 class="text-4xl font-script text-red-800 mb-0">&</h2>
          <h2 class="text-6xl font-script text-red-800 mb-4">Alvyyatun</h2>
          
          <div class="my-8 p-8 border-t border-b border-[#F7BE84]">
            <p class="text-2xl text-gray-700 mb-4">Kepada Yth.</p>
            <p class="text-xl text-gray-700 mb-4">Bapak/Ibu/Saudara/i</p>
            <p class="text-3xl font-script text-red-800">{{guestName}}</p>
          </div>

          <button (click)="musicStatus()" [routerLink]="['/jhoni-alvyyatun/'+ guestName +'/main']" routerLinkActive="active" class="bg-red-800 text-white px-12 py-4 text-xl rounded-full hover:bg-red-900 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
            Open Invitation
          </button>
        </div>
      </div>
    </div>
  </div>
</div>`,
  styles:`.bg-cream-50 { 
    background-color: #FDFBF7;
    background-image: radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0);
    background-size: 40px 40px;
  }
  .font-script { font-family: 'Great Vibes', cursive; }
  .text-brown-800 { color: #5D4037; }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  :host {
    display: block;
    animation: fadeIn 1s ease-out;
  }

  /* Custom scroll reveal animations */
  @keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-50px); }
    to { opacity: 1; transform: translateX(0); }
  }

  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(50px); }
    to { opacity: 1; transform: translateX(0); }
  }

  .grid > div:first-child {
    animation: slideInLeft 1s ease-out;
  }

  .grid > div:last-child {
    animation: slideInRight 1s ease-out;
  }

  .bg-img {
    background-image: url('https://res.cloudinary.com/dvqq3izfb/image/upload/v1728310350/batik_h7ewt3.png');
    background-size: cover;
    background-blend-mode: soft-light;
    background-position: center;
  }`
})
export class AlvyyatunJhoniComponent implements OnInit {
  guestName: string | null = null;
  isPlaying = true;

  musicStatus() {
    localStorage.setItem('shouldPlayMusic', this.isPlaying ? 'true' : 'false');
  }

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.guestName = this.route.snapshot.paramMap.get('guestName');
  }
}