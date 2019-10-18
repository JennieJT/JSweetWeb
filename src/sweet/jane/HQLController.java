package sweet.jane;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
//import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import sweet.jane.model.Advisor;
import sweet.jane.model.Course;
import sweet.jane.model.Instructor;
import sweet.jane.model.JsweetUser;

@RequestMapping("HQL")
@Controller
public class HQLController {
	static EntityManager entityManager=null;
	public HQLController() {
		setUp();
	}
	SessionFactory sessionFactory;
	protected void setUp() {
		// A SessionFactory is set up once for an application!
		final StandardServiceRegistry registry = new StandardServiceRegistryBuilder()
				.configure() // configures settings from hibernate.cfg.xml
				.build();
		try {
			sessionFactory = new MetadataSources( registry ).buildMetadata().buildSessionFactory();
		}
		catch (Exception e) {
			// The registry would be destroyed by the SessionFactory, but we had trouble building the SessionFactory
			// so destroy it manually.
			StandardServiceRegistryBuilder.destroy( registry );
		}
	}
	
	public EntityManager getEntityManager() {
		if(entityManager==null) {
			EntityManagerFactory emf = Persistence.createEntityManagerFactory("JSweetWeb");
			entityManager=emf.createEntityManager();
		}
		return entityManager;
	}

@ResponseBody
@RequestMapping("University")
	public  JsonResult university() throws IOException {
	//Session session = sessionFactory.openSession();
	List<Course> courses =  getEntityManager().createNativeQuery(
		    "SELECT * FROM Course", Course.class )
		.getResultList();
//	List<Advisor> advisors = (List<Advisor>) (session.createNativeQuery(
//		    "SELECT * FROM advisor" +
//		    "FROM Person", Advisor.class ))
//		.getResultList();
	
//	a. Find the titles of courses in the Comp. Sci. department that have 3 credits.
	List<Course> courses1 =  getEntityManager().createNativeQuery(
		    "SELECT * FROM Course WHERE credits=3 AND dept_name='Comp. Sci.' ", Course.class )
		.getResultList();
//	Find the highest salary of any instructor.
	List<Instructor> instructor1 =  getEntityManager().createNativeQuery(
		    "SELECT * FROM instructor WHERE salary=(SELECT max(salary) FROM instructor) ", Instructor.class )
		.getResultList();

	JsonResult r=new JsonResult();
	r.setMessage("Hello");
	r.setCode(1);
	r.setSuccess(true);
	r.setData(courses1);
	r.setData(instructor1);
	return r;
}
}