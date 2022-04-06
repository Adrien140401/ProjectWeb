package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.sql.*;


@SpringBootApplication
public class ProjectApplication {

	public static class ConnectMySQL{

		public static void main(String[] args) {
			SpringApplication.run(ProjectApplication.class, args);

			try{
				Class.forName("com.mysql.cj.jdbc.Driver");

				Connection conn = DriverManager.getConnection(
						"jdbc:mysql://mysql-betterhumanity.alwaysdata.net/betterhumanity_projetweb", "263237_betterhy", "Betterhumanity11117*"
						
				);

				Statement stmt = conn.createStatement();
				ResultSet res = stmt.executeQuery("SELECT * FROM person;");

				while(res.next()){
					System.out.println(res.getInt(1) + " " + res.getString(2) + " " + res.getString(3));

					conn.getClientInfo("name");

				}

				conn.close();

			}catch (Exception e){
				System.out.println(e);
			}
		}
	}
}
