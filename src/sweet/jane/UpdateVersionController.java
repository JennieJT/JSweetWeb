package sweet.jane;
import java.io.IOException;
import java.math.BigInteger;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
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
import org.hibernate.query.Query;
import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import model.DataAndCount;
import model.GridSearch;
import model.OriginalVersionManage;
import model.Pagination;
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
				" FROM original_version_manage v JOIN org_user u on u.user_uuid=v.publisher "
				+ "ORDER BY number_1 DESC ,number_2 DESC ,number_3 DESC"
				;	
		Session session = sessionFactory.openSession();
		List<SelectedAttributes> result = session.createNativeQuery(sql1)
			.setResultTransformer( Transformers.aliasToBean( SelectedAttributes.class ) )
			.list();
		//experiment
		Query<SelectedAttributes> exp=session.createNativeQuery(sql1)
				.setResultTransformer( Transformers.aliasToBean( SelectedAttributes.class ) );
		exp.setFirstResult(0);
		exp.setMaxResults(5);
		List<SelectedAttributes> page1=exp.list();

	JsonResult r=new JsonResult();
	r.setMessage("Hello");
	r.setCode(1);
	r.setSuccess(true);
	r.setData(result);
	return r;
}

@ResponseBody
@RequestMapping("paginationFetchTable")
	public JsonResult getPaginationFetchTable(Pagination frontData)throws IOException{
	DataAndCount result =new DataAndCount();
	//change to an object with different sorted way in the future.
	String sql;
	String countQ;
    String value=frontData.getValue();
	if(frontData.getValue()==null||frontData.getValue().length()==0) {
	sql="SELECT uuid, v.number_1 as number1, v.number_2 as number2, v.number_3 as number3, u.user_name as userName, v.publish_date as publishDate, "
			+ "publish_type as publishType, publish_notes as publishNotes, update_list as updateList \n" + 
			" FROM original_version_manage v JOIN org_user u on u.user_uuid=v.publisher "
			+ "ORDER BY number_1 DESC ,number_2 DESC ,number_3 DESC"
			;
	countQ="Select count(uuid) "
			+ "FROM original_version_manage v JOIN org_user u on u.user_uuid=v.publisher";
	}else {
		sql="SELECT uuid, v.number_1 as number1, v.number_2 as number2, v.number_3 as number3, u.user_name as userName, v.publish_date as publishDate, "
				+ "publish_type as publishType, publish_notes as publishNotes, update_list as updateList \n" + 
				" FROM original_version_manage v JOIN org_user u on u.user_uuid=v.publisher "
				+"WHERE publish_notes"+" LIKE '%"+value+"%' "
				+ "ORDER BY number_1 DESC ,number_2 DESC ,number_3 DESC"
				;
		countQ="Select count(uuid) "
				+ "FROM original_version_manage v JOIN org_user u on u.user_uuid=v.publisher "
				+"WHERE publish_notes LIKE '%"+value+"%'"
				;
	}

	Session session = sessionFactory.openSession();
	Query<SelectedAttributes> exp=session.createNativeQuery(sql)
			.setResultTransformer( Transformers.aliasToBean( SelectedAttributes.class ) );
	exp.setFirstResult((frontData.getCurPage()-1)*frontData.getRowNum());
	exp.setMaxResults(frontData.getRowNum());
	List<SelectedAttributes> data=exp.list();

	result.setData(data);
	//total count
	Query countQuery = session.createNativeQuery(countQ);
	BigInteger countResults = (BigInteger) countQuery.uniqueResult();
	String count=countResults.toString();
	result.setCountRow(count);
JsonResult r=new JsonResult();
r.setMessage("Hello");
r.setCode(1);
r.setSuccess(true);
r.setData(result);
//Map<String,Object> map=new HashMap<>();
return r;
	}

@ResponseBody
@RequestMapping("maxVersionNumber")
	public  JsonResult getMaxVersionNumber() throws IOException {
	String sql = "select * from original_version_manage version "
			+ "ORDER BY number_1 DESC ,number_2 DESC ,number_3 DESC ";
//	+ "where version.invalid= ? and version.app_type=? "
		Session session = sessionFactory.openSession();
		List<OriginalVersionManage> result = session.createNativeQuery(sql,OriginalVersionManage.class)
				.getResultList();
		OriginalVersionManage tmp=result.get(0);
		OriginalVersionManage res=new OriginalVersionManage();
		if (tmp.getNumber3() < 999) {
			res.setNumber3(tmp.getNumber3() + 1);
			res.setNumber2(tmp.getNumber2());
			res.setNumber1(tmp.getNumber1());
		} else if (tmp.getNumber2()< 99) {
			res.setNumber3(tmp.getNumber3());
			res.setNumber2(tmp.getNumber2() + 1);
			res.setNumber1(tmp.getNumber1());
		} else {
			res.setNumber3(tmp.getNumber3());
			res.setNumber2(tmp.getNumber2());
			res.setNumber1(tmp.getNumber1() + 1 );
		}
		res.setPublishType("1");
	JsonResult r=new JsonResult();
	r.setMessage("Hello");
	r.setCode(1);
	r.setSuccess(true);
	r.setData(res);
	return r;
}

@ResponseBody
@RequestMapping("currentVersion")
	public  JsonResult getcurrentVersion(SelectedAttributes target) throws IOException {
	String sql = "select * from original_version_manage version where uuid='"+target.getUuid()+"'";
//	+ "where version.invalid= ? and version.app_type=? "
		Session session = sessionFactory.openSession();
		List<OriginalVersionManage> result = session.createNativeQuery(sql,OriginalVersionManage.class)
				.getResultList();
		OriginalVersionManage res=result.get(0);
	JsonResult r=new JsonResult();
	r.setMessage("Hello");
	r.setCode(1);
	r.setSuccess(true);
	r.setData(res);
	return r;
}

@ResponseBody
@RequestMapping("toOfficialType")
public  JsonResult getToOfficialType(SelectedAttributes target) throws IOException {
	String sql = "select * from original_version_manage version where uuid='"+target.getUuid()+"'";
	Session session = sessionFactory.openSession();
	List<OriginalVersionManage> result = session.createNativeQuery(sql,OriginalVersionManage.class)
			.getResultList();
	OriginalVersionManage res=result.get(0);
	res.setPublishType("2");
	session.beginTransaction();
	session.saveOrUpdate(res);
	session.getTransaction().commit();
	session.close();

JsonResult r=new JsonResult();
r.setCode(1);
r.setSuccess(true);
//r.setData(result2);
return r;
}

@ResponseBody
@RequestMapping("paramForm")
public  JsonResult getParamForm(OriginalVersionManage result2) throws IOException {
	UpdateVersionHelper helper=new UpdateVersionHelper();
	helper.setSourcePath("/Users/jingtianwang/Documents/GitHub/JSweetWeb/WebContent/www/update/html5");
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
	SimpleDateFormat ft = new SimpleDateFormat ("yyyy-MM-dd hh:mm:ss");
	result2.setPublishDate(ft.format(new Date()));
	result2.setPublisher(publisher);
	String updateList=helper.getUpdateList(helper.getSourcePath());
	
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
