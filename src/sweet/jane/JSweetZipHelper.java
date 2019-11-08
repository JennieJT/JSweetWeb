package sweet.jane;
	import java.io.BufferedOutputStream;
	import java.io.File;
	import java.io.FileInputStream;
	import java.io.FileOutputStream;
	import java.util.zip.ZipEntry;
	import java.util.zip.ZipException;
	import java.util.zip.ZipInputStream;
	import java.util.zip.ZipOutputStream;
//	import com.resoft.original.framework.common.logger.OriginalLogUtils;
	import net.lingala.zip4j.core.ZipFile;
	import net.lingala.zip4j.model.ZipParameters;
	import net.lingala.zip4j.util.Zip4jConstants;


	/**
	 * 
	 * @author hcx
	 * @date 2016-4-22 
	 * @Description: 文件压缩工具类，将指定文件/文件夹压缩成zip、rar压缩文件
	 */

public class JSweetZipHelper {
	    /**
	     * 默认构造函数
	     */
	    public JSweetZipHelper(){
	        
	    }

	    /**
	     * @desc 将源文件/文件夹生成指定格式的压缩文件,格式zip
	     * @param resourePath 源文件/文件夹
	     * @param targetPath  目的压缩文件保存路径
	     * *@param targetName 目的压缩文件名
	     * @return void
	     * @throws Exception 
	     */
	    public void compressedFile(String resourcesPath,String targetPath,String targetName) throws Exception{
	        File resourcesFile = new File(resourcesPath);     //源文件
	        File targetFile = new File(targetPath);           //目的
	        //如果目的路径不存在，则新建
	        if(!targetFile.exists()){     
	            targetFile.mkdirs();  
	        }
	        
	        targetName = targetName+".zip";   //目的压缩文件名
	        FileOutputStream outputStream = new FileOutputStream(targetPath+"/"+targetName);
	        ZipOutputStream out = new ZipOutputStream(new BufferedOutputStream(outputStream));
	        
	        createCompressedFile(out, resourcesFile, "www");
	        
	        out.close();  
	    }
	    
	    /**
	     * @desc 生成压缩文件。
	     *                  如果是文件夹，则使用递归，进行文件遍历、压缩
	     *       如果是文件，直接压缩
	     * @param out  输出流
	     * @param file  目标文件
	     * @return void
	     * @throws Exception 
	     */
	    public void createCompressedFile(ZipOutputStream out,File file,String dir) throws Exception{
	        //如果当前的是文件夹，则进行进一步处理
	        if(file.isDirectory()){
	            //得到文件列表信息
	            File[] files = file.listFiles();
	            //将文件夹添加到下一级打包目录
	            out.putNextEntry(new ZipEntry(dir+"/"));
	            
	            dir = dir.length() == 0 ? "" : dir +"/";
	            
	            //循环将文件夹中的文件打包
	            for(int i = 0 ; i < files.length ; i++){
	                createCompressedFile(out, files[i], dir + files[i].getName());         //递归处理
	            }
	        }
	        else{   //当前的是文件，打包处理
	            //文件输入流
	            FileInputStream fis = new FileInputStream(file);
	            
	            out.putNextEntry(new ZipEntry(dir));
	            //进行写操作
	            int j =  0;
	            byte[] buffer = new byte[1024];
	            while((j = fis.read(buffer)) > 0){
	                out.write(buffer,0,j);
	            }
	            //关闭输入流
	            fis.close();
	        }
	    }
	    
	    /** 
	     * 解压缩 
	     * @param sZipPathFile 要解压的文件 
	     * @param sDestPath 解压到某文件夹 
	     * @return 
	     */  
	    @SuppressWarnings("unchecked")  
	    public void  Ectract(String sZipPathFile, String sDestPath) throws Exception{  
	        try {  
	            // 先指定压缩档的位置和档名，建立FileInputStream对象  
	            FileInputStream fins = new FileInputStream(sZipPathFile);  
	            // 将fins传入ZipInputStream中  
	            ZipInputStream zins = new ZipInputStream(fins);  
	            ZipEntry ze = null;  
	            byte[] ch = new byte[256];  
	            while ((ze = zins.getNextEntry()) != null) {  
	                File zfile = new File(sDestPath + ze.getName());  
	                File fpath = new File(zfile.getParentFile().getPath());  
	                if (ze.isDirectory()) {  
	                    if (!zfile.exists())  
	                        zfile.mkdirs();  
	                    zins.closeEntry();  
	                } else {  
	                    if (!fpath.exists())  
	                        fpath.mkdirs();  
	                    FileOutputStream fouts = new FileOutputStream(zfile);  
	                    int i;  
	                    while ((i = zins.read(ch)) != -1)  
	                        fouts.write(ch, 0, i);  
	                    zins.closeEntry();  
	                    fouts.close();  
	                }  
	            }  
	            fins.close();  
	            zins.close();  
	        } catch (Exception e) {  
	        	System.out.println("wrong");
	        	//logger.error(e.getMessage());  
	        }  
	    }  
	    
