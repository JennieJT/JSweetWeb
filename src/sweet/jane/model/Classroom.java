package sweet.jane.model;

import java.io.Serializable;
import javax.persistence.*;
import java.math.BigDecimal;


/**
 * The persistent class for the classroom database table.
 * 
 */
@Entity
@NamedQuery(name="Classroom.findAll", query="SELECT c FROM Classroom c")
public class Classroom implements Serializable {
	private static final long serialVersionUID = 1L;

	@EmbeddedId
	private ClassroomPK id;

	private BigDecimal capacity;

	public Classroom() {
	}

	public ClassroomPK getId() {
		return this.id;
	}

	public void setId(ClassroomPK id) {
		this.id = id;
	}

	public BigDecimal getCapacity() {
		return this.capacity;
	}

	public void setCapacity(BigDecimal capacity) {
		this.capacity = capacity;
	}

}