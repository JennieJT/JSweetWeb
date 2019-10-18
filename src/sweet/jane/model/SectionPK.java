package sweet.jane.model;

import java.io.Serializable;
import javax.persistence.*;

/**
 * The primary key class for the section database table.
 * 
 */
@Embeddable
public class SectionPK implements Serializable {
	//default serial version id, required for serializable classes.
	private static final long serialVersionUID = 1L;

	@Column(name="course_id", insertable=false, updatable=false)
	private String courseId;

	@Column(name="sec_id")
	private String secId;

	private String semester;

	private long year;

	public SectionPK() {
	}
	public String getCourseId() {
		return this.courseId;
	}
	public void setCourseId(String courseId) {
		this.courseId = courseId;
	}
	public String getSecId() {
		return this.secId;
	}
	public void setSecId(String secId) {
		this.secId = secId;
	}
	public String getSemester() {
		return this.semester;
	}
	public void setSemester(String semester) {
		this.semester = semester;
	}
	public long getYear() {
		return this.year;
	}
	public void setYear(long year) {
		this.year = year;
	}

	public boolean equals(Object other) {
		if (this == other) {
			return true;
		}
		if (!(other instanceof SectionPK)) {
			return false;
		}
		SectionPK castOther = (SectionPK)other;
		return 
			this.courseId.equals(castOther.courseId)
			&& this.secId.equals(castOther.secId)
			&& this.semester.equals(castOther.semester)
			&& (this.year == castOther.year);
	}

	public int hashCode() {
		final int prime = 31;
		int hash = 17;
		hash = hash * prime + this.courseId.hashCode();
		hash = hash * prime + this.secId.hashCode();
		hash = hash * prime + this.semester.hashCode();
		hash = hash * prime + ((int) (this.year ^ (this.year >>> 32)));
		
		return hash;
	}
}