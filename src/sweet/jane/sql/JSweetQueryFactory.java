package sweet.jane.sql;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class JSweetQueryFactory {
	public static IJSweetQuery createJSweetQueryFactory(Class cls,String sql) {
		if(factory==null){
			factory=new JSweetQueryFactory();
		}
		return factory.getIJSweetQuery(cls,sql);
	}
	private static JSweetQueryFactory factory=null;
	SessionFactory sessionFactory = new Configuration().configure("hibernate.version.cfg.xml").buildSessionFactory();
	private JSweetQueryFactory() {
		//just for convenience
		createSession();
	}
	private static int MAXNUMBER=10;
	private int sessionNum=0;
	Session[] sessions=new Session[MAXNUMBER];
	private IJSweetQuery getIJSweetQuery(Class<?> cls, String sql) {
		Session tmp=getSession();
		JSweetNativeQuery<cls> tmp2=new JSweetNativeQuery<cls>(tmp,sql,"native");
		return tmp2;
	}
	private Session getSession() {
		return sessions[0];
		
	}
	private Session createSession() {
		for(int i=0;i<sessions.length;i++) {
			if(sessions[i]==null) {
				Session tmp=sessionFactory.openSession();
				sessions[i]=tmp;
				return tmp;
			}
		}
		return null;		
	}
	
}
