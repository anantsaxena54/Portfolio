import { Component, ElementRef, ViewChild, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortfolioService } from '../../services/portfolio.service';
import { TerminalService } from '../../services/terminal.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

interface TermLine {
  text: string;
  type: 'input' | 'output' | 'error';
}

@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss'],
  animations: [
    trigger('termAnimation', [
      state('void', style({ opacity: 0, transform: 'translateY(-20px) scale(0.95)' })),
      state('*', style({ opacity: 1, transform: 'translateY(0) scale(1)' })),
      transition('void => *', animate('250ms cubic-bezier(0.25, 0.8, 0.25, 1)')),
      transition('* => void', animate('200ms ease-out', style({ opacity: 0, transform: 'scale(0.95)' })))
    ]),
    trigger('backdropAnimation', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition('void => *', animate('250ms ease-out')),
      transition('* => void', animate('200ms ease-in'))
    ])
  ]
})
export class TerminalComponent implements OnInit {
  @ViewChild('termBody') termBody!: ElementRef;
  @ViewChild('cmdInput') cmdInput!: ElementRef;

  isOpen = false;
  currentInput = '';
  history: TermLine[] = [];
  inputHistory: string[] = [];
  historyPointer: number = -1;
  isTyping = false;

  profile: any;
  skills: any[];
  projects: any[];

  // For draggable behavior
  isDragging = false;
  dragStartX = 0;
  dragStartY = 0;
  termX = 0;
  termY = 0;

  constructor(
    private terminalService: TerminalService,
    private portfolioService: PortfolioService
  ) {
    this.skills = this.portfolioService.getSkills();
    this.projects = this.portfolioService.getProjects();
    this.profile = this.portfolioService.getProfile();
  }

