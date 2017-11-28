package Code;

import java.sql.SQLException;
import java.util.Vector;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

import Bean.MapSit;
import Bean.Situation;
import Bean.UserFeedback;
import DB.MapSitDB;
import DB.SituationDB;
import DB.UserDB;
import DB.UserFeedbackDB;


@Path("/api")
public class API {

	public static void main(String[] args) throws JSONException, SQLException {

	}
	
	@POST
	@Path("/insertUserFeedback")
	public Response insertUserFeedback(String userFeedback) throws SQLException, JSONException{
		JSONObject json = new JSONObject(userFeedback);
		System.out.println(json);

		UserFeedback uf = new UserFeedback(json.getInt("user_id"), json.getInt("feedback"), json.getString("description"));
		UserFeedbackDB db = new UserFeedbackDB();
		db.insertUserFeedback(uf);
		
		return Response.ok(true).build();
	}
	
	@POST
	@Path("/updateUserFeedback")
	public Response updateUserFeedback(String userFeedback) throws SQLException, JSONException{
		JSONObject json = new JSONObject(userFeedback);
		System.out.println(json);

		UserFeedback uf = new UserFeedback(json.getInt("user_id"), json.getInt("feedback"), json.getString("description"));
		UserFeedbackDB db = new UserFeedbackDB();
		db.updateUserFeedback(uf);
		
		return Response.ok(true).build();
	}
	
	@Path("/getUserFeedbacks")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public String getUserFeedbacks(@QueryParam("feedback") String feedback) throws JSONException{
		if (feedback == null) feedback = "all";
		
		JSONObject joSit = new JSONObject();
		JSONArray jaSit = new JSONArray();
		UserFeedbackDB db = new UserFeedbackDB();
		Vector<UserFeedback> ufs = db.listUserFeedback(feedback);
		
		for (int i = 0; i < ufs.size(); i++) {
			UserFeedback uf = ufs.get(i);
			joSit.put("id", uf.getId());
			joSit.put("user_id", uf.getUserId());
			joSit.put("feedback", uf.getFeedback());
			joSit.put("description", uf.getDesc());
			jaSit.put(joSit);
			joSit = new JSONObject();			
		}
		
		return jaSit.toString();
	}
	
	@POST
	@Path("/insertMapSit")
	public Response insertMapSit(String mapSit) throws SQLException, JSONException{
		JSONObject json = new JSONObject(mapSit);
		System.out.println(json);

		MapSit ms = new MapSit(json.getInt("user_id"), json.getInt("situation_id"), 
					 	 	   json.getDouble("latitude"), json.getDouble("longitude"),
					 	 	   json.getString("description"), json.getInt("active"));
		MapSitDB db = new MapSitDB();
		db.insertMapSit(ms);
		
		return Response.ok(true).build();
	}
	
	@Path("/getMapSits")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public String getMapSits(@QueryParam("active") String active) throws JSONException{
		if (active == null) active = "all";
		
		JSONObject joMapSit = new JSONObject();
		JSONArray jaMapSit = new JSONArray();
		MapSitDB db = new MapSitDB();
		Vector<MapSit> mapSits = db.listMapSit(active);
		
		for (int i = 0; i < mapSits.size(); i++) {
			MapSit ms = mapSits.get(i);
			joMapSit.put("user_id", ms.getUserId());
			joMapSit.put("situation_id", ms.getSitId());
			joMapSit.put("latitude", ms.getLatitude());
			joMapSit.put("longitude", ms.getLongitude());
			joMapSit.put("description", ms.getDescription());
			joMapSit.put("active", ms.getActive());
			jaMapSit.put(joMapSit);
			joMapSit = new JSONObject();			
		}
		
		return jaMapSit.toString();
	}
	
	@Path("/getSits")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public String getSits(@QueryParam("status") String status) throws JSONException{
		if (status == null) status = "all";
		
		JSONObject joSit = new JSONObject();
		JSONArray jaSit = new JSONArray();
		SituationDB db = new SituationDB();
		Vector<Situation> sits = db.listSituations(status);
		
		for (int i = 0; i < sits.size(); i++) {
			Situation sit = sits.get(i);
			joSit.put("id", sit.getId());
			joSit.put("categoria", sit.getCategoria());
			joSit.put("descricao", sit.getDescricao());
			joSit.put("status", sit.getStatus());
			jaSit.put(joSit);
			joSit = new JSONObject();			
		}
		
		return jaSit.toString();
	}
	
	@Path("/isUser")
	@GET
	public Response isUser(@QueryParam("login") String login, @QueryParam("password") String password) {
		UserDB db = new UserDB();
		
		return Response.ok(db.isUser(login, password)).build();
	}
	
	
	@Path("/teste")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public String contatosJson() throws JSONException {
		JSONObject joTest = new JSONObject();
		JSONArray jaTest = new JSONArray();

		joTest.put("id", 1);
		joTest.put("user-id", 1);
		joTest.put("situation-id", 1);
		jaTest.put(joTest);
		joTest = new JSONObject();
		
		joTest.put("id", 2);
		joTest.put("user-id", 2);
		joTest.put("situation-id", 2);
		jaTest.put(joTest);
		joTest = new JSONObject();
		
		joTest.put("id", 3);
		joTest.put("user-id", 3);
		joTest.put("situation-id", 3);
		jaTest.put(joTest);
		joTest = new JSONObject();
		
		return jaTest.toString();
	}
}
