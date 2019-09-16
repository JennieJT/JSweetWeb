package sweet.jane;

public class FormParam {
	public FormParam() {
		
	}
	public FormParam(String line) {
		String[] personString=line.split(" , ");	
		this.setName(personString[0]);
		this.setHobby(personString[1]);
		this.setDegree(personString[2]);
		this.setLogin(personString[3]);
		this.setPassword(personString[4]);
		this.setBirthdate(personString[5]);
		this.setSex(personString[6]);
	}
String name="";
String sex="";
public String getSex() {
	return sex;
}
public void setSex(String sex) {
	this.sex = sex;
}
String login="";
String password="";
String hobby="";
String birthday="";
String degree="";
public String getName() {
	
	return name;
}
public void setName(String name) {
	this.name = name;
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
public String getHobby() {
	return hobby;
}
public void setHobby(String hobby) {
	this.hobby = hobby;
}
public String getBirthdate() {
	return birthday;
}
public void setBirthdate(String birthday) {
	this.birthday = birthday;
}
public String getDegree() {
	return degree;
}
public void setDegree(String degree) {
	this.degree = degree;
}

}
