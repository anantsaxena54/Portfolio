import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer>
      <div class="footer-text">
        Designed &amp; built by <span>Anant Saxena</span> · Angular 18 + Spring Boot · © {{ year }}
      </div>
      <div class="footer-socials">
        <a href="https://github.com/anantsaxena54" target="_blank" class="social-btn" title="GitHub">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
        </a>
        <a href="https://linkedin.com/in/anant-saxena-1904" target="_blank" class="social-btn" title="LinkedIn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
            <circle cx="4" cy="4" r="2"/>
          </svg>
        </a>
        <a href="mailto:anantsaxena54@gmail.com" class="social-btn" title="Email">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
        </a>
      </div>
    </footer>
  `,
  styles: [`
    footer {
      padding: 3rem 4rem;
      border-top: 1px solid var(--border);
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }
    .footer-text {
      font-family: var(--font-code);
      font-size: 0.78rem;
      color: var(--muted);
      span { color: var(--purple2); }
    }
    .footer-socials { display: flex; gap: 0.75rem; }
    .social-btn {
      width: 40px; height: 40px;
      border: 1.5px solid var(--border);
      border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
      color: var(--muted);
      text-decoration: none;
      transition: var(--transition);
      &:hover {
        border-color: var(--purple);
        color: var(--purple2);
        box-shadow: 0 8px 25px rgba(139,92,246,0.25);
        transform: translateY(-3px);
        background: rgba(139,92,246,0.08);
      }
    }
    @media (max-width: 900px) { footer { padding: 2.5rem 1.5rem; } }
  `]
})
export class FooterComponent {
  year = new Date().getFullYear();
}
