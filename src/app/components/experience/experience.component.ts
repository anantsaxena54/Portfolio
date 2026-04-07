import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';
import { Experience } from '../../models/portfolio.models';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit, AfterViewInit {
  experiences: Experience[] = [];

  constructor(private portfolioService: PortfolioService, private el: ElementRef) {}

  ngOnInit() {
    this.experiences = this.portfolioService.getExperience();
  }

  ngAfterViewInit() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.15 });
    this.el.nativeElement.querySelectorAll('.timeline-item')
      .forEach((el: Element) => observer.observe(el));
  }

  toggleItem(exp: Experience) {
    exp.isOpen = !exp.isOpen;
  }
}
