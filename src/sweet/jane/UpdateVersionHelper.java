package sweet.jane;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.hibernate.transform.Transformers;

import model.SelectedAttributes;

public class UpdateVersionHelper {
	String sourcePath="/Users/jingtianwang/Documents/GitHub/JSweetWeb/WebContent/www";
	public List<String> getVersionNumList() {
		SessionFactory sessionFactory = new Configuration().configure("hibernate.version.cfg.xml").buildSessionFactory();
		Session session = sessionFactory.openSession();
		String publishedSql="SELECT v.number_1 as number1, v.number_2 as number2, v.number_3 as number3, "
				+ "publish_type as publishType, update_list as updateList \n" + 
				" FROM original_version_manage v "
				+"WHERE publish_type='2' "
				+ "ORDER BY number_1 DESC ,number_2 DESC ,number_3 DESC"
				;
		
		List<SelectedAttributes> published = session.createNativeQuery(publishedSql)
				.setResultTransformer( Transformers.aliasToBean( SelectedAttributes.class ) )
				.list();
		List<String> ans=new ArrayList<>();
		for(int i =0;i<published.size();i++) {
			SelectedAttributes version=published.get(i);
			String versionNumber=version.getNumber1()+"."
					+version.getNumber2()+"."
					+version.getNumber3();
			ans.add(versionNumber);
		}
		return ans;
		
	}
	public String getVersionNum() {
		if(this.getVersionNumList().isEmpty()) {
			return "";
		}
		return this.getVersionNumList().get(0);
	}
	public String getSourcePath() {
		return sourcePath;
	}
	public void setSourcePath(String sourcePath) {
		this.sourcePath = sourcePath;
	}
	public void deleteFile(File file) {
		if (file.exists()) {// 判断文件是否存在
			if (file.isFile()) {// 判断是否是文件
				file.delete();// 删除文件
			} else if (file.isDirectory()) {// 否则如果它是一个目录
				File[] files = file.listFiles();// 声明目录下所有的文件 files[];
				for (int i = 0; i < files.length; i++) {// 遍历目录下所有的文件
					deleteFile(files[i]);// 把每个文件用这个方法进行迭代
				}
				file.delete();// 删除文件夹
			}
		}
//		else {
//			System.out.println("所删除的文件不存在");
//		}
	}
	public String  getZipSavePath()
	{
		String zipPath=sourcePath+"/update/html5/";
		File  d=new File(zipPath);
		if(!d.exists())
		{
			d.mkdirs();
		}
		return zipPath;
	}
	public String  getAddZipSavePath(String versionNum)
	{
		String addZipPath=sourcePath+"/update/addZip/"+versionNum+"/mobile";
		File  d=new File(addZipPath);
		if(!d.exists())
		{
			d.mkdirs();
		}
		return addZipPath;
	}
	public void copyFile(String fileInput, String... fileOutput) {

		try {
			//如目标路径不存在，则新建目标文件夹			
			for(int i=0;i<fileOutput.length;i++){
				FileInputStream fileInputStream = new FileInputStream(fileInput);
				File output=new File(fileOutput[i]);
				String path=output.getAbsolutePath().replaceAll(output.getName(), "");
				File  d=new File(path);
			
				if(!d.exists())
				{
					d.mkdirs();
				}
				
				FileOutputStream fileOutputStream = new FileOutputStream(fileOutput[i]);
				byte[] by = new byte[fileInputStream.available()];
				int len = 0;
				while ((len = fileInputStream.read(by)) >0) {
					fileOutputStream.write(by, 0, len);
					fileOutputStream.flush();
				}
				fileOutputStream.close();
				fileInputStream.close();
			}
		
		} catch (Exception e) {
			// TODO Auto-generated catch block
			System.out.println("Wrong");
//			logger.error(e.getMessage());
		}
	}
	public void contentToTxt(String filePath, ArrayList<String> cont)  {
		 String str = new String(); //原有txt内容  
	        String s1 = new String();//内容更新  
	        try {  
	            File f = new File(filePath);  
	            if (!(f.exists())) {  
	            	 f.createNewFile();// 不存在则创建    
	            }
	            BufferedReader input = new BufferedReader(new FileReader(f));  
	  
	            while ((str = input.readLine()) != null) {  
	                s1 += str + "\r\n";  
	            }  
	            input.close();  
	            for(String path:cont){
	            	
	            		s1 += path+ "\r\n";  
	            	
	            }
	  
	            BufferedWriter output = new BufferedWriter(new FileWriter(f));  
	            output.write(s1);  
	            output.close();  
	        } catch (Exception e) {  
	            e.printStackTrace();  
	  
	        }  
	}
	public String getUpdateList(String unpublishPath) {
		String updateList = "";
		// 格式化待发布版本路径
		String unpushlishFilePath = unpublishPath.replaceAll("\\\\", "/").replaceAll("//", "/");
		// String unpushlishFilePath1=unpushlishFilePath.replaceAll("/", "\\");
		// 自己写：正式发布版本zip路径
		List<String> version = this.getVersionNumList();
		for (String versionNum : version) {
			String version_Num=versionNum.replace(".", "_");
			String saveAllZipName="original_"+version_Num+"_all.zip";
			String publishedPath = this.getSourcePath() + "/" + versionNum + "/"+saveAllZipName;
			// 解压缩
			JSweetZipHelper decompressedFileUtil = new JSweetZipHelper();
			String tempSavePath = this.getZipSavePath() + versionNum + "/";
			String tempSavePath1 = (this.getZipSavePath() + versionNum + "/www")
					.replaceAll("\\\\", "/").replaceAll("//", "/");
			try {
				this.deleteFile(new File(tempSavePath1));// 清空文件夹
				//ectract
				decompressedFileUtil.Ectract(publishedPath, tempSavePath);
				// 对比待发布和已正式发布版本
				JSweetCompareFileHelper compareFile=new JSweetCompareFileHelper();
				Map<String, List<FileMd5>> map = compareFile.compare(tempSavePath1, unpushlishFilePath);
				List<FileMd5> updateFile = (List<FileMd5>) map.get("updateFile");
				List<FileMd5> delFile = (List<FileMd5>) map.get("delFile");
				List<FileMd5> addFile = (List<FileMd5>) map.get("addFile");
				this.deleteFile(new File(this.getAddZipSavePath(versionNum)));// 清空文件夹
				if ((updateFile!=null)&&(updateFile.size()>0)) {
					for (FileMd5 fileMd5 : updateFile) {
						
						String filePath = fileMd5.getFile().getAbsolutePath().replaceAll("\\\\", "/");
						String updateFilePath = filePath.replaceAll(unpushlishFilePath, "");
						if(versionNum.equals(getVersionNum())){
							updateList = updateList + "updateFile：" + updateFilePath + ";";
						}
						// 保存修改文件
						this.copyFile(fileMd5.getFile().getAbsolutePath(),
								this.getAddZipSavePath(versionNum) + updateFilePath);
					}
				}
				if ((delFile != null) && (delFile.size() > 0)) {
					ArrayList<String> delPath = new ArrayList<String> ();//获取相对路径
						for (FileMd5 fileMd5 : delFile) {
							if (versionNum.equals(getVersionNum())) {
							updateList = updateList + "delFile：" + fileMd5.getFile().getName() + ";";
							}
							String filePath = fileMd5.getFile().getAbsolutePath().replaceAll("\\\\", "/");
							delPath.add(filePath.replaceAll(tempSavePath1, "/www"));
						}
					this.contentToTxt(this.getAddZipSavePath(versionNum) + "/deletelist.txt",
							delPath);
				}
				if ((addFile!=null)&&(addFile.size()>0)) {
					for (FileMd5 fileMd5 : addFile) {
						String filePath = fileMd5.getFile().getAbsolutePath().replaceAll("\\\\", "/");
						String updateFilePath = filePath.replaceAll(unpushlishFilePath, "");
						if (versionNum.equals(getVersionNum())) {
							updateList = updateList + "addFile：" + updateFilePath + ";";
						}
						// 保存新增文件
						this.copyFile(fileMd5.getFile().getAbsolutePath(),
								this.getAddZipSavePath(versionNum) + updateFilePath);
					}
				}
				
				
			} catch (Exception e) {
				System.out.println("wrong");
				//logger.error(e.getMessage());
			}
		}
		return updateList;
	}

}
