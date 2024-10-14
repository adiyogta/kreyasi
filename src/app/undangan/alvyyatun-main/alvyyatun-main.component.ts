import { Component, OnInit, OnDestroy, PLATFORM_ID, inject, ViewChildren, QueryList, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { signal } from '@angular/core';
import { WeddingGiftComponent } from "./wedding-gift.component";
import { GuestFormComponent } from "./guest-form.component";
import { GuestListComponent } from "./guest-list.component";
import { BackgroundMusicComponent } from "./bgm.component";
import { FloatingNavComponent } from "./floating-nav.component";
import { AlvyyatunJhoniComponent } from "./alvyyatun-jhoni.component";
import { ActivatedRoute } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';


interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

@Component({
  selector: 'app-alvyyatun-main',
  standalone: true,
  imports: [CommonModule, WeddingGiftComponent, GuestFormComponent, GuestListComponent, BackgroundMusicComponent, FloatingNavComponent, AlvyyatunJhoniComponent],
  templateUrl: './alvyyatun-main.component.html',
  styleUrl: './alvyyatun-main.component.css',
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        animate(300, style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate(300, style({ opacity: 0 })),
      ])
    ])
  ]
})
export class AlvyyatunMainComponent implements OnInit, OnDestroy{
  private platformId = inject(PLATFORM_ID);
  private intervalId: number | null = null;
  private readonly targetDate = new Date('2024-10-19T08:00:00+07:00'); // Sesuai dengan tanggal akad
  guestName: string | null = "Nama Tamu";
  isPlaying = true;
  isOlderIphone = false;
  // animasi
  // animasi
  animations = ['fadeInUp', 'fadeInLeft', 'fadeInRight', 'zoomIn', 'bounceIn'];

