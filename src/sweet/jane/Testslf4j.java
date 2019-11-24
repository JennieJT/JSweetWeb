package sweet.jane;

	import java.util.Date;
	import org.slf4j.*;

	
	public class Testslf4j {
	    
	    final static  Logger logger  =  LoggerFactory.getLogger(Testslf4j.class );

	    public static void main(String[] args) throws InterruptedException {

	        logger.debug( " This time is {}" ,  new Date().toString());
	        
	        logger.info( " This time is {}" ,  new Date().toString());
	        
	        logger.warn( " This time is {}" ,  new Date().toString());
	        
	        logger.error( " This time is {}" ,  new Date().toString());
	        

	}

}
