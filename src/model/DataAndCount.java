package model;

import java.util.List;

public class DataAndCount {
	List<SelectedAttributes> data;
	String countRow;
	public List<SelectedAttributes> getData() {
		return data;
	}
	public void setData(List<SelectedAttributes> data) {
		this.data = data;
	}
	public String getCountRow() {
		return countRow;
	}
	public void setCountRow(String row) {
		this.countRow = row;
	}
}
