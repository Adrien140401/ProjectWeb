package com.example.demo.services;

import com.example.demo.models.User;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class UserDAO {

    // ADD

    public void add(User user) {

        try(Connection connection = DriverManager.getConnection(
                "jdbc:mysql://mysql-betterhumanity.alwaysdata.net/betterhumanity_projetweb",
                "263237_betterhy",
                "Betterhumanity11117*")){

            String sql = "INSERT INTO users (email, password, firstname, name, phone) VALUES(?, ?, ?, ?, ?);";

            try (PreparedStatement st = connection.prepareStatement(sql)) {
                st.setString(1, user.getEmail());
                st.setString(2, user.getPassword());
                st.setString(3, user.getFirstname());
                st.setString(4, user.getName());
                st.setInt(5, user.getPhone());
                st.execute();
            }

        } catch (Exception e){
            e.printStackTrace();
        }
    }

    // UPDATE

    public void update(int id, User user) throws SQLException {
        try(Connection connection = DriverManager.getConnection(
                "jdbc:mysql://mysql-betterhumanity.alwaysdata.net/betterhumanity_projetweb",
                "263237_betterhy",
                "Betterhumanity11117*")){

            String sql = "UPDATE users SET email=?, password=?, firstname=?, name=?, phone=? WHERE id=?;";

            try (PreparedStatement st = connection.prepareStatement(sql)) {
                st.setString(1, user.getEmail());
                st.setString(2, user.getPassword());
                st.setString(3, user.getFirstname());
                st.setString(4, user.getName());
                st.setInt(5, user.getPhone());
                st.setInt(6, id);

                st.execute();
            }

        } catch (Exception e){
            e.printStackTrace();
        }
    }
}
