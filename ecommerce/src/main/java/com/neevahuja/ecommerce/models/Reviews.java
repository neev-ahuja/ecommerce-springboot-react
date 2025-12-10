package com.neevahuja.ecommerce.models;

import jakarta.persistence.Embeddable;

@Embeddable
public class Reviews {
    private String username;
    private String comment;
    private float rating;

    public Reviews(){

    }

    public Reviews(String username, String comment, float rating) {
        this.username = username;
        this.comment = comment;
        this.rating = rating;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public float getRating() {
        return rating;
    }

    public void setRating(float rating) {
        this.rating = rating;
    }
}