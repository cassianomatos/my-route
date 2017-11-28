package Code;

import java.sql.SQLException;

import Bean.UserFeedback;
import DB.UserFeedbackDB;

public class test {

	public static void main(String[] args) throws SQLException {
		UserFeedbackDB db = new UserFeedbackDB();
		UserFeedback uf = new UserFeedback(1, 0, "teste");
		
		db.updateUserFeedback(uf);
	}

}
