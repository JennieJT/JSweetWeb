package sweet.jane;
import com.alibaba.fastjson.JSONObject;

public class JsonResult {
	public Object getData() {
		return data;
	}
	public void setData(Object d) {
		this.data = d;
	}
	public boolean isSuccess() {
		return success;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}
	public Number getCode() {
		return code;
	}
	public void setCode(Number code) {
		this.code = code;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public  String  toJSON() {
		return JSONObject.toJSONString(this);
	}
	boolean success=true;
	Number  code=0;
	String  message="ok";
	Object  data;

}
