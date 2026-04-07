import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Skill, Experience, Project, ContactMessage, Stat, Certification } from '../models/portfolio.models';

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  private apiBase = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  // ─── Static data (fallback when API is not running) ──────────────────────

  getProfile() {
    return {
      name: 'Anant Saxena',
      tagline: 'Available for opportunities',
      desc: 'Full Stack Java Developer crafting enterprise-grade systems at Cognizant TriZetto. I build the backend that powers healthcare, and the frontend that makes it human.',
      github: 'https://github.com/anantsaxena54',
      linkedin: 'https://linkedin.com/in/anant-saxena-1904',
      email: 'anantsaxena54@gmail.com',
      phone: '+91 7477294570',
      roles: ['Java Full Stack Developer', 'Spring Boot Engineer', 'Angular 18 Developer', 'Healthcare Tech Builder', 'Backend Architect'],
      stats: [
        { value: '1+', label: 'years experience' },
        { value: '5+', label: 'projects built' },
        { value: '2', label: 'internships' },
        { value: '8.2', label: 'cgpa' },
      ] as Stat[]
    };
  }

  getSkills(): Skill[] {
    return [
      { name: 'Java', icon: '☕', proficiency: 90, category: 'backend' },
      { name: 'Spring Boot', icon: '🌱', proficiency: 88, category: 'backend' },
      { name: 'Angular 18', icon: '🔺', proficiency: 85, category: 'frontend' },
      { name: 'TypeScript', icon: '📘', proficiency: 83, category: 'frontend' },
      { name: 'MySQL', icon: '🗄️', proficiency: 80, category: 'database' },
      { name: 'REST APIs', icon: '🔗', proficiency: 85, category: 'backend' },
      { name: 'JWT/OIDC', icon: '🔐', proficiency: 80, category: 'backend' },
      { name: 'Microservices', icon: '⚙️', proficiency: 78, category: 'backend' },
      { name: 'JPA/Hibernate', icon: '🏗️', proficiency: 82, category: 'backend' },
      { name: 'Maven', icon: '📦', proficiency: 85, category: 'tools' },
      { name: 'HTML/CSS', icon: '🎨', proficiency: 88, category: 'frontend' },
      { name: 'Git', icon: '🐙', proficiency: 85, category: 'tools' },
    ];
  }

  getExperience(): Experience[] {
    return [
      {
        title: 'Java Full Stack Developer',
        company: 'Cognizant Technology Solutions — TriZetto NetworX',
        period: 'May 2025 – Present',
        location: 'Remote / Bangalore',
        type: 'work',
        points: [
          'Contributed to the NetworX healthcare platform, developing enterprise applications using Java Full Stack technologies.',
          'Developed end-to-end web apps using Angular for frontend, Spring Boot for backend, and MySQL for database management.',
          'Designed and implemented RESTful APIs enabling seamless frontend-backend communication; extensive API testing with Postman.',
          'Optimized database operations with complex SQL queries for high-volume healthcare data.',
          'Built responsive Angular components following best UI/UX practices and cross-browser compatibility.',
        ],
        isOpen: false
      },
      {
        title: 'UI/UX Intern',
        company: 'Netlink — Lumenore Product',
        period: 'November 2023 – February 2024',
        location: 'Bhopal, MP',
        type: 'work',
        points: [
          'Drove enhancements to Lumenore\'s information architecture, user flows, and visual design.',
          'Incorporated accessibility best practices across key user journeys.',
          'Collaborated cross-functionally to deliver improved usability and overall product quality.',
        ],
        isOpen: false
      },
      {
        title: 'Machine Learning Intern',
        company: 'TCS ION',
        period: 'February 2023 – April 2023',
        location: 'Remote',
        type: 'work',
        points: [
          'Developed an ML-based HR salary prediction dashboard in Python.',
          'Advanced data preprocessing and analysis improved forecast accuracy significantly.',
          'Reduced processing time by 30%; enhanced data-driven HR decision-making.',
        ],
        isOpen: false
      },
    ];
  }

  getProjects(): Project[] {
    return [
      {
        num: '01',
        title: 'Inventory Management System',
        description: 'Full-stack inventory application with Angular SPA and Spring Boot REST API. Features JWT authentication, JPA/Hibernate ORM, Flyway DB migrations, secure product image uploads, and SOLID/DRY architecture.',
        tech: ['Angular 18', 'Spring Boot', 'JWT', 'MySQL', 'JPA/Hibernate', 'Flyway'],
        github: 'https://github.com/anantsaxena54',
        live: '',
      },
      {
        num: '02',
        title: 'HR Salary Prediction Dashboard',
        description: 'ML-based salary forecasting system in Python. Advanced data preprocessing and predictive modelling reduced HR processing time by 30% while improving forecast accuracy.',
        tech: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib'],
        github: 'https://github.com/anantsaxena54',
        live: '',
      },
      {
        num: '03',
        title: 'NetworX Healthcare Platform',
        description: 'Enterprise healthcare payer solution at Cognizant TriZetto. Contributed to high-volume claims workflows, RESTful microservices, JWT/OIDC auth, and legacy component refactoring for scalability.',
        tech: ['Java', 'Spring Boot 3.3', 'Angular 18', 'MySQL', 'Microservices', 'JWT'],
        github: '',
        live: '',
        locked: true,
      },
    ];
  }

  getCertifications(): Certification[] {
    return [
      { name: 'Microsoft Certified: Azure Fundamentals' },
      { name: 'Microsoft Certified: Azure Developer Associate' },
      { name: 'Microsoft Certified: Azure AI Fundamentals' },
    ];
  }

  sendContactMessage(msg: ContactMessage): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(`${this.apiBase}/contact`, msg)
      .pipe(catchError(() => of({ success: false, message: 'Could not reach the server.' })));
  }
}
