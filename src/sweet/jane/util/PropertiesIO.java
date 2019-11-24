package sweet.jane.util;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class PropertiesIO {
	public String getValue(String key) throws IOException {
	Properties properties = new Properties();
    // 使用ClassLoader加载properties配置文件生成对应的输入流
    InputStream in = PropertiesIO.class.getClassLoader()
    		.getResourceAsStream("JSweetWeb.properties");
    // 使用properties对象加载输入流
    properties.load(in);
    //获取key对应的value值
    String result= properties.getProperty(key);
    return result;
	}
}
