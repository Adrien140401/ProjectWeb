package com.example.demo.product;

public class Product {
    private Long id;
    private String name;
    private String classes;

    public Product(Long id, String name, String classes) {
        this.id = id;
        this.name = name;
        this.classes = classes;
    }

    public Product(String name, String classes) {
        this.name = name;
        this.classes = classes;
    }

    public Product() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getClasses() {
        return classes;
    }

    public void setClasses(String classes) {
        this.classes = classes;
    }

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", classes='" + classes + '\'' +
                '}';
    }
}
