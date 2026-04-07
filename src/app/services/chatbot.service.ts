// src/app/services/chatbot.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable, of } from 'rxjs';
import { ChatMessage } from '../models/portfolio.models';
import { PortfolioService } from './portfolio.service';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private initialMessage: ChatMessage = {
    role: 'bot',
    content: "Hi! I'm Anant's AI Assistant. You can ask me about his Azure certifications, full-stack projects, or work experience. How can I help?"
  };

  private messagesSubject = new BehaviorSubject<ChatMessage[]>([this.initialMessage]);
  public messages$ = this.messagesSubject.asObservable();

  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.isLoadingSubject.asObservable();

  constructor(private portfolioService: PortfolioService) {}

  public sendMessage(userQuery: string) {
    if (!userQuery.trim()) return;

    // 1. Add User Message
    const currentMessages = this.messagesSubject.getValue();
    this.messagesSubject.next([...currentMessages, { role: 'user', content: userQuery }]);
    
    // 2. Set Loading
    this.isLoadingSubject.next(true);

    // 3. Generate Mock Response based on matching basic keywords
    // To connect to Azure OpenAI later, you would make an HTTP call here instead of setTimeout
    // and pass the `userQuery` along with some context strings from `portfolioService` to your LLM endpoint.
    
    setTimeout(() => {
      const responseContent = this.generateSmartMockResponse(userQuery.toLowerCase());
      
      const newMessages = this.messagesSubject.getValue();
      this.messagesSubject.next([...newMessages, { role: 'bot', content: responseContent }]);
      
      this.isLoadingSubject.next(false);
    }, 1200 + Math.random() * 800); // simulate 1.2 to 2 sec delay
  }

  private generateSmartMockResponse(query: string): string {
    const profile = this.portfolioService.getProfile();

    if (query.includes('skill') || query.includes('tech') || query.includes('stack')) {
      const topSkills = this.portfolioService.getSkills().slice(0, 5).map(s => s.name).join(', ');
      return `Anant's top skills include ${topSkills}, and many more. He specializes in full-stack development using Angular 18 and Spring Boot!`;
    }

    if (query.includes('project') || query.includes('work') || query.includes('build')) {
      const projects = this.portfolioService.getProjects();
      return `He has built some amazing projects! For example, his "${projects[0].title}" uses ${projects[0].tech.join(', ')}. He also worked on a ${projects[1].title} using Python ML!`;
    }

    if (query.includes('azure') || query.includes('cert') || query.includes('cloud')) {
      const certs = this.portfolioService.getCertifications().map(c => c.name).join(' and ');
      return `Anant is very proficient with Microsoft Azure! His current certifications include: ${certs}.`;
    }

    if (query.includes('hire') || query.includes('contact') || query.includes('email')) {
      return `You can reach Anant directly at ${profile.email} or connect with him on LinkedIn at ${profile.linkedin}.`;
    }

    if (query.includes('experience') || query.includes('cognizant')) {
      const latestExp = this.portfolioService.getExperience()[0];
      return `Currently, Anant is working as a ${latestExp.title} at ${latestExp.company}, where he contributes to enterprise healthcare applications.`;
    }

    if (query.includes('hello') || query.includes('hi') || query.includes('hey')) {
        return "Hello! What would you like to know about Anant's portfolio?";
    }

    return "I'm not exactly sure about that! I am an AI trained specifically on Anant's professional portfolio. Try asking about his skills, projects, or certifications!";
  }
}
