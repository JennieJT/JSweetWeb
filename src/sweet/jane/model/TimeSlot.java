package sweet.jane.model;

import java.io.Serializable;
import javax.persistence.*;
import java.math.BigDecimal;


/**
 * The persistent class for the time_slot database table.
 * 
 */
@Entity
@Table(name="time_slot")
@NamedQuery(name="TimeSlot.findAll", query="SELECT t FROM TimeSlot t")
public class TimeSlot implements Serializable {
	private static final long serialVersionUID = 1L;

	@EmbeddedId
	private TimeSlotPK id;

	@Column(name="end_hr")
	private BigDecimal endHr;

	@Column(name="end_min")
	private BigDecimal endMin;

	public TimeSlot() {
	}

	public TimeSlotPK getId() {
		return this.id;
	}

	public void setId(TimeSlotPK id) {
		this.id = id;
	}

	public BigDecimal getEndHr() {
		return this.endHr;
	}

	public void setEndHr(BigDecimal endHr) {
		this.endHr = endHr;
	}

	public BigDecimal getEndMin() {
		return this.endMin;
	}

	public void setEndMin(BigDecimal endMin) {
		this.endMin = endMin;
	}

}