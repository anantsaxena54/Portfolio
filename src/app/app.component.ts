import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { BentoComponent } from './components/bento/bento.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { CursorComponent } from './components/cursor/cursor.component';
import { CertificationsComponent } from './components/certifications/certifications.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { TerminalComponent } from './components/terminal/terminal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent, HeroComponent, BentoComponent, SkillsComponent,
    ExperienceComponent, ProjectsComponent, ContactComponent, FooterComponent,
    CursorComponent, CertificationsComponent, ChatbotComponent, TerminalComponent
  ],
  template: `
    <app-cursor></app-cursor>
    <canvas id="canvas3d"></canvas>
    <div class="content-wrapper">
      <app-navbar></app-navbar>
      <app-hero></app-hero>
      <app-bento></app-bento>
      <app-skills></app-skills>
      <app-experience></app-experience>
      <app-projects></app-projects>
      <app-certifications></app-certifications>
      <app-contact></app-contact>
      <app-footer></app-footer>
      <app-chatbot></app-chatbot>
      <app-terminal></app-terminal>
    </div>
  `,
  styles: [`
    #canvas3d {
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      z-index: 0;
      pointer-events: none;
    }
    .content-wrapper {
      position: relative;
      z-index: 10;
    }
  `]
})
export class AppComponent {
  // Minor logic-free change to trigger CodeRabbit PR analysis
}
