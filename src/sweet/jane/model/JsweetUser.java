package sweet.jane.model;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the jsweet_user database table.
 * 
 */
@Entity
@Table(name="jsweet_user")
@NamedQuery(name="JsweetUser.findAll", query="SELECT j FROM JsweetUser j")
public class JsweetUser implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private String name;

	private String birthday;

	private String degree;

	private String hobby;

	private String login;

	private String password;

	private String sex;

	public JsweetUser() {
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getBirthday() {
		return this.birthday;
	}

	public void setBirthday(String birthday) {
		this.birthday = birthday;
	}

	public String getDegree() {
		return this.degree;
	}

	public void setDegree(String degree) {
		this.degree = degree;
	}

	public String getHobby() {
		return this.hobby;
	}

	public void setHobby(String hobby) {
		this.hobby = hobby;
	}

	public String getLogin() {
		return this.login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getSex() {
		return this.sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

}