package DB;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Vector;

import Bean.UserFeedback;

public class UserFeedbackDB {

	public UserFeedbackDB() {
	}
	
	public boolean insertUserFeedback(UserFeedback userFeedback) throws SQLException{
		String sql = "INSERT into user_feedback (user_id,feedback,description) "
				+    "VALUES (?,?,?)";
		DB db = new DB();
		
		try {
			db.connect();
			PreparedStatement ptm = db.conn.prepareStatement(sql);
			
			ptm.setInt(1, userFeedback.getUserId());
			ptm.setInt(2, userFeedback.getFeedback()) ;
			ptm.setString(3, userFeedback.getDesc());
			
			if (ptm.executeUpdate() == 1) {
				System.out.println("Registro cadastrado com sucesso!");
				return true;
			}
			
			db.closeConnection();
		} catch (SQLException se) {
			se.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return false;
	}
	
	public boolean updateUserFeedback(UserFeedback userFeedback) throws SQLException{
		String sql = "UPDATE user_feedback "
				+    "SET feedback = ?, description = ? "
				+    "WHERE user_id = ?";
		DB db = new DB();
		
		try {
			db.connect();
			PreparedStatement ptm = db.conn.prepareStatement(sql);
			
			ptm.setInt(1, userFeedback.getFeedback());
			ptm.setString(2, userFeedback.getDesc());
			ptm.setInt(3, userFeedback.getUserId()) ;
			
			
			if (ptm.executeUpdate() == 1) {
				System.out.println("Registro alterado com sucesso!");
				return true;
			}
			
			db.closeConnection();
		} catch (SQLException se) {
			se.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return false;
	}
	
	public Vector<UserFeedback> listUserFeedback(String feedback) {
		Vector<UserFeedback> userFeedbacks = new Vector<UserFeedback>();
		String clause = "";
		
		if(feedback != "")
			clause = (feedback.equals("all") ? "" : " WHERE feedback = " + feedback);
		
		String sql = "SELECT * FROM user_feedback" + clause;
		DB db = new DB();
		
		try {
			db.connect();
			
			Statement stm = db.getStm();
			ResultSet rs = stm.executeQuery(sql);
			while (rs.next()) {
				UserFeedback uf = new UserFeedback(rs.getInt("user_id"),
							 		 	 	 	   rs.getInt("feedback"),
							 		 	 	 	   rs.getString("description"));
				userFeedbacks.add(uf);
			}
			
			db.closeConnection();
		} catch (SQLException se) {
			se.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
			
		return userFeedbacks;
	}
}
