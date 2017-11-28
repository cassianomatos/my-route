package Bean;

public class User {
	private int id;
	private String login;
	private String password;
	private String name;
	private String fone;
	private String mail;
	
	public User(int id, String login, String password, String name, String fone, String  mail){
		this.id = id;
		this.login = login;
		this.password = password; 
		this.name  = name;
		this.fone = fone;
		this.mail = mail;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getLogin() {
		return login;
	}
	public void setLogin(String login) {
		this.login = login;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getFone() {
		return fone;
	}
	public void setFone(String fone) {
		this.fone = fone;
	}
	public String getMail() {
		return mail;
	}
	public void setMail(String mail) {
		this.mail = mail;
	}
}
