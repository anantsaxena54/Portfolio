import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';
import { Certification } from '../../models/portfolio.models';

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.scss']
})
export class CertificationsComponent implements OnInit, AfterViewInit {
  certifications: Certification[] = [];

  constructor(private portfolioService: PortfolioService, private el: ElementRef) {}

  ngOnInit() {
    this.certifications = this.portfolioService.getCertifications();
  }

  ngAfterViewInit() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
        }
      });
    }, { threshold: 0.2 });

    this.el.nativeElement.querySelectorAll('.fade-in')
      .forEach((el: Element) => observer.observe(el));
  }
}
