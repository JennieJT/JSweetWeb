package sweet.jane;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.io.FileUtils;

public class JSweetCompareFileHelper {
	 public Map<String, List<FileMd5>> compare(String dir1,String dir2)throws IOException{ 
			Map<String, List<FileMd5>> map = new HashMap<>();
			// 获取path1,path2的所有文件夹路径,文件的md5值put map
			Map<String, FileMd5> path1Map = listDir(dir1);
			Map<String, FileMd5> path2Map = listDir(dir2);
			List<FileMd5> compareFile1 = compareFile(path1Map, path2Map);
			// compare path2 map to path1 map 得到path1没有的文件夹和文件及其md5值不同的文件
			List<FileMd5> compareFile2 = compareFile(path2Map, path1Map);
			// 过滤结果
			List<FileMd5> equalsFile = filterFile(compareFile1, compareFile2,dir1,dir2);
			// 输出最终结果
//			printResult(equalsFile, compareFile1, compareFile2);
			map.put("updateFile", equalsFile);
			map.put("delFile", compareFile1);
			map.put("addFile", compareFile2);
			return map;
		}
		private static Map<String, FileMd5> listDir(String dir) throws IOException {
			Map<String, FileMd5> map = new HashMap<String, FileMd5>();
			File path = new File(dir);
			Object[] files = listPath(path).toArray();
			Arrays.sort(files);
			for (Object _file : files) {
				File file = (File) _file;
				String key = file.getAbsolutePath().replaceAll("\\\\", "/");
				key = key.replaceAll(dir, "");// 去掉根目录
				String md5 = "";// 文件夹的md5默认为空,即不比较md5值
				if (file.isFile()) {
					String text = FileUtils.readFileToString(file);
					// md5 = MD5.md5(text);
					md5 = DigestUtils.md5Hex(new FileInputStream(file));
					FileMd5 fileMd5 = new FileMd5(file, md5);
					map.put(key, fileMd5);
				}
				
			}
			return map;
		}
		private static List<File> listPath(File path) {
			List<File> list = new ArrayList<File>();
			File[] files = path.listFiles();
			Arrays.sort(files);
			for (File file : files) {
				list.add(file);
				if (file.isDirectory()) {
					List<File> _list = listPath(file);
					list.addAll(_list);
				}
			}
			return list;
		}
		public static List<FileMd5> compareFile(Map<String, FileMd5> path1Map, Map<String, FileMd5> path2Map) {
			List<FileMd5> list = new ArrayList<FileMd5>();
			for (String key : path1Map.keySet()) {
				FileMd5 fileMd5 = path1Map.get(key);
				FileMd5 _fileMd5 = path2Map.get(key);
				// 不管文件夹还是文件，只要path2没有则add到比较结果集中
				if (_fileMd5 == null) {
					list.add(fileMd5);
					continue;
				}
				// 文件的md5值不同则add到比较结果集中
				if (fileMd5.getFile().isFile() && !fileMd5.getMd5().equals(_fileMd5.getMd5())) {
					list.add(fileMd5);
				}
			}
			return list;
		}
		public static List<FileMd5> filterFile(List<FileMd5> compareFile1, List<FileMd5> compareFile2,String dir1,String dir2) {
			List<FileMd5> list1 = new ArrayList<FileMd5>();
			List<FileMd5> list2 = new ArrayList<FileMd5>();
			for (FileMd5 fileMd5 : compareFile1) {
				File file = (File) fileMd5.getFile();
				String key = file.getAbsolutePath().replaceAll("\\\\", "/");
				key = key.replaceAll(dir1, "");// 去掉根目录
				for (FileMd5 compareMd5: compareFile2){
					String path=compareMd5.getFile().getAbsolutePath().replaceAll("\\\\", "/");
					if(path.contains(key)){
						list1.add(fileMd5);
						list2.add(compareMd5);
					}
					
				}
			}
			// remove equals fileMd5
			for (FileMd5 fileMd5 : list1) {
				compareFile1.remove(fileMd5);
			}
			for (FileMd5 fileMd5 : list2) {
				compareFile2.remove(fileMd5);
			}
			return list2;

		}


}
