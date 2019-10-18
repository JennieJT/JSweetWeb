package sweet.jane.model;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the takes database table.
 * 
 */
@Entity
@Table(name="takes")
@NamedQuery(name="Take.findAll", query="SELECT t FROM Take t")
public class Take implements Serializable {
	private static final long serialVersionUID = 1L;

	@EmbeddedId
	private TakePK id;

	private String grade;

	public Take() {
	}

	public TakePK getId() {
		return this.id;
	}

	public void setId(TakePK id) {
		this.id = id;
	}

	public String getGrade() {
		return this.grade;
	}

	public void setGrade(String grade) {
		this.grade = grade;
	}

}