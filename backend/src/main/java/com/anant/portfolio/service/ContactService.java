package com.anant.portfolio.service;

import com.anant.portfolio.model.ContactMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

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

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${resend.api.key:}")
    private String resendApiKey;

    @Value("${portfolio.contact.email:anantsaxena54@gmail.com}")
    private String contactEmail;

    @Value("${resend.from.email:onboarding@resend.dev}")
    private String fromEmail;

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
            if (resendApiKey == null || resendApiKey.isBlank()) {
                log.info("📧 [DEV MODE] Contact from {} <{}>\nSubject: {}\nMessage: {}",
                    msg.getName(), msg.getEmail(), msg.getSubject(), msg.getMessage());
                return true;
            }

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(resendApiKey);

            String emailBody = String.format(
                "New message from your portfolio!%n%nFrom: %s%nEmail: %s%n%nMessage:%n%s",
                msg.getName(), msg.getEmail(), msg.getMessage()
            );

            Map<String, Object> body = Map.of(
                "from", fromEmail,
                "to", new String[]{contactEmail},
                "subject", "Portfolio Contact: " + msg.getSubject(),
                "text", emailBody,
                "reply_to", msg.getEmail()
            );

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

            ResponseEntity<String> response = restTemplate.postForEntity(
                "https://api.resend.com/emails",
                request,
                String.class
            );

            if (response.getStatusCode().is2xxSuccessful()) {
                log.info("✅ Email sent successfully via Resend from {} <{}>", msg.getName(), msg.getEmail());
                return true;
            } else {
                log.error("❌ Resend API returned status: {} body: {}", response.getStatusCode(), response.getBody());
                return false;
            }
        } catch (Exception e) {
            log.error("❌ Failed to send email via Resend: {}", e.getMessage(), e);
            return false;
        }
    }
}
