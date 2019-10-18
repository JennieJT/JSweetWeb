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

import sweet.jane.model.JsweetUser;
//import org.springframework.web.servlet.mvc.Controller;

@RequestMapping("/jane")
@Controller
public class HelloController{
	public HelloController() {
		setUp();
	}
	SessionFactory sessionFactory=null; 
	
	@RequestMapping("/carchy")
    public ModelAndView handleRequest(
    		javax.servlet.http.HttpServletRequest httpServletRequest,
    		javax.servlet.http.HttpServletResponse httpServletResponse) throws Exception {
        ModelAndView mav = new ModelAndView("/index.jsp");
        mav.addObject("message", "Hello Carchy Hello World");
        return mav;
    }
	
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
	
//	
	@ResponseBody
	@RequestMapping("/param")
	public JsonResult getParam(jsweetForm form) {
		System.out.println(form.getHobby());
		System.out.println(form.getColor());
		System.out.println(form.getDate());

		JsonResult r=new JsonResult();
		//r.setForm(form);
		//r.setForm(form);

		return r;
	}

	@ResponseBody
	@RequestMapping("/paramForm")
	public  JsonResult getParamForm(JsweetUser form) throws IOException {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		session.saveOrUpdate(form);
		session.getTransaction().commit();
		session.close();

	JsonResult r=new JsonResult();
	r.setCode(1);
	r.setSuccess(true);
	return r;
}
	
	@ResponseBody
	@RequestMapping("/sortFormByDate")
	public  JsonResult sortFormByBirthdate(FormParam form) throws IOException {
		String fliePath=System.getProperty("user.home") +"/peopleInformation5.txt";
		  File file = new File(fliePath);
		BufferedReader br = new BufferedReader(new FileReader(file)); 
		HashMap<String,StringBuilder> hashmap=new HashMap<String,StringBuilder>();
		PriorityQueue<String> birthdays=new PriorityQueue<String>();
		String line=br.readLine();
		JsonResult result=new JsonResult();
		while(line!=null) {
			//get all the birthday
			//sort the birthday
			//return the birthday as a json format
			String[] person=line.split(" , ");
			if(person.length>6) {
			String birthday=person[5];
				StringBuilder people=hashmap.get(birthday);
				if(people==null) {
					people=new StringBuilder();
					birthdays.add(birthday);
				}
				people.append(line);
				people.append("\r\n");
				hashmap.put(birthday, people);
			}
			 line=br.readLine();
		}
		//array to give back to json
		int length=birthdays.size();
		String[] json=new String[length];
		//write to the file
		BufferedWriter wr=new BufferedWriter(new FileWriter(file));
		StringBuilder ans=new StringBuilder();
		for(int i=0;i<length;i++) {
			StringBuilder people=hashmap.get(birthdays.poll());
			ans.append(people);
			json[i]=people.toString();
		}
		wr.write(ans.toString());
	br.close();
	wr.flush();
	wr.close();
	
	result.setMessage("Hello");
	result.setCode(1);
	result.setSuccess(true);
	result.setData(json);
		
		return result;
	}
	
	
	@ResponseBody
	@RequestMapping("/fetchTable")
	public  JsonResult fetchTable() throws IOException {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		String  sql="FROM  JsweetUser j ORDER BY j.birthday ASC";
		List<JsweetUser> result = session.createQuery(sql,JsweetUser.class).list();
		session.getTransaction().commit();
		session.close();
		
	JsonResult r=new JsonResult();
	r.setMessage("Hello");
	r.setCode(1);
	r.setSuccess(true);
	r.setData(result);
	return r;
}
	
	@ResponseBody
	@RequestMapping("/deleteTable")
	public  JsonResult deleteTable(SelectedName name) throws IOException {
		String[] nameToDelete=name.getNameToDelete().split(",");
		HashSet<String> nameSet=new HashSet<String>();
		for(int i=0;i<nameToDelete.length;i++) {
			nameSet.add(nameToDelete[i]);
		}
		String fliePath=System.getProperty("user.home") +"/peopleInformation5.txt";
		  File file = new File(fliePath);
		if(!file.exists()) {
		file.createNewFile();
		}
		StringBuilder newContent=new StringBuilder();
		BufferedReader br = new BufferedReader(new FileReader(file)); 
		String line=br.readLine();
			while(line!=null) {
				FormParam personLine=new FormParam(line);
				if(!nameSet.contains(personLine.getName())) {
					newContent.append(line);
					newContent.append("\r\n");
				}
				line=br.readLine();
			}
		br.close();	
		BufferedWriter wr=new BufferedWriter(new FileWriter(file));
		wr.write(newContent.toString());
		wr.flush();
		wr.close();
	JsonResult r=new JsonResult();
	r.setMessage("Hello");
	r.setCode(1);
	r.setSuccess(true);
	//r.setData(people);
	return r;
}
	
	@ResponseBody
	@RequestMapping("/editTable")
	public  JsonResult editTable(EditName name) throws IOException {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		String  sql="FROM  JsweetUser j WHERE j.name= '"+name.getNameToEdit()+"'";
		List<JsweetUser> result = session.createQuery(sql,JsweetUser.class).list();
		session.getTransaction().commit();
		session.close();
		
	JsonResult r=new JsonResult();
	r.setMessage("Hello");
	r.setCode(1);
	r.setSuccess(true);
	r.setData(result.get(0));
	return r;
}

	class PeopleComparator implements Comparator<FormParam>{
		@Override
		public int compare(FormParam f1, FormParam f2) {
			if(f1.birthday.compareTo(f2.birthday)==0) {
				return 0;
			}
			int tmp=f1.birthday.compareTo(f2.birthday);
			int ans=(tmp<0)? -1:1;
			return ans;
		}
		
	}
//	@RequestMapping("/value")
//	public ModelAndView handleRequest(HttpServletRequest request,
//	                                  HttpServletResponse response) {
//	    request.setAttribute("message","鎴愬姛锛�");
//	    return new ModelAndView("test2.jsp");
//	}
//	@RequestMapping("/value")
//	public ModelAndView handleRequest(HttpServletRequest request,
//            HttpServletResponse response) {
//    ModelAndView mav=new ModelAndView("test2.jsp");
//    mav.addObject("message","鎴愬姛");
//    return mav;
//}
	
	@ModelAttribute
	public void model(Model model) {
	    model.addAttribute("message", "娉ㄨВ鎴愬姛");
	}

	@RequestMapping("/value")
	public String handleRequest() {
		return "test2.jsp";
	}

	@RequestMapping("/jump")
	public String jump() {
		return "redirect: ./value";
	}

}





