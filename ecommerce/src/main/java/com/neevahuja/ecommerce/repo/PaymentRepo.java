package com.neevahuja.ecommerce.repo;

import com.neevahuja.ecommerce.models.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepo extends JpaRepository<Payment , Integer> {
}