	    /**
	     * @desc 将源文件/文件夹生成指定格式的压缩文件,格式zip,加密压缩
	     * @param resourePath 源文件/文件夹
	     * @param targetPath  目的压缩文件保存路径
	     * *@param targetName 目的压缩文件名
	     * @return void
	     * @throws Exception 
	     */
	    public void encryptedCompressedFile(String resourcesPath,String targetPath,String targetName) throws Exception{
	       
	        String path=targetPath+"/"+targetName+".zip"; //目的压缩文件名
	       
	        ZipFile zipFile = new ZipFile(path);
	    	File file=zipFile.getFile();
	        if (!file.getParentFile().exists()) {
	            file.getParentFile().mkdirs();
	        }
	        ZipParameters parameters = new ZipParameters();
	        parameters.setCompressionMethod(Zip4jConstants.COMP_DEFLATE);
	          
	        parameters.setCompressionLevel(Zip4jConstants.DEFLATE_LEVEL_NORMAL); 
	        parameters.setEncryptFiles(true);
	          
	        parameters.setEncryptionMethod(Zip4jConstants.ENC_METHOD_AES);
	          
	        parameters.setAesKeyStrength(Zip4jConstants.AES_STRENGTH_256);
	        parameters.setPassword("originalM123");
	        File resourcesFile=new File(resourcesPath);

	        if (resourcesFile.isDirectory()) {      
	            zipFile.addFolder(resourcesFile, parameters);  
	        } else {  
	            zipFile.addFile(resourcesFile, parameters);  
	        }  
	    }

//	    public static void main(String[] args){
//	    	OriginalZipHelper compressedFileUtil = new OriginalZipHelper();
//	     
//	        try {
//	            compressedFileUtil.Ectract("d:\\update.zip", "d:\\model\\");
//	            System.out.println("解压文件已经生成...");
//	        } catch (Exception e) {
//	            System.out.println("解压文件生成失败...");
//	            e.printStackTrace();
//	        }
	// 
//	    }
	    
	/*    public static void main(String[] args){
//	    	OriginalZipHelper compressedFileUtil = new OriginalZipHelper();
	     
	        try {
	        	String path="/Users/hancx/Documents/worksoftware/tomcat7/original-development-kit/update/html5/2.0.1/original_2_0_2_all.zip";
	        	ZipFile zipFile = new ZipFile(path);
	        	File file=zipFile.getFile();
	            if (!file.getParentFile().exists()) {
	                file.getParentFile().mkdirs();
	            }
	            //为了不被原有文件干扰,保证每次重新生成
	            if (file.exists()) {
	                file.delete();
	            }
	              
	            ZipParameters parameters = new ZipParameters();
	            parameters.setCompressionMethod(Zip4jConstants.COMP_DEFLATE);
	              
	            parameters.setCompressionLevel(Zip4jConstants.DEFLATE_LEVEL_NORMAL); 
	            parameters.setEncryptFiles(true);
	              
	            parameters.setEncryptionMethod(Zip4jConstants.ENC_METHOD_AES);
	              
	            parameters.setAesKeyStrength(Zip4jConstants.AES_STRENGTH_256);
	            parameters.setPassword("originalM");
	            File file1=new File("/Users/hancx/Documents/worksoftware/tomcat7/original-development-kit/update/html5/2.0.1/add");
//	            zipFile.createZipFile(file, parameters);
	            
	             
	            if (file1.isDirectory()) {  
	                
	            	 //如果不创建目录的话,将直接把给定目录下的文件压缩到压缩文件,即没有目录结构  
//	                 File [] subFiles = file.listFiles();  
//	                 ArrayList<File> temp = new ArrayList<File>();  
//	                 Collections.addAll(temp, subFiles);  
//	                 zipFile.addFiles(temp, parameters);  
	             
	                zipFile.addFolder(file1, parameters);  
	            } else {  
	                zipFile.addFile(file1, parameters);  
	            }  
	            
	            System.out.println("解压文件已经生成...");
	        } catch (Exception e) {
	            System.out.println("解压文件生成失败...");
	            e.printStackTrace();
	        }
	 
	    }*/
	    public static void main(String[] args) throws ZipException {
	    	String path="/Users/hancx/Documents/worksoftware/tomcat7/original-development-kit/update/html5/2.0.1/original_2_0_2_all.zip";
	    	ZipFile zipFile;
			try {
				zipFile = new ZipFile(path);
//				zipFile.setFileNameCharset("GBK");
				//用自带的方法检测一下zip文件是否合法，包括文件是否存在、是否为zip文件、是否被损坏等    
		        if (!zipFile.isValidZipFile()) {
		            throw new ZipException("文件不合法或不存在");
		        }
		        
		        zipFile.setPassword("originalM");
		        zipFile.extractAll("/Users/hancx/Documents/worksoftware/tomcat7/original-development-kit/update/html5/2.0.9");
		        
			} catch (net.lingala.zip4j.exception.ZipException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	    	
	        
	    }
	    
	}

