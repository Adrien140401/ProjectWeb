package com.example.demo.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.sql.*;

@RestController
@CrossOrigin(origins = "*")
public class RegisterController {
    @PostMapping("/register") public @ResponseBody ResponseEntity<String> register(@RequestParam String firstname,
                                           @RequestParam String name,
                                           @RequestParam String email,
                                           @RequestParam String password,
                                           @RequestParam String phone) {

        try {

            Class.forName("com.mysql.cj.jdbc.Driver");

            Connection connection = DriverManager.getConnection(
                    "jdbc:mysql://mysql-betterhumanity.alwaysdata.net/betterhumanity_projetweb",
                    "263237_betterhy",
                    "Betterhumanity11117*");

            Statement stmt = connection.createStatement();

            String sql = "INSERT INTO users (firstname, name, email, password, phone) VALUES (?, ?, ?, ?, ?)";

            PreparedStatement preparedStatement = stmt.getConnection().prepareStatement(sql);
            preparedStatement.setString(1, firstname);
            preparedStatement.setString(2, name);
            preparedStatement.setString(3, email);
            preparedStatement.setString(4, password);
            preparedStatement.setInt(5, Integer.parseInt(phone));
            preparedStatement.execute();

        } catch (Exception exception) {
            return new ResponseEntity<>(exception.toString(), HttpStatus.OK);
        }

        return new ResponseEntity<>(null, HttpStatus.OK);
    }
}
