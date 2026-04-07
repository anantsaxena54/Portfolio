import { Component, ElementRef, ViewChild, AfterViewChecked, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotService } from '../../services/chatbot.service';
import { ChatMessage } from '../../models/portfolio.models';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MagneticDirective } from '../../directives/magnetic.directive';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule, MagneticDirective],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss'],
  animations: [
    trigger('chatWindowAnimation', [
        state('void', style({ opacity: 0, transform: 'scale(0.9) translateY(20px)' })),
        state('*', style({ opacity: 1, transform: 'scale(1) translateY(0)' })),
        transition('void => *', animate('300ms cubic-bezier(0.25, 0.8, 0.25, 1)')),
        transition('* => void', animate('200ms ease-out', style({ opacity: 0, transform: 'scale(0.9) translateY(20px)' })))
    ])
  ]
})
export class ChatbotComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;

  isOpen = false;
  userMessage = '';
  messages: ChatMessage[] = [];
  isLoading = false;

  constructor(private chatbotService: ChatbotService) {}

  ngOnInit() {
    this.chatbotService.messages$.subscribe(msgs => {
      this.messages = msgs;
    });
    this.chatbotService.isLoading$.subscribe(loading => {
      this.isLoading = loading;
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
        setTimeout(() => this.scrollToBottom(), 100);
    }
  }

  sendMessage() {
    if (this.userMessage.trim()) {
      this.chatbotService.sendMessage(this.userMessage);
      this.userMessage = ''; // clear input
    }
  }

  private scrollToBottom(): void {
    try {
        if (this.myScrollContainer) {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        }
    } catch(err) { }
  }
}
