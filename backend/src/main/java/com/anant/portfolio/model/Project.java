package com.anant.portfolio.model;

import java.util.List;

public class Project {
    private String title;
    private String description;
    private List<String> tech;
    private String github;
    private String live;

    public Project(String title, String description, List<String> tech, String github, String live) {
        this.title = title; this.description = description;
        this.tech = tech; this.github = github; this.live = live;
    }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public List<String> getTech() { return tech; }
    public String getGithub() { return github; }
    public String getLive() { return live; }
}
