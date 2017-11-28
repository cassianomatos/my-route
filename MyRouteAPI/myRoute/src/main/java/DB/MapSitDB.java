package DB;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Vector;

import Bean.MapSit;

public class MapSitDB {
	
	public MapSitDB() {
	}
	
	public boolean insertMapSit(MapSit mapSit) throws SQLException{
		String sql = "INSERT into map_situation (user_id,situation_id,latitude,longitude,description,active) "
				+    "VALUES (?,?,?,?,?,?)";
		DB db = new DB();
		
		try {
			db.connect();
			PreparedStatement ptm = db.conn.prepareStatement(sql);
			
			ptm.setInt(1, mapSit.getUserId());
			ptm.setInt(2, mapSit.getSitId()) ;
			ptm.setDouble(3, mapSit.getLatitude());
			ptm.setDouble(4, mapSit.getLongitude());
			ptm.setString(5, mapSit.getDescription());
			ptm.setInt(6, mapSit.getActive());
			
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
	
	public Vector<MapSit> listMapSit(String active) {
		Vector<MapSit> mapSits = new Vector<MapSit>();
		String clause = "";
		
		if(active != "")
			clause = (active.equals("all") ? "" : " WHERE active = " + active);
		
		String sql = "SELECT * FROM map_situation" + clause;
		DB db = new DB();
		
		try {
			db.connect();
			
			Statement stm = db.getStm();
			ResultSet rs = stm.executeQuery(sql);
			while (rs.next()) {
				MapSit ms = new MapSit(rs.getInt("user_id"),
									   rs.getInt("situation_id"),
									   rs.getDouble("latitude"),
									   rs.getDouble("longitude"),
									   rs.getString("description"),
									   rs.getInt("active"));
				mapSits.add(ms);
			}
			
			db.closeConnection();
		} catch (SQLException se) {
			se.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
			
		return mapSits;
	}
}
  