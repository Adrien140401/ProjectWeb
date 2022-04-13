package com.example.demo.Controller;


import com.example.demo.models.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.*;

@RestController
@CrossOrigin(origins = "*")
public class LoginController {

    @PostMapping("/login") public @ResponseBody ResponseEntity<User> login(
            @RequestParam String email,
            @RequestParam String password){

        int id = 0, phone = 0;
        String userEmail = null, userPassword = null, firstname = null, name = null;

        try {
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

            if (!resultSet.next()) return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
            else {
                id = resultSet.getInt("id");
                userEmail = resultSet.getString("email");
                userPassword = resultSet.getString("password");
                firstname = resultSet.getString("firstname");
                name = resultSet.getString("name");
                phone = resultSet.getInt("phone");
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new User(
                id,
                userEmail,
                userPassword,
                firstname,
                name,
                phone), HttpStatus.OK);
    }
}
