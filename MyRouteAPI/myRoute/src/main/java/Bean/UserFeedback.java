package Bean;

public class UserFeedback {
	private int id;
	private int userId;
	private int feedback;
	private String desc;
	
	public UserFeedback(Integer userId, Integer feedback, String desc) {
		this.userId = userId;
		this.feedback = feedback;
		this.desc =  desc;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public int getFeedback() {
		return feedback;
	}

	public void setFeedback(int feedback) {
		this.feedback = feedback;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}
	
	public String toString() {
		return "<" + this.getUserId() + ";" + this.getFeedback() + ";" + this.getDesc() + ">";
	}
}
