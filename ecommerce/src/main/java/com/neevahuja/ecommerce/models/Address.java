package com.neevahuja.ecommerce.models;

import jakarta.persistence.*;

@Embeddable
public class Address {

    private String fullName;
    private String streetAddress;
    private String city;
    private String postalCode;
    private String country;
    private String state;
    private String email;
    private String mobileNo;

    public Address() {
    }

    public Address(String fullName, String streetAddress, String city, String postalCode, String country, String state, String email, String mobileNo) {
        this.fullName = fullName;
        this.streetAddress = streetAddress;
        this.city = city;
        this.postalCode = postalCode;
        this.country = country;
        this.state = state;
        this.email = email;
        this.mobileNo = mobileNo;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getStreetAddress() {
        return streetAddress;
    }

    public void setStreetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }


    public void setExpressShipping(boolean expressShipping) {
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobileNo() {
        return mobileNo;
    }

    public void setMobileNo(String mobileNo) {
        this.mobileNo = mobileNo;
    }
}
