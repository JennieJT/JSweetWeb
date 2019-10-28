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
	public UpdateVersionController() {
	}
	SessionFactory sessionFactory = new Configuration().configure("hibernate.version.cfg.xml").buildSessionFactory();
	
@ResponseBody
@RequestMapping("fetchTable")
	public  JsonResult fetchTable() throws IOException {
		String  sql1="SELECT uuid, v.number_1 as number1, v.number_2 as number2, v.number_3 as number3, u.user_name as userName, v.publish_date as publishDate, "
				+ "publish_type as publishType, publish_notes as publishNotes, update_list as updateList \n" + 
				" FROM original_version_manage v JOIN org_user u on u.user_uuid=v.publisher;";
			//"WHERE publisher=orgUser.userUuid"
		Session session = sessionFactory.openSession();
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

@ResponseBody
@RequestMapping("currentVersion")
	public  JsonResult getcurrentVersion(String id) throws IOException {
	String sql = "select * from original_version_manage version where uuid="+id;
//	+ "where version.invalid= ? and version.app_type=? "
		Session session = sessionFactory.openSession();
		OriginalVersionManage res = (OriginalVersionManage) session.createNativeQuery(sql);
		if (res.getNumber3() < 999) {
			res.setNumber3(res.getNumber3() + 1);
		} else if (res.getNumber2()< 99) {
			res.setNumber3(1);
			res.setNumber2(res.getNumber2() + 1);
		} else {
			res.setNumber3(1);
			res.setNumber2(1);
			res.setNumber1(res.getNumber1() + 1 );
		}
	JsonResult r=new JsonResult();
	r.setMessage("Hello");
	r.setCode(1);
	r.setSuccess(true);
	r.setData(res);
	return r;
}

@ResponseBody
@RequestMapping("paramForm")
public  JsonResult getParamForm(OriginalVersionManage result2) throws IOException {
	String sql2="SELECT o FROM OriginalVersionManage o";
	//OriginalVersionManage result=new OriginalVersionManage(form);
	Session session = sessionFactory.openSession();
	String publisher="c8f1ba6c7cf842409aba43206e9f7442";
	//List<OriginalVersionManage> result2=session.createQuery(sql2).list();
	result2.setPublishType("1");
	result2.setAppType("h5");
	result2.setCreateUser(publisher);
	result2.setInvalid("1");
	result2.setLastModifyUser(publisher);
	result2.setOnFlag("1");
	result2.setOperStatus("1");
	result2.setPublishDate("2019-10-25");
	result2.setPublisher(publisher);
	session.beginTransaction();
	session.saveOrUpdate(result2);
	session.getTransaction().commit();
	session.close();

JsonResult r=new JsonResult();
r.setCode(1);
r.setSuccess(true);
return r;
}
}
