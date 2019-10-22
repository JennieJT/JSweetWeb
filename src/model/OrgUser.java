package model;

import java.io.Serializable;
import javax.persistence.*;
import java.sql.Timestamp;


/**
 * The persistent class for the org_user database table.
 * 
 */
@Entity
@Table(name="org_user")
@NamedQuery(name="OrgUser.findAll", query="SELECT o FROM OrgUser o")
public class OrgUser implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="USER_UUID")
	private String userUuid;

	private String birthday;

	@Column(name="CREATE_TIME")
	private Timestamp createTime;

	@Column(name="CREATE_USER")
	private String createUser;

	@Column(name="DIRECT_LEADER")
	private String directLeader;

	private String email;

	private String extend1;

	private String extend10;

	private String extend11;

	private String extend12;

	private String extend13;

	private String extend14;

	private String extend15;

	private String extend16;

	private String extend17;

	private String extend18;

	private String extend19;

	private String extend2;

	private String extend20;

	private String extend3;

	private String extend4;

	private String extend5;

	private String extend6;

	private String extend7;

	private String extend8;

	private String extend9;

	private String fax;

	private String invalid;

	@Column(name="LAST_MODIFY_TIME")
	private Timestamp lastModifyTime;

	@Column(name="LAST_MODIFY_USER")
	private String lastModifyUser;

	@Column(name="OFFICE_PHONE")
	private String officePhone;

	@Column(name="OPER_STATUS")
	private String operStatus;

	private String phone;

	private String sex;

	private int sort;

	@Column(name="USER_CODE")
	private String userCode;

	@Column(name="USER_NAME")
	private String userName;

	@Column(name="ZW_NAME")
	private String zwName;

	@Column(name="ZW_UUID")
	private String zwUuid;

	public OrgUser() {
	}

	public String getUserUuid() {
		return this.userUuid;
	}

	public void setUserUuid(String userUuid) {
		this.userUuid = userUuid;
	}

	public String getBirthday() {
		return this.birthday;
	}

	public void setBirthday(String birthday) {
		this.birthday = birthday;
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

	public String getDirectLeader() {
		return this.directLeader;
	}

	public void setDirectLeader(String directLeader) {
		this.directLeader = directLeader;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getExtend1() {
		return this.extend1;
	}

	public void setExtend1(String extend1) {
		this.extend1 = extend1;
	}

	public String getExtend10() {
		return this.extend10;
	}

	public void setExtend10(String extend10) {
		this.extend10 = extend10;
	}

	public String getExtend11() {
		return this.extend11;
	}

	public void setExtend11(String extend11) {
		this.extend11 = extend11;
	}

	public String getExtend12() {
		return this.extend12;
	}

	public void setExtend12(String extend12) {
		this.extend12 = extend12;
	}

	public String getExtend13() {
		return this.extend13;
	}

	public void setExtend13(String extend13) {
		this.extend13 = extend13;
	}

	public String getExtend14() {
		return this.extend14;
	}

	public void setExtend14(String extend14) {
		this.extend14 = extend14;
	}

	public String getExtend15() {
		return this.extend15;
	}

	public void setExtend15(String extend15) {
		this.extend15 = extend15;
	}

	public String getExtend16() {
		return this.extend16;
	}

	public void setExtend16(String extend16) {
		this.extend16 = extend16;
	}

	public String getExtend17() {
		return this.extend17;
	}

	public void setExtend17(String extend17) {
		this.extend17 = extend17;
	}

	public String getExtend18() {
		return this.extend18;
	}

	public void setExtend18(String extend18) {
		this.extend18 = extend18;
	}

	public String getExtend19() {
		return this.extend19;
	}

	public void setExtend19(String extend19) {
		this.extend19 = extend19;
	}

	public String getExtend2() {
		return this.extend2;
	}

	public void setExtend2(String extend2) {
		this.extend2 = extend2;
	}

	public String getExtend20() {
		return this.extend20;
	}

	public void setExtend20(String extend20) {
		this.extend20 = extend20;
	}

	public String getExtend3() {
		return this.extend3;
	}

	public void setExtend3(String extend3) {
		this.extend3 = extend3;
	}

	public String getExtend4() {
		return this.extend4;
	}

	public void setExtend4(String extend4) {
		this.extend4 = extend4;
	}

	public String getExtend5() {
		return this.extend5;
	}

	public void setExtend5(String extend5) {
		this.extend5 = extend5;
	}

	public String getExtend6() {
		return this.extend6;
	}

	public void setExtend6(String extend6) {
		this.extend6 = extend6;
	}

	public String getExtend7() {
		return this.extend7;
	}

	public void setExtend7(String extend7) {
		this.extend7 = extend7;
	}

	public String getExtend8() {
		return this.extend8;
	}

	public void setExtend8(String extend8) {
		this.extend8 = extend8;
	}

	public String getExtend9() {
		return this.extend9;
	}

	public void setExtend9(String extend9) {
		this.extend9 = extend9;
	}

	public String getFax() {
		return this.fax;
	}

	public void setFax(String fax) {
		this.fax = fax;
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

	public String getOfficePhone() {
		return this.officePhone;
	}

	public void setOfficePhone(String officePhone) {
		this.officePhone = officePhone;
	}

	public String getOperStatus() {
		return this.operStatus;
	}

	public void setOperStatus(String operStatus) {
		this.operStatus = operStatus;
	}

	public String getPhone() {
		return this.phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getSex() {
		return this.sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public int getSort() {
		return this.sort;
	}

	public void setSort(int sort) {
		this.sort = sort;
	}

	public String getUserCode() {
		return this.userCode;
	}

	public void setUserCode(String userCode) {
		this.userCode = userCode;
	}

	public String getUserName() {
		return this.userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getZwName() {
		return this.zwName;
	}

	public void setZwName(String zwName) {
		this.zwName = zwName;
	}

	public String getZwUuid() {
		return this.zwUuid;
	}

	public void setZwUuid(String zwUuid) {
		this.zwUuid = zwUuid;
	}

}