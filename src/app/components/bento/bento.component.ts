import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';
import { Stat, Skill } from '../../models/portfolio.models';
import { MagneticDirective } from '../../directives/magnetic.directive';
import { TerminalService } from '../../services/terminal.service';

@Component({
  selector: 'app-bento',
  standalone: true,
  imports: [CommonModule, MagneticDirective],
  templateUrl: './bento.component.html',
  styleUrls: ['./bento.component.scss']
})
export class BentoComponent implements OnInit, AfterViewInit {
  profile: any;
  skills: Skill[] = [];
  topSkills: Skill[] = [];

  constructor(
    private portfolioService: PortfolioService, 
    private el: ElementRef,
    public terminalService: TerminalService
  ) {}

  ngOnInit(): void {
    this.profile = this.portfolioService.getProfile();
    this.skills = this.portfolioService.getSkills();
    // Get top 6 skills for the mini grid
    this.topSkills = this.skills.slice(0, 6);
  }

  ngAfterViewInit() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    this.el.nativeElement.querySelectorAll('.fade-in').forEach((el: Element) => {
      observer.observe(el);
    });
  }

  scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  openTerminal() {
    this.terminalService.openTerminal();
  }
}
