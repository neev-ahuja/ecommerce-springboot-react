package com.neevahuja.ecommerce.repo;

import com.neevahuja.ecommerce.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepo extends JpaRepository<Product , Integer> {
}