  ngOnInit() {
    this.terminalService.isOpen$.subscribe(open => {
      this.isOpen = open;
      if (open) {
        // Reset position on open
        this.termX = 0;
        this.termY = 0;
        if (this.history.length === 0) {
          this.showWelcome();
        }
        setTimeout(() => this.focusInput(), 100);
      }
    });

    // Easter Egg: Listen for backtick globally to toggle
    document.addEventListener('keydown', (e) => {
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        this.terminalService.toggleTerminal();
      }
    });
  }

  closeTerminal() {
    this.terminalService.closeTerminal();
  }

  focusInput() {
    if (this.cmdInput) {
      this.cmdInput.nativeElement.focus();
    }
  }

  handleCommand() {
    const cmd = this.currentInput.trim();
    if (!cmd) return;

    this.history.push({ text: `anant@portfolio:~$ ${cmd}`, type: 'input' });
    this.inputHistory.push(cmd);
    this.historyPointer = this.inputHistory.length;
    this.processCommand(cmd.toLowerCase());
    this.currentInput = '';
    setTimeout(() => this.scrollToBottom(), 50);
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (this.historyPointer > 0) {
        this.historyPointer--;
        this.currentInput = this.inputHistory[this.historyPointer];
      }
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (this.historyPointer < this.inputHistory.length - 1) {
        this.historyPointer++;
        this.currentInput = this.inputHistory[this.historyPointer];
      } else {
        this.historyPointer = this.inputHistory.length;
        this.currentInput = '';
      }
    }
  }

  private showWelcome() {
    this.history.push({ text: 'Welcome to Anant\'s Interactive Terminal!', type: 'output' });
    this.history.push({ text: 'Type "help" to see what I can do.', type: 'output' });
    setTimeout(() => this.scrollToBottom(), 50);
  }

  private typeOutput(text: string, type: 'output' | 'error' = 'output') {
    this.isTyping = true;
    const lines = text.split('\n');
    lines.forEach((line, index) => {
      setTimeout(() => {
        this.history.push({ text: line, type: type });
        this.scrollToBottom();
        if (index === lines.length - 1) this.isTyping = false;
      }, index * 100);
    });
  }

  private processCommand(cmd: string) {
    const args = cmd.split(' ');
    const mainCommand = args[0];

    switch (mainCommand) {
      case 'help':
        this.typeOutput('Available commands:\n  about         Who is Anant?\n  projects      View built applications\n  skills        View technical stack\n  experience    Professional work history\n  resume        Download resume PDF\n  contact       Get in touch details\n  journey       My learning path\n  goals         Career aspirations\n  whyme         Why hire me?\n  clear         Wipe terminal\n\n  [FUN]: sudo hire-me, hack nasa, coffee, secret');
        break;

      case 'about':
        this.typeOutput(`${this.profile.name} | Java Full Stack Developer | Problem Solver 🚀\n${this.profile.desc}`);
        break;

      case 'whoami':
        this.typeOutput(`${this.profile.name} | Java Full Stack Developer | Problem Solver 🚀`);
        break;

      case 'projects':
        let projList = 'Real-world Highlights:\n';
        this.projects.forEach(p => projList += `→ ${p.title} (${p.tech.slice(0, 2).join(' + ')})\n`);
        this.typeOutput(projList);
        break;

      case 'skills':
        const skillsOutput = `Languages: Java, Python, TypeScript\nFrameworks: Spring Boot, Angular 18, Hibernate\nDatabases: MySQL, PostgreSQL\nCloud: Microsoft Azure Fundamentals & Developer certified`;
        this.typeOutput(skillsOutput);
        break;

      case 'experience':
        let expList = '';
        this.portfolioService.getExperience().forEach(e => expList += `• ${e.title} @ ${e.company} (${e.period})\n`);
        this.typeOutput(expList);
        break;

      case 'resume':
        this.typeOutput('Downloading resume PDF...');
        const link = document.createElement('a');
        link.href = 'assets/AnantSaxena_JavaFullStack.pdf';
        link.download = 'AnantSaxena_JavaFullStack.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        break;

      case 'contact':
        this.typeOutput(`Email: ${this.profile.email}\nLinkedIn: ${this.profile.linkedin}\nGitHub: ${this.profile.github}\nOr use the contact form at the bottom of the page!`);
        break;

      case 'linkedin':
        this.typeOutput('Navigating to LinkedIn...');
        window.open(this.profile.linkedin, '_blank');
        break;

      case 'github':
        this.typeOutput('Navigating to GitHub...');
        window.open(this.profile.github, '_blank');
        break;

      case 'journey':
        this.typeOutput('Started as a Java enthusiast in Bhopal, moved into Full-Stack dev with Spring & Angular, and now specializing in Healthcare Tech and Azure Cloud systems.');
        break;

      case 'goals':
        this.typeOutput('To architect high-scalability distributed systems, master Azure Cloud services, and build software that makes a real-world impact in healthcare.');
        break;

      case 'whyme':
        this.typeOutput('I bring a blend of strong Java backend foundations, modern Angular frontend skills, and an automation-first mindset proven by my internship experiences.');
        break;

      case 'ls':
        this.typeOutput('projects/  skills.txt  experience.txt  resume.pdf  contact.info');
        break;

      case 'clear':
        this.history = [];
        break;

      case 'sudo':
        if (args[1] === 'hire-me' || (args[1] === 'hire' && args[2] === 'anant')) {
          this.typeOutput('Permission granted ✅\nWelcome to the team 😎');
        } else {
          this.typeOutput('anant is not in the sudoers file. This incident will be reported.', 'error');
        }
        break;

      case 'hack':
        if (args[1] === 'nasa' || args[1] === 'google') {
          this.typeOutput('Access Denied 🚫\nNice try though 😏', 'error');
        } else {
          this.typeOutput('Target mission failed. Insufficient firewall depth.');
        }
        break;

      case 'coffee':
        this.typeOutput('☕ Brewing code...\nEnergy level: MAX ⚡');
        break;

      case 'secret':
        this.typeOutput('You found the secret! You\'re definitely curious 😄', 'output');
        break;

      case 'konami':
        this.typeOutput('🎉 30 LIVES GRANTED! 🎉\n(Wait, this isn\'t Contra...)');
        break;

      default:
        this.typeOutput(`bash: ${mainCommand}: command not found. Type "help" for a list of commands.`, 'error');
    }
  }

  private scrollToBottom() {
    try {
      if (this.termBody) {
        this.termBody.nativeElement.scrollTop = this.termBody.nativeElement.scrollHeight;
      }
    } catch (err) { }
  }

  // --- Dragging Logic ---
  onDragStart(e: MouseEvent | TouchEvent) {
    if ((e.target as HTMLElement).classList.contains('dot')) return; // Don't drag if clicking dots
    this.isDragging = true;
    if (e instanceof MouseEvent) {
      this.dragStartX = e.clientX - this.termX;
      this.dragStartY = e.clientY - this.termY;
    } else {
      this.dragStartX = e.touches[0].clientX - this.termX;
      this.dragStartY = e.touches[0].clientY - this.termY;
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onDrag(e: MouseEvent) {
    if (!this.isDragging) return;
    this.termX = e.clientX - this.dragStartX;
    this.termY = e.clientY - this.dragStartY;
  }

  @HostListener('document:touchmove', ['$event'])
  onTouchDrag(e: TouchEvent) {
    if (!this.isDragging) return;
    this.termX = e.touches[0].clientX - this.dragStartX;
    this.termY = e.touches[0].clientY - this.dragStartY;
  }

  @HostListener('document:mouseup')
  @HostListener('document:touchend')
  onDragEnd() {
    this.isDragging = false;
  }
}
