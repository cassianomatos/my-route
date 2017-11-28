package DB;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Vector;

import Bean.Situation;

public class SituationDB {
	
	public SituationDB() {
	}
	
	public Vector<Situation> listSituations(String status) {
		Vector<Situation> situations = new Vector<Situation>();
		String clause = (status.equals("all") ? "" : " WHERE status = '" + status + "'");
		String sql = "SELECT * FROM situation" + clause;
		DB db = new DB();
		
		try {
			db.connect();
			
			Statement stm = db.getStm();
			ResultSet rs = stm.executeQuery(sql);
			while (rs.next()) {
				Situation sit = new Situation(rs.getInt("id"),
											 rs.getString("categoria"),
											 rs.getString("descricao"),
											 rs.getString("status"));
				situations.add(sit);
			}
			
			db.closeConnection();
		} catch (SQLException se) {
			se.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return situations;
	}
}
