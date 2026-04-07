import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';
import { Skill } from '../../models/portfolio.models';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit, AfterViewInit {
  skills: Skill[] = [];
  barsAnimated = false;

  constructor(private portfolioService: PortfolioService, private el: ElementRef) {}

  ngOnInit() {
    this.skills = this.portfolioService.getSkills();
  }

  ngAfterViewInit() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          if ((e.target as HTMLElement).classList.contains('skill-bars') && !this.barsAnimated) {
            this.barsAnimated = true;
            this.animateBars();
          }
        }
      });
    }, { threshold: 0.2 });

    this.el.nativeElement.querySelectorAll('.fade-in, .skill-bars')
      .forEach((el: Element) => observer.observe(el));
  }

  private animateBars() {
    const items = this.el.nativeElement.querySelectorAll('.skill-bar-item');
    items.forEach((item: HTMLElement, i: number) => {
      const pct = item.dataset['pct'] || '0';
      setTimeout(() => {
        const fill = item.querySelector('.skill-bar-fill') as HTMLElement;
        if (fill) fill.style.width = pct + '%';
      }, i * 120);
    });
  }
}
