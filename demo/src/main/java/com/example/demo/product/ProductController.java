package com.example.demo.product;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

@RestController
public class ProductController {
    @GetMapping("api/v1/product")
    public Product getProducts() {
        Product product = null;

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");

            Connection connection = DriverManager.getConnection(
                    "jdbc:mysql://mysql-betterhumanity.alwaysdata.net/betterhumanity_projetweb",
                    "263237_betterhy",
                    "Betterhumanity11117*");

            Statement stmt = connection.createStatement();
            ResultSet resultSet = stmt.executeQuery("SELECT * FROM person;");
            

            while(resultSet.next()) {
                //System.out.println(resultSet.getInt(1) + " " + resultSet.getString(2) + " " + resultSet.getString(3));
                product = new Product(resultSet.getInt(1), resultSet.getString(2), resultSet.getString(3));

                //connection.getClientInfo("name");
            }

            connection.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
        return product;
    }
}
