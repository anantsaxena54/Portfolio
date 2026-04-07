import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortfolioService } from '../../services/portfolio.service';
import { ContactMessage } from '../../models/portfolio.models';
import { MagneticDirective } from '../../directives/magnetic.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, MagneticDirective],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, AfterViewInit {
  profile: any;
  sending = false;
  formStatus: 'idle' | 'success' | 'error' = 'idle';
  formMsg = '';

  form: ContactMessage = { name: '', email: '', subject: '', message: '' };

  constructor(private portfolioService: PortfolioService, private el: ElementRef) {}

  ngOnInit() {
    this.profile = this.portfolioService.getProfile();
  }

  ngAfterViewInit() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.15 });
    this.el.nativeElement.querySelectorAll('.fade-in')
      .forEach((el: Element) => observer.observe(el));
  }

  onSubmit() {
    if (this.sending) return;
    this.sending = true;
    this.formStatus = 'idle';

    this.portfolioService.sendContactMessage(this.form).subscribe({
      next: (res) => {
        this.sending = false;
        if (res.success) {
          this.formStatus = 'success';
          this.formMsg = '✓ Message sent! I\'ll get back to you soon.';
          this.form = { name: '', email: '', subject: '', message: '' };
        } else {
          this.formStatus = 'error';
          this.formMsg = res.message || 'Something went wrong. Please try again.';
        }
      },
      error: () => {
        this.sending = false;
        this.formStatus = 'error';
        this.formMsg = '⚠ Backend not running. Start Spring Boot on port 8080 to send messages.';
      }
    });
  }
}
