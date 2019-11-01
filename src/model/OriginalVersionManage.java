package model;

import java.io.Serializable;
import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Date;


/**
 * The persistent class for the original_version_manage database table.
 * 
 */
@Entity
@Table(name="original_version_manage")
@NamedQuery(name="OriginalVersionManage.findAll", query="SELECT o FROM OriginalVersionManage o")
public class OriginalVersionManage implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private String uuid;

	@Column(name="app_type")
	private String appType;

	@Column(name="create_time")
	private Timestamp createTime;

	@Column(name="create_user")
	private String createUser;

	private String invalid;

	@Column(name="last_modify_time")
	private Timestamp lastModifyTime;

	@Column(name="last_modify_user")
	private String lastModifyUser;

	@Column(name="number_1")
	private int number1;

	@Column(name="number_2")
	private int number2;

	@Column(name="number_3")
	private int number3;

	@Column(name="on_flag")
	private String onFlag;

	@Column(name="oper_status")
	private String operStatus;

	@Column(name="publish_date")
	private String publishDate;

	@Lob
	@Column(name="publish_notes")
	private String publishNotes;

	@Column(name="publish_type")
	private String publishType;

	private String publisher;
	

	@Lob
	@Column(name="update_list")
	private String updateList;
	
//	  @ManyToOne
//	    private OrgUser orgUser;

	public OriginalVersionManage() {
		this.setCreateTime(new Timestamp(new Date().getTime()));
		this.setLastModifyTime(new Timestamp(new Date().getTime()));
	}

	public String getUuid() {
		return this.uuid;
	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
	}

	public String getAppType() {
		return this.appType;
	}

	public void setAppType(String appType) {
		this.appType = appType;
	}

	public Timestamp getCreateTime() {
		return this.createTime;
	}

	public void setCreateTime(Timestamp createTime) {
		this.createTime = createTime;
	}

	public String getCreateUser() {
		return this.createUser;
	}

	public void setCreateUser(String createUser) {
		this.createUser = createUser;
	}

	public String getInvalid() {
		return this.invalid;
	}

	public void setInvalid(String invalid) {
		this.invalid = invalid;
	}

	public Timestamp getLastModifyTime() {
		return this.lastModifyTime;
	}

	public void setLastModifyTime(Timestamp lastModifyTime) {
		this.lastModifyTime = lastModifyTime;
	}

	public String getLastModifyUser() {
		return this.lastModifyUser;
	}

	public void setLastModifyUser(String lastModifyUser) {
		this.lastModifyUser = lastModifyUser;
	}

	public int getNumber1() {
		return this.number1;
	}

	public void setNumber1(int number1) {
		this.number1 = number1;
	}

	public int getNumber2() {
		return this.number2;
	}

	public void setNumber2(int number2) {
		this.number2 = number2;
	}

	public int getNumber3() {
		return this.number3;
	}

	public void setNumber3(int number3) {
		this.number3 = number3;
	}

	public String getOnFlag() {
		return this.onFlag;
	}

	public void setOnFlag(String onFlag) {
		this.onFlag = onFlag;
	}

	public String getOperStatus() {
		return this.operStatus;
	}

	public void setOperStatus(String operStatus) {
		this.operStatus = operStatus;
	}

	public String getPublishDate() {
		return this.publishDate;
	}

	public void setPublishDate(String publishDate) {
		this.publishDate = publishDate;
	}

	public String getPublishNotes() {
		return this.publishNotes;
	}

	public void setPublishNotes(String publishNotes) {
		this.publishNotes = publishNotes;
	}

	public String getPublishType() {
		 return this.publishType;
	}

	public void setPublishType(String publishType) {
		this.publishType=publishType;
	}

	public String getPublisher() {
		return this.publisher;
	}

	public void setPublisher(String publisher) {
		this.publisher = publisher;
	}

	public String getUpdateList() {
		return this.updateList;
	}

	public void setUpdateList(String updateList) {
		this.updateList = updateList;
	}

}