  @ViewChildren('animatedItem') animatedItems!: QueryList<ElementRef>;
  constructor(private renderer: Renderer2,private readonly route: ActivatedRoute) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initScrollAnimation();
    }
  }

  private initScrollAnimation() {
    if (typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry, index) => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
              this.renderer.setStyle(entry.target, 'opacity', '1');
              this.renderer.addClass(entry.target, 'animate');
              this.renderer.addClass(entry.target, this.animations[index % this.animations.length]);
              this.renderer.addClass(entry.target, 'animated'); // Menandai bahwa elemen telah dianimasikan
              
              // Hapus kelas animasi setelah animasi selesai
              setTimeout(() => {
                this.renderer.removeClass(entry.target, 'animate');
                this.animations.forEach(anim => this.renderer.removeClass(entry.target, anim));
              }, 6000); // Sesuaikan dengan durasi animasi terlama
            }
          });
        },
        { threshold: 0.25 }
      );

      this.animatedItems.forEach(item => observer.observe(item.nativeElement));
    }
  }
  // animasi

  shouldLastImageSpan(): boolean {
    // For 4 columns grid
    // If the total number of images when divided by 4 leaves a remainder of 1,
    // the last image should span 2 columns to fill the empty space
    return this.photos.length % 4 === 1;
  }

  timeLeft = signal<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  ngOnInit() {
    this.guestName = this.route.snapshot.paramMap.get('guestName');
    if (isPlatformBrowser(this.platformId)) {
      this.calculateTimeLeft();
      this.intervalId = window.setInterval(() => {
        this.calculateTimeLeft();
      }, 1000);
    }
    this.showModalPage = true;
  }

  ngOnDestroy() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
    }
  }

  private calculateTimeLeft(): void {
    const now = new Date().getTime();
    const distance = this.targetDate.getTime() - now;

    if (distance < 0) {
      this.timeLeft.set({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      });
      if (this.intervalId !== null) {
        clearInterval(this.intervalId);
      }
      return;
    }

    this.timeLeft.set({
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000)
    });
  }
  // ----galeri----

  photos: Array<{url: string, title: string, alt: string}> = [
    // { 
    //   "url": "https://res.cloudinary.com/dxeyja0ob/image/upload/v1728400113/IMG_0453_-_Alvyyatun_Fauziah_znxwqg.jpg", 
    //   "title": "Photo 1", 
    //   "alt": "kreyasi bikin undangan pernikahan template membuat video online digital murah cepat WA link"
    // },
    { 
      "url": "https://res.cloudinary.com/dxeyja0ob/image/upload/v1728308218/1727481278154_-_Alvyyatun_Fauziah_dfolcf.jpg", 
      "title": "Photo 2", 
      "alt": "kreyasi bikin undangan pernikahan template membuat video online digital murah cepat WA link"
    },
    { 
      "url": "https://res.cloudinary.com/dxeyja0ob/image/upload/v1728308218/1727481564956_-_Alvyyatun_Fauziah_equliv.jpg", 
      "title": "Photo 3", 
      "alt": "kreyasi bikin undangan pernikahan template membuat video online digital murah cepat WA link"
    },
    { 
      "url": "https://res.cloudinary.com/dxeyja0ob/image/upload/v1728308217/1727480628258_-_Alvyyatun_Fauziah_ejbc3u.jpg", 
      "title": "Photo 4", 
      "alt": "kreyasi bikin undangan pernikahan template membuat video online digital murah cepat WA link"
    },
    { 
      "url": "https://res.cloudinary.com/dxeyja0ob/image/upload/v1728308217/1727480481052_-_Alvyyatun_Fauziah_pq9mwu.jpg", 
      "title": "Photo 5", 
      "alt": "kreyasi bikin undangan pernikahan template membuat video online digital murah cepat WA link"
    },
    { 
      "url": "https://res.cloudinary.com/dxeyja0ob/image/upload/v1728308217/1727481008330_-_Alvyyatun_Fauziah_tfckaa.jpg", 
      "title": "Photo 6", 
      "alt": "kreyasi bikin undangan pernikahan template membuat video online digital murah cepat WA link"
    },
    { 
      "url": "https://res.cloudinary.com/dxeyja0ob/image/upload/v1728308216/1727137277527_-_Alvyyatun_Fauziah_acp17a.jpg", 
      "title": "Photo 7", 
      "alt": "kreyasi bikin undangan pernikahan template membuat video online digital murah cepat WA link"
    },
    { 
      "url": "https://res.cloudinary.com/dxeyja0ob/image/upload/v1728308216/1720146939761_-_Alvyyatun_Fauziah_uz6qhb.jpg", 
      "title": "Photo 8", 
      "alt": "kreyasi bikin undangan pernikahan template membuat video online digital murah cepat WA link"
    },
    { 
      "url": "https://res.cloudinary.com/dxeyja0ob/image/upload/v1728308216/1727480844234_-_Alvyyatun_Fauziah_osm0bh.jpg", 
      "title": "Photo 9", 
      "alt": "kreyasi bikin undangan pernikahan template membuat video online digital murah cepat WA link"
    },
    { 
      "url": "https://res.cloudinary.com/dxeyja0ob/image/upload/v1728308216/1727479964611_-_Alvyyatun_Fauziah_aufldw.jpg", 
      "title": "Photo 10", 
      "alt": "kreyasi bikin undangan pernikahan template membuat video online digital murah cepat WA link"
    },
    { 
      "url": "https://res.cloudinary.com/dxeyja0ob/image/upload/v1728308216/1720147284415_-_Alvyyatun_Fauziah_jdt15p.jpg", 
      "title": "Photo 11", 
      "alt": "kreyasi bikin undangan pernikahan template membuat video online digital murah cepat WA link"
    }
  ]
  ;

  showModalPage: boolean = false;

  closeModal2(): void {
    this.showModalPage = false;
  }

  showModal = false;
  currentIndex = 0;

  openModal(index: number) {
    this.currentIndex = index;
    this.showModal = true;
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  closeModal() {
    this.showModal = false;
    document.body.style.overflow = ''; // Restore scrolling
  }

  prevPhoto() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  nextPhoto() {
    if (this.currentIndex < this.photos.length - 1) {
      this.currentIndex++;
    }
  }

  private handleKeydown(event: KeyboardEvent) {
    if (!this.showModal) return;
    
    switch (event.key) {
      case 'ArrowLeft':
        this.prevPhoto();
        break;
      case 'ArrowRight':
        this.nextPhoto();
        break;
      case 'Escape':
        this.closeModal();
        break;
    }
  }
}
