package com.neevahuja.ecommerce.repo;

import com.neevahuja.ecommerce.models.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<Users , Long> {
    Users getByUsername(String name);
}
