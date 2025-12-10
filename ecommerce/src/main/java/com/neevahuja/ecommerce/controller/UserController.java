package com.neevahuja.ecommerce.controller;

import com.neevahuja.ecommerce.models.Address;
import com.neevahuja.ecommerce.models.Orders;
import com.neevahuja.ecommerce.models.Product;
import com.neevahuja.ecommerce.models.Users;
import com.neevahuja.ecommerce.requests.*;
import com.neevahuja.ecommerce.services.UserService;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {

    UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public Users getUser() {
        return userService.getUser();
    }

    @PostMapping
    public String addUser(@RequestBody RegisterRequest req) {
        return userService.addUser(req.name, req.username, req.password);
    }

    @PutMapping
    public String updateUser(@RequestBody UpdateUserRequest req) {
        return userService.updateUser(req);
    }

    @DeleteMapping
    public String deleteUser() {
        return userService.deleteUser();
    }

    @GetMapping("/products")
    public List<Product> getProducts(){
        return userService.getAllProducts();
    }

    @GetMapping("/products/{prodId}")
    public Product getProductById(@PathVariable int prodId){
        return userService.getProduct(prodId);
    }

    @GetMapping("/cart")
    public List<Product> getCart(){
        return userService.getCart();
    }

    @PostMapping("/cart")
    public String addToCart(@RequestBody AddToCartRequest addToCartRequest){
        return userService.addToCart(addToCartRequest.getProdId());
    }

    @DeleteMapping("/cart/{prodId}")
    public String removeFromCart(@PathVariable int prodId){
        return userService.removeFromCart(prodId);
    }

    @GetMapping("/order/{orderId}")
    public Orders getOrder(@PathVariable int orderId){
        return userService.getOrder(orderId);
    }


    @PostMapping("/review")
    public String addReview(@RequestBody AddReviewRequest addReviewRequest){
        return userService.addReview(addReviewRequest.comment , addReviewRequest.rating , addReviewRequest.prodId);
    }

    @PostMapping("/address")
    public String addAddress(@RequestBody Address address){
        System.out.println("WORKING");
        return userService.addAddress(address);
    }

    @PostMapping("/create-order")
    public Map<String, Object> createOrder(@RequestBody Map<String, Object> data) throws RazorpayException {
        int amount = (int) data.get("amount"); // in rupees

        RazorpayClient client = new RazorpayClient("YOUR_KEY", "YOUR_SECRET");

        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", amount * 100);
        orderRequest.put("currency", "INR");
        orderRequest.put("receipt", "txn_12345");

        Order order = client.orders.create(orderRequest);

        Map<String, Object> response = new HashMap<>();
        response.put("orderId", order.get("id"));
        response.put("amount", amount);

        return response;
    }

    @PostMapping("/verify-payment")
    public ResponseEntity<String> verifyPayment(@RequestBody Map<String, String> data) {
        String orderId = data.get("razorpay_order_id");
        String paymentId = data.get("razorpay_payment_id");
        String signature = data.get("razorpay_signature");

        String secret = "YOUR_SECRET";

        String generatedSignature = HmacSHA256(orderId + "|" + paymentId, secret);

        if (generatedSignature.equals(signature)) {
            userService.order(
                    Double.parseDouble(data.get("shipping")),
                    Double.parseDouble(data.get("subtotal"))
            );
            return ResponseEntity.ok("Payment Verified");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Signature");
        }
    }

    private String HmacSHA256(String data, String secret) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKeySpec = new SecretKeySpec(secret.getBytes(), "HmacSHA256");
            mac.init(secretKeySpec);
            byte[] hash = mac.doFinal(data.getBytes());
            return Base64.getEncoder().encodeToString(hash);
        } catch (Exception e) {
            throw new RuntimeException("Unable to generate signature", e);
        }
    }



    @GetMapping("/orderSummary")
    public OrderSummary getOrderSummary(){
        return userService.getOrderSummary();
    }

    @GetMapping("/myorders")
    public List<Orders> myOrders(){
        return userService.myOrders();
    }

}
