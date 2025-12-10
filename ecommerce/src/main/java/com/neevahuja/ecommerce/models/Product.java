package com.neevahuja.ecommerce.models;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private String description;
    private int price;
    private String image;
    private String category;
    private String brand;

    private float averageRating = 0.0f;
    private int totalReviews = 0;

    private String sku;


    @ElementCollection
    @CollectionTable(name = "product_reviews", joinColumns = @JoinColumn(name = "product_id"))
    private List<Reviews> reviewsList = new ArrayList<>();


    public Product() {}

    public Product(String name, String description, int price, String image,
                   String category, String brand, String sku) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
        this.category = category;
        this.brand = brand;
        this.sku = sku;
    }

    public void addReview(Reviews review) {
        reviewsList.add(review);
        totalReviews++;
        averageRating = ((averageRating * (totalReviews - 1)) + review.getRating()) / totalReviews;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public float getAverageRating() {
        return averageRating;
    }

    public int getTotalReviews() {
        return totalReviews;
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public List<Reviews> getReviewsList() {
        return reviewsList;
    }

    public void setReviewsList(List<Reviews> reviewsList) {
        this.reviewsList = reviewsList;
    }
}
