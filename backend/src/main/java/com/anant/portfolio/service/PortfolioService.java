package com.anant.portfolio.service;

import com.anant.portfolio.model.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PortfolioService {

    public Profile getProfile() {
        return new Profile(
            "Anant Saxena",
            "Java Full Stack Developer",
            List.of("Java Full Stack Developer", "Spring Boot Engineer", "Angular Developer", "Healthcare Tech Builder", "Backend Architect"),
            "Full Stack Java Developer with 1+ year of experience delivering enterprise features at Cognizant TriZetto — primarily the NetworX healthcare payer suite. Experienced in Spring Boot microservices, Angular 18, JWT/OIDC security, and high-volume claims workflow optimization. Passionate about building scalable, reliable systems.",
            "anantsaxena54@gmail.com",
            "+91 7477294570",
            "Bhopal, MP, India",
            "https://github.com/anantsaxena54",
            "https://linkedin.com/in/anant-saxena-1904",
            "/assets/AnantSaxena_Resume.pdf",
            List.of(
                new Stat("1+", "Years Experience"),
                new Stat("5+", "Projects Built"),
                new Stat("2", "Internships"),
                new Stat("8.2", "CGPA")
            )
        );
    }

    public List<Skill> getSkills() {
        return List.of(
            new Skill("Java", 90, "backend"),
            new Skill("Spring Boot", 88, "backend"),
            new Skill("REST APIs", 85, "backend"),
            new Skill("Microservices", 78, "backend"),
            new Skill("JPA/Hibernate", 82, "backend"),
            new Skill("JWT / Security", 80, "backend"),
            new Skill("Angular 18", 85, "frontend"),
            new Skill("TypeScript", 83, "frontend"),
            new Skill("HTML5 / CSS3", 88, "frontend"),
            new Skill("MySQL", 80, "database"),
            new Skill("Git / Maven", 85, "tools"),
            new Skill("Postman", 82, "tools")
        );
    }

    public List<Experience> getExperience() {
        return List.of(
            new Experience(
                "Java Full Stack Developer",
                "Cognizant Technology Solutions (TriZetto)",
                "May 2025 – Present",
                "Remote / Bangalore",
                "work",
                List.of(
                    "Contributed to the NetworX healthcare platform under the TriZetto domain, developing enterprise applications using Java Full Stack technologies.",
                    "Developed end-to-end web apps using Angular for frontend, Spring Boot for backend services, and MySQL for database management.",
                    "Designed and implemented RESTful APIs enabling seamless frontend-backend communication; extensive API testing with Postman.",
                    "Optimized database operations via complex SQL queries and improved schema design for high-volume healthcare data.",
                    "Built responsive, interactive UI components in Angular following best UI/UX practices and cross-browser compatibility."
                )
            ),
            new Experience(
                "UI/UX Intern",
                "Netlink — Lumenore Product",
                "November 2023 – February 2024",
                "Bhopal, MP",
                "work",
                List.of(
                    "Drove enhancements to Lumenore's information architecture, user flows, and visual design.",
                    "Incorporated accessibility best practices and collaborated with cross-functional teams.",
                    "Delivered improved usability and overall product quality across key user journeys."
                )
            ),
            new Experience(
                "Machine Learning Intern",
                "TCS ION",
                "February 2023 – April 2023",
                "Remote",
                "work",
                List.of(
                    "Developed an ML-based HR salary prediction dashboard in Python.",
                    "Leveraged advanced data preprocessing and analysis to improve forecast accuracy.",
                    "Reduced processing time by 30% and enhanced data-driven HR decision-making."
                )
            ),
            new Experience(
                "B.Tech in Information Technology",
                "Technocrats Institute of Technology",
                "2020 – 2024",
                "Bhopal, MP",
                "education",
                List.of(
                    "CGPA: 8.2 / 10",
                    "Specialized in full stack development, data structures, and software engineering.",
                    "Built multiple academic projects involving Java, MySQL, and web technologies."
                )
            )
        );
    }

    public List<Project> getProjects() {
        return List.of(
            new Project(
                "Inventory Management System",
                "Full-stack inventory app with Angular SPA, Spring Boot REST API, JWT auth, JPA/Hibernate, Flyway DB migrations, and secure image uploads. Follows SOLID/DRY principles and clean architecture.",
                List.of("Angular 18", "Spring Boot", "JWT", "MySQL", "JPA/Hibernate", "Flyway", "ModelMapper"),
                "https://github.com/anantsaxena54",
                ""
            ),
            new Project(
                "HR Salary Prediction Dashboard",
                "ML-based salary forecasting dashboard built in Python. Advanced data preprocessing, statistical analysis, and model training to predict HR salaries with 30% reduced processing time.",
                List.of("Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Jupyter"),
                "https://github.com/anantsaxena54",
                ""
            ),
            new Project(
                "NetworX Healthcare Platform (TriZetto)",
                "Enterprise healthcare payer solution — contributed to NetworX suite. Developed high-volume claims workflows, RESTful APIs, JWT/OIDC authentication, and refactored legacy components for scalability.",
                List.of("Java", "Spring Boot 3.3", "Angular 18", "MySQL", "JWT", "Microservices", "Agile/Scrum"),
                "",
                ""
            )
        );
    }
}
