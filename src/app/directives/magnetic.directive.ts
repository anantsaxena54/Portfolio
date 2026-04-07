import { Directive, ElementRef, HostListener, OnInit, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[appMagnetic]',
  standalone: true
})
export class MagneticDirective implements OnInit {
  // Magnet strength (pull factor). Higher number = stronger pull. Default is 20.
  @Input() magneticPull: number | string = 20;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    // Ensure the element has a smooth transition for transform
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.1s ease-out');
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const el = this.el.nativeElement;
    // Get dimensions and position of the element
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left; // x position within the element
    const y = event.clientY - rect.top; // y position within the element
    
    // Calculate distance from center
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate movement amounts
    const pull = Number(this.magneticPull) || 20;
    const moveX = (x - centerX) / centerX * pull;
    const moveY = (y - centerY) / centerY * pull;

    // Apply the magnetic transform
    this.renderer.setStyle(el, 'transform', `translate(${moveX}px, ${moveY}px)`);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    const el = this.el.nativeElement;
    // When mouse leaves, animate back to origin slower
    this.renderer.setStyle(el, 'transition', 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)');
    this.renderer.setStyle(el, 'transform', 'translate(0px, 0px)');
    
    // Reset transition back to fast for next hover
    setTimeout(() => {
      this.renderer.setStyle(el, 'transition', 'transform 0.1s ease-out');
    }, 500);
  }
}
