package com.anant.portfolio;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PortfolioApplication {
    public static void main(String[] args) {
        Dotenv.configure()
            .ignoreIfMissing()
            .load()
            .entries()
            .forEach(e -> {
                if (System.getenv(e.getKey()) == null && System.getProperty(e.getKey()) == null) {
                    System.setProperty(e.getKey(), e.getValue());
                }
            });
        SpringApplication.run(PortfolioApplication.class, args);
    }
}
