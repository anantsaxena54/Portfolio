import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cursor',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div id="cursor" [style.left.px]="cx - 5" [style.top.px]="cy - 5"
         [class.hovered]="isHovered"></div>
    <div id="cursor-ring" [style.left.px]="rx - 18" [style.top.px]="ry - 18"
         [class.hovered]="isHovered"></div>
  `,
  styles: [`
    #cursor {
      position: fixed; width: 10px; height: 10px;
      background: var(--purple); border-radius: 50%;
      pointer-events: none; z-index: 9999;
      transition: transform 0.15s, width 0.2s, height 0.2s;
      mix-blend-mode: screen;
      &.hovered { transform: scale(2.5); }
    }
    #cursor-ring {
      position: fixed; width: 36px; height: 36px;
      border: 1.5px solid rgba(139,92,246,0.5); border-radius: 50%;
      pointer-events: none; z-index: 9998;
      transition: border-color 0.2s;
      &.hovered { border-color: rgba(139,92,246,0.9); transform: scale(1.5); }
    }
  `]
})
export class CursorComponent implements OnInit, OnDestroy {
  cx = 0; cy = 0;
  rx = 0; ry = 0;
  isHovered = false;
  private rafId = 0;
  private listeners: (() => void)[] = [];

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.listeners.push(
      this.renderer.listen('document', 'mousemove', (e: MouseEvent) => {
        this.cx = e.clientX; this.cy = e.clientY;
      })
    );
    this.listeners.push(
      this.renderer.listen('document', 'mouseover', (e: MouseEvent) => {
        const el = e.target as HTMLElement;
        this.isHovered = !!(el.closest('a,button,.project-card,.timeline-card,.stat-card,.skill-orb,.contact-item'));
      })
    );
    this.animateRing();
  }

  private animateRing() {
    this.rx += (this.cx - this.rx) * 0.12;
    this.ry += (this.cy - this.ry) * 0.12;
    this.rafId = requestAnimationFrame(() => this.animateRing());
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.rafId);
    this.listeners.forEach(fn => fn());
  }
}
