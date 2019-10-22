package sweet.jane;

import java.io.IOException;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
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
		String  sql1="SELECT number_1, number_2, number_3, publish_date,"
				+ "publish_type, publish_notes, update_list FROM original_version_manage" ;
			//"WHERE publisher=orgUser.userUuid"
		String  sql="SELECT * FROM original_version_manage";
		//		" left join org_user u on version.publisher=u.user_uuid";
		
		   List<SelectedAttributes> result =(List<SelectedAttributes>) getEntityManager().createNativeQuery(
				    sql, OriginalVersionManage.class )
				.getResultList();
		   System.out.println(result.get(0));
		   result.get(0);
	JsonResult r=new JsonResult();
	r.setMessage("Hello");
	r.setCode(1);
	r.setSuccess(true);
	r.setData(result);
	return r;
}
}
