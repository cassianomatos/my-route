package Bean;

public class MapSit {
	private Integer id;
	private Integer userId;
	private Integer sitId;
	private double latitude;
	private double longitude;
	private String description;
	private Integer active;

	public MapSit(Integer userId, Integer sitId, double latitude, double longitude, String description, Integer active) {
		this.userId = userId; 
		this.sitId = sitId;
		this.latitude = latitude;
		this.longitude = longitude;
		this.description = description;
		this.active = active;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Integer getSitId() {
		return sitId;
	}

	public void setSitId(Integer sitId) {
		this.sitId = sitId;
	}

	public double getLatitude() {
		return latitude;
	}

	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}

	public double getLongitude() {
		return longitude;
	}

	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Integer getActive() {
		return active;
	}

	public void setActive(Integer active) {
		this.active = active;
	}

	@Override
	public String toString() {
		return "\n\nID          --> " + this.id     	 + "\n" +
			   "UserID      --> " + this.userId  	 + "\n" + 
			   "SitID       --> " + this.sitId  	 + "\n" + 
			   "Latitude    --> " + this.latitude 	 + "\n" +
			   "Longitude   --> " + this.longitude   + "\n" +
			   "Description --> " + this.description + "\n" +
			   "Active      --> " + this.active;
	}
}
