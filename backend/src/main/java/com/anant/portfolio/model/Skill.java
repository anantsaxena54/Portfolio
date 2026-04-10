package com.anant.portfolio.model;

public class Skill {
    private String name;
    private int proficiency;
    private String category;

    public Skill(String name, int proficiency, String category) {
        this.name = name; this.proficiency = proficiency; this.category = category;
    }
    public String getName() { return name; }
    public int getProficiency() { return proficiency; }
    public String getCategory() { return category; }
}
