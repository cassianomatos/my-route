package DB;

import java.sql.ResultSet;
import java.sql.SQLException;

import Bean.User;

public class UserDB {

	public UserDB(){
	}
	
	public User isUser(String login, String password) {
		String sql = "SELECT * FROM users WHERE login    ='" + login + "' "
				   + "					    AND password ='" + password + "'";
		
		DB db = new DB(); 
		
		try {
			db.connect();
			
			ResultSet rs = db.getStm().executeQuery(sql);
			
			if (rs.next()) {
				User user = new User(rs.getInt("id"),
									 rs.getString("login"),
									 rs.getString("password"),
									 rs.getString("name"),
									 rs.getString("fone"),
									 rs.getString("mail"));
				return user;
			}
				
			
			db.closeConnection();
		} catch (SQLException se) {
			se.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return null;
	}
}
