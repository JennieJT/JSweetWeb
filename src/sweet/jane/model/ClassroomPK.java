package sweet.jane.model;

import java.io.Serializable;
import javax.persistence.*;

/**
 * The primary key class for the classroom database table.
 * 
 */
@Embeddable
public class ClassroomPK implements Serializable {
	//default serial version id, required for serializable classes.
	private static final long serialVersionUID = 1L;

	private String building;

	@Column(name="room_number")
	private String roomNumber;

	public ClassroomPK() {
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

	public boolean equals(Object other) {
		if (this == other) {
			return true;
		}
		if (!(other instanceof ClassroomPK)) {
			return false;
		}
		ClassroomPK castOther = (ClassroomPK)other;
		return 
			this.building.equals(castOther.building)
			&& this.roomNumber.equals(castOther.roomNumber);
	}

	public int hashCode() {
		final int prime = 31;
		int hash = 17;
		hash = hash * prime + this.building.hashCode();
		hash = hash * prime + this.roomNumber.hashCode();
		
		return hash;
	}
}