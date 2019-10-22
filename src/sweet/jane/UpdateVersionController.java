package sweet.jane;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;
import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import model.OriginalVersionManage;
import model.SelectedAttributes;
import sweet.jane.model.Course;
import sweet.jane.model.JsweetUser;

@RequestMapping("/updateVersion")
@Controller
public class UpdateVersionController{
	static EntityManager entityManager=null;
	public UpdateVersionController() {
	}
	public EntityManager getEntityManager() {
		if(entityManager==null) {
			EntityManagerFactory emf = Persistence.createEntityManagerFactory("h5");
			entityManager=emf.createEntityManager();
		}
		return entityManager;
	}
	
@ResponseBody
@RequestMapping("fetchTable")
	public  JsonResult fetchTable() throws IOException {
		String  sql1="SELECT uuid, v.number_1 as number1, v.number_2 as number2, v.number_3 as number3, u.user_name as userName, v.publish_date as publishDate, "
				+ "publish_type as publishType, publish_notes as publishNotes, update_list as updateList \n" + 
				" FROM original_version_manage v JOIN org_user u on u.user_uuid=v.publisher;";
			//"WHERE publisher=orgUser.userUuid"
		
		SessionFactory sessionAnnotationFactory; 
		sessionAnnotationFactory = new Configuration().configure("hibernate.version.cfg.xml").buildSessionFactory();
		Session session = sessionAnnotationFactory.openSession();
		List<SelectedAttributes> result = session.createNativeQuery(sql1)
			.setResultTransformer( Transformers.aliasToBean( SelectedAttributes.class ) )
			.list();

	JsonResult r=new JsonResult();
	r.setMessage("Hello");
	r.setCode(1);
	r.setSuccess(true);
	r.setData(result);
	return r;
}
}
