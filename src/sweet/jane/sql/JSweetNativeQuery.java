package sweet.jane.sql;
import org.hibernate.query.Query;
import org.hibernate.Session;

public class JSweetNativeQuery<T> implements IJSweetQuery {
	private Session session=null;
	private String sql=null;
	private String type="native";
	private Query<T> query=null;
	JSweetNativeQuery(Class class,Session session,String sql,String type) {
		this.session=session;
		this.sql=sql;
		if(type!=null) {
		this.type=type;
		}
		query=session.createNativeQuery(sql);
	}
	public JSweetNativeQuery<T> setMaxResults(int num){
		return (JSweetNativeQuery<T>) query.setMaxResults(num);
	}
	public JSweetNativeQuery<T> setFirstResult(int num){
		return (JSweetNativeQuery<T>) query.setFirstResult(num);
	}
}
