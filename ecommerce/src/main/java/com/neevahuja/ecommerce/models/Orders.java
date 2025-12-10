package com.neevahuja.ecommerce.models;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToMany()
    @JoinTable(
            name = "order_product",
            joinColumns = @JoinColumn(name = "order_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private List<Product> productList;

    private String state;

    private List<String> tracking;

    public Payment getPayment() {
        return payment;
    }

    public void setPayment(Payment payment) {
        this.payment = payment;
    }

    @OneToOne(mappedBy = "orders", cascade = CascadeType.ALL)
    private Payment payment;


    public Orders() {
    }


    public Orders(List<Product> productList, String state, List<String> tracking) {
        this.productList = productList;
        this.state = state;
        this.tracking = tracking;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public List<Product> getProductList() {
        return productList;
    }

    public void setProductList(List<Product> productList) {
        this.productList = productList;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public List<String> getTracking() {
        return tracking;
    }

    public void setTracking(List<String> tracking) {
        this.tracking = tracking;
    }
}
