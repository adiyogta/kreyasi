import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AlvyyatunJhoniComponent } from './undangan/alvyyatun-main/alvyyatun-jhoni.component';
import { AlvyyatunMainComponent } from './undangan/alvyyatun-main/alvyyatun-main.component';

export const routes: Routes = [
    // Route untuk halaman utama (HomeComponent)
    { path: '', component: HomeComponent },

    // Route untuk undangan Jhoni & Alvyyatun
    { path: 'jhoni-alvyyatun',
        children: [
            // Route default tanpa guestName
            { path: '', title: 'Jhoni & Alvyyatun', component: HomeComponent },

            // Route dengan guestName
            { path: ':guestName',
                children: [
                    // Route untuk guestName, tetap menampilkan AlvyyatunJhoniComponent
                    { path: '', title: 'Jhoni & Alvyyatun', component: AlvyyatunJhoniComponent },

                    // Route untuk halaman utama undangan (AlvyyatunMainComponent) ketika URL adalah /jhoni-alvyyatun/:guestName/main
                    { path: 'main', title: 'Jhoni & Alvyyatun', component: AlvyyatunMainComponent },
                ]
            }
        ]
    }
];
