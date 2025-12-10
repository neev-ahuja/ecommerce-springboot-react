package com.neevahuja.ecommerce.services;

import com.neevahuja.ecommerce.models.*;
import com.neevahuja.ecommerce.repo.OrderRepo;
import com.neevahuja.ecommerce.repo.PaymentRepo;
import com.neevahuja.ecommerce.repo.ProductRepo;
import com.neevahuja.ecommerce.repo.UserRepo;
import com.neevahuja.ecommerce.requests.OrderSummary;
import com.neevahuja.ecommerce.requests.UpdateUserRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    private final UserRepo userRepo;
    private final ProductRepo productRepo;
    private final PaymentRepo paymentRepo;
    private final OrderRepo orderRepo;

    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(12);

    @Autowired
    public UserService(UserRepo userRepo, ProductRepo productRepo, PaymentRepo paymentRepo , OrderRepo orderRepo){
        this.userRepo = userRepo;
        this.productRepo = productRepo;
        this.paymentRepo = paymentRepo;
        this.orderRepo = orderRepo;
    }
    public Users getUser(){
        return userRepo.getByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
    }

    public String addUser(String name, String username, String password) {
        userRepo.save(new Users(name , username , passwordEncoder.encode(password)));
        return "SUCESS";
    }

    public String updateUser(UpdateUserRequest updateUserRequest) {
        Users user = this.getUser();

        if (updateUserRequest.getName() != null)
            user.setName(updateUserRequest.getName());

        if (updateUserRequest.getUsername() != null)
            user.setUsername(updateUserRequest.getUsername());

        userRepo.save(user);

        return "Updated!";
    }

    public String deleteUser() {
        Users user = this.getUser();
        userRepo.delete(user);
        return "SUCESS";
    }

    public List<Product> getAllProducts() {
        return productRepo.findAll();
    }

    public Product getProduct(int prodId) {
        return productRepo.getReferenceById(prodId);
    }

    public List<Product> getCart() {
        return getUser().getCart();
    }

    public String addToCart(int prodId) {
        Users user = getUser();
        user.getCart().add(productRepo.getReferenceById(prodId));
        userRepo.save(user);
        return "SUCESS";
    }

    public String removeFromCart(int prodId) {
        Users user = getUser();
        List<Product> cart = user.getCart();
        for(int i = 0 ; i < cart.size() ; i++){
            while(i < cart.size() && cart.get(i).getId() == prodId) cart.remove(i);
        }
        userRepo.save(user);
        return "SUCESS";
    }

    public String order(double shipping , double subtotal) {
        Users user = getUser();
        String time = LocalDateTime.now()
                .format(DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss"));
        Orders order = new Orders(new ArrayList<>(user.getCart()) , "Ordered" , new ArrayList<>(List.of("Ordered Placed at : " + time)));
        order.setPayment(new Payment(subtotal , shipping , 0.18 * subtotal));
        order.getPayment().setOrders(order);
        user.getOrders().add(order);
        orderRepo.save(order);
        paymentRepo.save(order.getPayment());
        userRepo.save(user);
        return "Ordered";
    }

    public Orders getOrder(int orderId) {
        for(Orders orders : getUser().getOrders())
            if(orders.getId() == orderId) return orders;
        return null;
    }

    public String addReview(String comment , float rating , int prodId) {
        Product product= productRepo.getReferenceById(prodId);
        product.addReview(
                new Reviews(SecurityContextHolder.getContext().getAuthentication().getName() ,
                        comment ,
                        rating));
        productRepo.save(product);
        return "SUCESS";
    }

    public String addAddress(Address address){
        Users user = getUser();
        user.getAddresses().add(address);
        userRepo.save(user);
        return "SUCESS";
    }

    public OrderSummary getOrderSummary() {
        Users user = getUser();
        OrderSummary orderSummary = new OrderSummary();
        orderSummary.setProductList(user.getCart());
        double subTotal = 0;
        for(Product product : user.getCart()) subTotal += product.getPrice();
        orderSummary.setSubTotal(subTotal);
        orderSummary.setShipping(subTotal * 0.1);
        orderSummary.setTax(subTotal * 0.18);
        orderSummary.setTotal(subTotal + (subTotal * 0.1) + (subTotal * 0.18));
        return orderSummary;
    }

    public List<Orders> myOrders() {
        Users user = getUser();
        return user.getOrders();
    }
}
