package com.anant.portfolio.model;

public class Stat {
    private String label;
    private String value;
    public Stat(String value, String label) { this.value = value; this.label = label; }
    public String getLabel() { return label; }
    public String getValue() { return value; }
}
