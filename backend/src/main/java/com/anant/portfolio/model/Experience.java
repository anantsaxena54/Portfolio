package com.anant.portfolio.model;

import java.util.List;

public class Experience {
    private String title;
    private String company;
    private String period;
    private String location;
    private String type;
    private List<String> points;

    public Experience(String title, String company, String period, String location, String type, List<String> points) {
        this.title = title; this.company = company; this.period = period;
        this.location = location; this.type = type; this.points = points;
    }
    public String getTitle() { return title; }
    public String getCompany() { return company; }
    public String getPeriod() { return period; }
    public String getLocation() { return location; }
    public String getType() { return type; }
    public List<String> getPoints() { return points; }
}
