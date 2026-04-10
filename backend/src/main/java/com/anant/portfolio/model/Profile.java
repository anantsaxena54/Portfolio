package com.anant.portfolio.model;

import java.util.List;

public class Profile {
    private String name;
    private String title;
    private List<String> roles;
    private String bio;
    private String email;
    private String phone;
    private String location;
    private String github;
    private String linkedin;
    private String resumeUrl;
    private List<Stat> stats;

    public Profile(String name, String title, List<String> roles, String bio,
                   String email, String phone, String location,
                   String github, String linkedin, String resumeUrl, List<Stat> stats) {
        this.name = name; this.title = title; this.roles = roles; this.bio = bio;
        this.email = email; this.phone = phone; this.location = location;
        this.github = github; this.linkedin = linkedin;
        this.resumeUrl = resumeUrl; this.stats = stats;
    }

    public String getName() { return name; }
    public String getTitle() { return title; }
    public List<String> getRoles() { return roles; }
    public String getBio() { return bio; }
    public String getEmail() { return email; }
    public String getPhone() { return phone; }
    public String getLocation() { return location; }
    public String getGithub() { return github; }
    public String getLinkedin() { return linkedin; }
    public String getResumeUrl() { return resumeUrl; }
    public List<Stat> getStats() { return stats; }
}
