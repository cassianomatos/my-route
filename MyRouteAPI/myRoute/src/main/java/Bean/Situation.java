package Bean;

public class Situation {
	private int id;
	private String categoria;
	private String descricao;
	private String status;
	
	public Situation(int id, String categoria, String descricao, String status){
		this.id = id;
		this.categoria = categoria;
		this.descricao = descricao; 
		this.status  = status;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getCategoria() {
		return categoria;
	}
	public void setCategoria(String login) {
		this.categoria = login;
	}
	public String getDescricao() {
		return descricao;
	}
	public void setDescricao(String password) {
		this.descricao = password;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String name) {
		this.status = name;
	}
	
	public String toString() {
		return "<" + this.getCategoria() + ";" + this.getDescricao() + ";" + this.getStatus() + ">";
	}
}
