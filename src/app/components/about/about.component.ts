import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';
import { Stat } from '../../models/portfolio.models';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, AfterViewInit {
  stats: Stat[] = [];

  constructor(
    private portfolioService: PortfolioService,
    private el: ElementRef
  ) {}

  ngOnInit() {
    this.stats = this.portfolioService.getProfile().stats;
  }

  ngAfterViewInit() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    }, { threshold: 0.15 });

    this.el.nativeElement.querySelectorAll('.fade-in, .timeline-item')
      .forEach((el: Element) => observer.observe(el));
  }
}
