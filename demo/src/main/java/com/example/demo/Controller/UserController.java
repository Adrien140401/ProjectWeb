package com.example.demo.Controller;


import com.example.demo.models.User;
import com.example.demo.services.UserDAO;
import org.springframework.web.bind.annotation.*;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

//GetMapping => /users{id}
//return => * of users in json
//json ? => User.class

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")
public class UserController {

    private UserDAO UserDao = new UserDAO();

    @PostMapping("/add")
    public void add(@RequestBody User user) throws SQLException{
        UserDao.add(user);
    }

    @PutMapping("/update={id}")
    public void update(@PathVariable(value = "id") int id, @RequestBody User user) throws SQLException{
        System.out.println(id);
        System.out.println(user);
    }


    @GetMapping("api/v1/users")
    public List<User> getUsers(){
        User user = null;

        List<User> list = new ArrayList<>();

        try(Connection connection = DriverManager.getConnection(
                "jdbc:mysql://mysql-betterhumanity.alwaysdata.net/betterhumanity_projetweb",
                "263237_betterhy",
                "Betterhumanity11117*")){

            Statement stmt = connection.createStatement();
            ResultSet resultSet = stmt.executeQuery("SELECT * FROM users;");

            while(resultSet.next()) {
                user = new User(resultSet.getInt(1), resultSet.getString(2), resultSet.getString(3), resultSet.getString(4), resultSet.getString(5), resultSet.getInt(6));

                list.add(user);

            }

            connection.close();

        }catch (Exception e){
            e.printStackTrace();
        }

        return list;
    }

    // DELETE ID PRODUCT

    public void delete(int id){

        try(Connection connection = DriverManager.getConnection(
                "jdbc:mysql://mysql-betterhumanity.alwaysdata.net/betterhumanity_projetweb",
                "263237_betterhy",
                "Betterhumanity11117*")){

            String sql = "DELETE FROM person WHERE id=?;";

            try (PreparedStatement st = connection.prepareStatement(sql)) {
                st.setInt(1, id);
                st.execute();
            }


        }catch (Exception e){
            e.printStackTrace();
        }
    }
}
