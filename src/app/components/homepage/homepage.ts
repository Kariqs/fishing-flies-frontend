// home.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FooterComponent } from "../shared/footer/footer";

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface QuickContact {
  icon: string;
  label: string;
  value: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './homepage.html',
  imports: [CommonModule, RouterLink, FormsModule, FooterComponent],
})
export class HomeComponent {
  heroImage = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80';

  form: ContactForm = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  submitted = false;
  sending = false;
  success = false;

  subjectOptions: string[] = [
    'Order Enquiry',
    'Custom Pattern Request',
    'Wholesale / Bulk Order',
    'Shipping & Delivery',
    'Returns & Refunds',
    'General Question',
  ];

  quickContact: QuickContact[] = [
    {
      label: 'Email',
      value: 'hello@driftandrise.co.ke',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none"
                  stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
               <path stroke-linecap="round" stroke-linejoin="round"
                     d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15
                        a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0
                        0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5
                        0-9.75 6.75L2.25 6.75"/>
             </svg>`,
    },
    {
      label: 'Phone',
      value: '+254 700 000 000',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none"
                  stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
               <path stroke-linecap="round" stroke-linejoin="round"
                     d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0
                        002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106
                        c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542
                        -1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928
                        .38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963
                        3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0
                        002.25 4.5v2.25z"/>
             </svg>`,
    },
    {
      label: 'Location',
      value: 'Nakuru, Kenya',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none"
                  stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
               <path stroke-linecap="round" stroke-linejoin="round"
                     d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
               <path stroke-linecap="round" stroke-linejoin="round"
                     d="M19.5 10.5c0 7.142-7.5 11.25-7.5
                        11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
             </svg>`,
    },
  ];

  submitForm(): void {
    this.submitted = true;

    if (!this.form.name || !this.form.email || !this.form.subject || !this.form.message) {
      return;
    }

    this.sending = true;
    setTimeout(() => {
      this.sending = false;
      this.success = true;
      this.submitted = false;
      this.form = { name: '', email: '', subject: '', message: '' };

      setTimeout(() => (this.success = false), 6000);
    }, 1500);
  }
}
