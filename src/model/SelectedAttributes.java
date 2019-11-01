package model;
import java.io.Serializable;
import javax.persistence.*;
import java.sql.Timestamp;

public class SelectedAttributes implements Serializable {
	private static final long serialVersionUID = 1L;

//   // "select version.uuid ,version.number_1,version.number_2,version.number_3 ,"
//    + "version.publish_date,version.publish_type,version.publish_notes,version.update_list,"
//    + "version.invalid,u.user_name as publisher \n" + //

	public String getUuid() {
		return uuid;
	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
	}

	public int getNumber1() {
		return number1;
	}

	public void setNumber1(int number1) {
		this.number1 = number1;
	}

	public int getNumber2() {
		return number2;
	}

	public void setNumber2(int number2) {
		this.number2 = number2;
	}

	public int getNumber3() {
		return number3;
	}

	public void setNumber3(int number3) {
		this.number3 = number3;
	}

	public String getPublishDate() {
		return publishDate;
	}

	public void setPublishDate(String publishDate) {
		this.publishDate = publishDate;
	}

	public String getPublishType() {
		return this.publishType;
	}
	public void setPublishType(String publishType) {
		this.publishType=publishType;
	}

	public String getPublishNotes() {
		return publishNotes;
	}

	public void setPublishNotes(String publishNotes) {
		this.publishNotes = publishNotes;
	}

	public String getUpdateList() {
		return updateList;
	}

	public void setUpdateList(String updateList) {
		this.updateList = updateList;
	}
	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	private String uuid;
	private String userName;
	private int number1;
	private int number2;
	private int number3;
	private String publishDate;
	private String publishType;
	private String publishNotes;
	private String updateList;

	public SelectedAttributes() {
	}
}