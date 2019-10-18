package sweet.jane.model;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the section database table.
 * 
 */
@Entity
@NamedQuery(name="Section.findAll", query="SELECT s FROM Section s")
public class Section implements Serializable {
	private static final long serialVersionUID = 1L;

	@EmbeddedId
	private SectionPK id;

	private String building;

	@Column(name="room_number")
	private String roomNumber;

	@Column(name="time_slot_id")
	private String timeSlotId;

	public Section() {
	}

	public SectionPK getId() {
		return this.id;
	}

	public void setId(SectionPK id) {
		this.id = id;
	}

	public String getBuilding() {
		return this.building;
	}

	public void setBuilding(String building) {
		this.building = building;
	}

	public String getRoomNumber() {
		return this.roomNumber;
	}

	public void setRoomNumber(String roomNumber) {
		this.roomNumber = roomNumber;
	}

	public String getTimeSlotId() {
		return this.timeSlotId;
	}

	public void setTimeSlotId(String timeSlotId) {
		this.timeSlotId = timeSlotId;
	}

}