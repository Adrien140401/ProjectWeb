package com.example.demo.product;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    public List<Product> getProducts(){

        return List.of(
                new Product(
                        1L,
                        "Air Force",
                        "Shoes"
                )
        );
    }
}
