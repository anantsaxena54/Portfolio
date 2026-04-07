import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';
import { ThreeSceneService } from '../../services/three-scene.service';
import { MagneticDirective } from '../../directives/magnetic.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, MagneticDirective],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit, AfterViewInit, OnDestroy {
  profile: any;
  typedText = '';
  private roleIndex = 0;
  private charIndex = 0;
  private deleting = false;
  private typeTimer: any;

  constructor(
    private portfolioService: PortfolioService,
    private threeScene: ThreeSceneService,
    private el: ElementRef
  ) {}

  ngOnInit() {
    this.profile = this.portfolioService.getProfile();
    setTimeout(() => this.type(), 800);
  }

  ngAfterViewInit() {
    const canvas = document.getElementById('canvas3d') as HTMLCanvasElement;
    if (canvas) this.threeScene.init(canvas);
  }

  private type() {
    const word = this.profile.roles[this.roleIndex];
    if (!this.deleting) {
      this.typedText = word.slice(0, this.charIndex + 1);
      this.charIndex++;
      if (this.charIndex === word.length) {
        this.deleting = true;
        this.typeTimer = setTimeout(() => this.type(), 1800);
        return;
      }
    } else {
      this.typedText = word.slice(0, this.charIndex - 1);
      this.charIndex--;
      if (this.charIndex === 0) {
        this.deleting = false;
        this.roleIndex = (this.roleIndex + 1) % this.profile.roles.length;
      }
    }
    this.typeTimer = setTimeout(() => this.type(), this.deleting ? 60 : 100);
  }

  scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  ngOnDestroy() { clearTimeout(this.typeTimer); }
}
