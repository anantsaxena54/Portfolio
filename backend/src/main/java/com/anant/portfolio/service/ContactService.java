package com.anant.portfolio.service;

import com.anant.portfolio.model.ContactMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
public class ContactService {

    private static final Logger log = LoggerFactory.getLogger(ContactService.class);

    // Rate limiting: max 5 emails per IP per hour
    private static final int MAX_REQUESTS_PER_HOUR = 5;
    private final Map<String, CopyOnWriteArrayList<Instant>> requestLog = new ConcurrentHashMap<>();

    @Autowired(required = false)
    private JavaMailSender mailSender;

    @Value("${spring.mail.username:}")
    private String mailUsername;

    @Value("${spring.mail.password:}")
    private String mailPassword;

    @Value("${portfolio.contact.email:anantsaxena54@gmail.com}")
    private String contactEmail;

    /**
     * Check if the given IP has exceeded the rate limit.
     */
    public boolean isRateLimited(String clientIp) {
        String ip = (clientIp == null) ? "unknown" : clientIp;
        Instant oneHourAgo = Instant.now().minusSeconds(3600);

        requestLog.computeIfAbsent(ip, k -> new CopyOnWriteArrayList<>());
        CopyOnWriteArrayList<Instant> timestamps = requestLog.get(ip);

        // Remove entries older than 1 hour
        timestamps.removeIf(t -> t.isBefore(oneHourAgo));

        if (timestamps.size() >= MAX_REQUESTS_PER_HOUR) {
            log.warn("Rate limit exceeded for IP: {}", ip);
            return true;
        }

        timestamps.add(Instant.now());
        return false;
    }

    public boolean sendEmail(ContactMessage msg) {
        try {
            boolean mailConfigured =
                mailSender != null &&
                mailUsername != null && !mailUsername.isBlank() &&
                mailPassword != null && !mailPassword.isBlank();

            if (!mailConfigured) {
                log.info("📧 [DEV MODE] Contact from {} <{}>\nSubject: {}\nMessage: {}",
                    msg.getName(), msg.getEmail(), msg.getSubject(), msg.getMessage());
                return true;
            }

            SimpleMailMessage mail = new SimpleMailMessage();
            mail.setFrom(mailUsername);
            mail.setTo(contactEmail);
            mail.setSubject("Portfolio Contact: " + msg.getSubject());
            mail.setText(String.format(
                "New message from your portfolio!%n%nFrom: %s%nEmail: %s%n%nMessage:%n%s",
                msg.getName(), msg.getEmail(), msg.getMessage()
            ));
            mail.setReplyTo(msg.getEmail());
            mailSender.send(mail);

            log.info("✅ Email sent successfully from {} <{}>", msg.getName(), msg.getEmail());
            return true;
        } catch (Exception e) {
            log.error("❌ Failed to send email: {}", e.getMessage(), e);
            return false;
        }
    }
}
