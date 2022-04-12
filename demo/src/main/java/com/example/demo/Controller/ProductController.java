package com.example.demo.Controller;


import com.example.demo.product.Product;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@RestController
public class ProductController {
    @GetMapping("api/v1/product")
    public List<Product> getProducts(){
        Product product = null;

        List<Product> list = new ArrayList<>();

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");

            Connection connection = DriverManager.getConnection(
                    "jdbc:mysql://mysql-betterhumanity.alwaysdata.net/betterhumanity_projetweb",
                    "263237_betterhy",
                    "Betterhumanity11117*");

            Statement stmt = connection.createStatement();
            ResultSet resultSet = stmt.executeQuery("SELECT * FROM product;");

            while(resultSet.next()) {
                product = new Product(resultSet.getInt(1), resultSet.getString(2), resultSet.getString(3));

                list.add(product);

            }

            connection.close();

        } catch (Exception e) {
            e.printStackTrace();
        }

        UserController user = new UserController();
        //user.delete(5);
        return list;
    }
}
