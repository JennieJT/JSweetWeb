package sweet.jane.model;

import java.io.Serializable;
import javax.persistence.*;
import java.math.BigDecimal;


/**
 * The persistent class for the grade_point database table.
 * 
 */
@Entity
@Table(name="grade_point")
@NamedQuery(name="GradePoint.findAll", query="SELECT g FROM GradePoint g")
public class GradePoint implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private String grade;

	private BigDecimal point;

	public GradePoint() {
	}

	public String getGrade() {
		return this.grade;
	}

	public void setGrade(String grade) {
		this.grade = grade;
	}

	public BigDecimal getPoint() {
		return this.point;
	}

	public void setPoint(BigDecimal point) {
		this.point = point;
	}

}