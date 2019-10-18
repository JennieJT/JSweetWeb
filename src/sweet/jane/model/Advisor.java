package sweet.jane.model;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the advisor database table.
 * 
 */
@Entity
@NamedQuery(name="Advisor.findAll", query="SELECT a FROM Advisor a")
public class Advisor implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private String s_ID;

	private String i_ID;

	public Advisor() {
	}

	public String getS_ID() {
		return this.s_ID;
	}

	public void setS_ID(String s_ID) {
		this.s_ID = s_ID;
	}

	public String getI_ID() {
		return this.i_ID;
	}

	public void setI_ID(String i_ID) {
		this.i_ID = i_ID;
	}

}