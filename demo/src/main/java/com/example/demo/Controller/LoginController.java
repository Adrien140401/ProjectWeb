package com.example.demo.Controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.*;

@RestController
@CrossOrigin(origins = "*")
public class LoginController {

    @PostMapping("/login") public @ResponseBody ResponseEntity<String> login(
            @RequestParam String email,
            @RequestParam String password){

        try{
            Class.forName("com.mysql.cj.jdbc.Driver");

            Connection connection = DriverManager.getConnection(
                    "jdbc:mysql://mysql-betterhumanity.alwaysdata.net/betterhumanity_projetweb",
                    "263237_betterhy",
                    "Betterhumanity11117*");

            Statement stmt = connection.createStatement();

            String sql = "SELECT * FROM users WHERE email = ? AND password = ?;";

            PreparedStatement preparedStatement = stmt.getConnection().prepareStatement(sql);
            preparedStatement.setString(1, email);
            preparedStatement.setString(2, password);

            ResultSet resultSet = preparedStatement.executeQuery();

            if (!resultSet.next()){
                System.out.println("error connection");
                return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
            }else {
                System.out.println("Good Connection");
                return new ResponseEntity<>(null, HttpStatus.OK);
            }


        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(null, HttpStatus.OK);
    }
}
