package com.anant.portfolio.controller;

import com.anant.portfolio.model.*;
import com.anant.portfolio.service.PortfolioService;
import com.anant.portfolio.service.ContactService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping({"/api", ""})
public class PortfolioController {

    @Autowired
    private PortfolioService portfolioService;

    @Autowired
    private ContactService contactService;

    @GetMapping("/portfolio/profile")
    public ResponseEntity<Profile> getProfile() {
        return ResponseEntity.ok(portfolioService.getProfile());
    }

    @GetMapping("/portfolio/skills")
    public ResponseEntity<List<Skill>> getSkills() {
        return ResponseEntity.ok(portfolioService.getSkills());
    }

    @GetMapping("/portfolio/experience")
    public ResponseEntity<List<Experience>> getExperience() {
        return ResponseEntity.ok(portfolioService.getExperience());
    }

    @GetMapping("/portfolio/projects")
    public ResponseEntity<List<Project>> getProjects() {
        return ResponseEntity.ok(portfolioService.getProjects());
    }

    @PostMapping("/contact")
    public ResponseEntity<Map<String, Object>> sendMessage(
            @Valid @RequestBody ContactMessage message,
            HttpServletRequest request) {

        // Rate limiting check
        String clientIp = getClientIp(request);
        if (contactService.isRateLimited(clientIp)) {
            return ResponseEntity.status(429).body(Map.of(
                "success", false,
                "message", "Too many requests. Please try again later."
            ));
        }

        boolean sent = contactService.sendEmail(message);
        if (sent) {
            return ResponseEntity.ok(Map.of("success", true, "message", "Message sent successfully!"));
        } else {
            return ResponseEntity.status(500).body(Map.of("success", false, "message", "Failed to send message."));
        }
    }

    /**
     * Handle validation errors and return user-friendly messages.
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationErrors(MethodArgumentNotValidException ex) {
        String errors = ex.getBindingResult().getFieldErrors().stream()
            .map(e -> e.getField() + ": " + e.getDefaultMessage())
            .collect(Collectors.joining(", "));
        return ResponseEntity.badRequest().body(Map.of(
            "success", false,
            "message", errors
        ));
    }

    /**
     * Extract client IP, accounting for reverse proxies (X-Forwarded-For).
     */
    private String getClientIp(HttpServletRequest request) {
        String xff = request.getHeader("X-Forwarded-For");
        if (xff != null && !xff.isBlank()) {
            return xff.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
}
