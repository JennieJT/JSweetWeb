package sweet.jane.model;

import java.io.Serializable;
import javax.persistence.*;

/**
 * The primary key class for the time_slot database table.
 * 
 */
@Embeddable
public class TimeSlotPK implements Serializable {
	//default serial version id, required for serializable classes.
	private static final long serialVersionUID = 1L;

	@Column(name="time_slot_id")
	private String timeSlotId;

	private String day;

	@Column(name="start_hr")
	private long startHr;

	@Column(name="start_min")
	private long startMin;

	public TimeSlotPK() {
	}
	public String getTimeSlotId() {
		return this.timeSlotId;
	}
	public void setTimeSlotId(String timeSlotId) {
		this.timeSlotId = timeSlotId;
	}
	public String getDay() {
		return this.day;
	}
	public void setDay(String day) {
		this.day = day;
	}
	public long getStartHr() {
		return this.startHr;
	}
	public void setStartHr(long startHr) {
		this.startHr = startHr;
	}
	public long getStartMin() {
		return this.startMin;
	}
	public void setStartMin(long startMin) {
		this.startMin = startMin;
	}

	public boolean equals(Object other) {
		if (this == other) {
			return true;
		}
		if (!(other instanceof TimeSlotPK)) {
			return false;
		}
		TimeSlotPK castOther = (TimeSlotPK)other;
		return 
			this.timeSlotId.equals(castOther.timeSlotId)
			&& this.day.equals(castOther.day)
			&& (this.startHr == castOther.startHr)
			&& (this.startMin == castOther.startMin);
	}

	public int hashCode() {
		final int prime = 31;
		int hash = 17;
		hash = hash * prime + this.timeSlotId.hashCode();
		hash = hash * prime + this.day.hashCode();
		hash = hash * prime + ((int) (this.startHr ^ (this.startHr >>> 32)));
		hash = hash * prime + ((int) (this.startMin ^ (this.startMin >>> 32)));
		
		return hash;
	}
}