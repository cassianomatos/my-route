package DB;

import java.sql.*;

public class DB {
	final String DRIVER = "com.mysql.jdbc.Driver";
	final String DB_PATH = "jdbc:mysql://localhost:3306/my_route";
	String userName = "root";
	String password = "";
	Connection conn = null;
	Statement stm = null;
	PreparedStatement ptm = null;

	public DB() {
	}

	public void connect(){
		try {
			Class.forName(DRIVER);
			conn = DriverManager.getConnection(DB_PATH, userName, password);
			stm = conn.createStatement();
		} catch (Exception e) {
			System.out.println("Driver not found!");
			e.printStackTrace();
		}
	}

	public void closeConnection() throws SQLException, Exception {
		stm.close();
		conn.close();
	}

	public Statement getStm() {
		return stm;
	}

	public Statement getPtm() {
		return ptm;
	}

	public Connection getConnection() {
		return conn;
	}

}