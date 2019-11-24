
public class CombinationsTel {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		combinations(231);
		combinations(3);

	}
	public static String[] combinations(int number) {
	    // Write your solution here
	    //depth first search.
	    //the structure of the tree
	    //each layer is all the possibility of the character of a number.
	    //each state is a character.
	    //total layer is the number's digits.
	    String[] keyPad=getKeyPad();
	    int[] numbers=getIntArr(number);
	    String[] ans=new String[getAnsLen(numbers,keyPad)];
	    int[] ansIndex=new int[1];
	    StringBuilder sb=new StringBuilder();
	    combinations(numbers,keyPad,sb,ans,0,ansIndex);
	    return ans;
	  }
	  private static void combinations(int[] numbers, String[] keyPad, StringBuilder sb,String[] ans, int level,int[] ansIndex){
	    //end condition: no more number to read.
	    if(level==numbers.length){
	    //add the ans from the stringbuilder to the ans to the array
	    if(ans.length>0)
	    ans[ansIndex[0]++]=sb.toString();
	    return;
	    }
	    //not leaf level:no char to add: add level. char to end for loop 
	    String candidates=keyPad[numbers[level]];
	    if(candidates.length()==0){
	      combinations(numbers,keyPad,sb,ans,level+1,ansIndex);
	      return;
	    }
	    //add one char, go to the next level and remove the char.
	    for(int i=0;i<candidates.length();i++){
	      sb.append(candidates.charAt(i));
	      combinations(numbers,keyPad,sb,ans,level+1,ansIndex);
	      sb.deleteCharAt(sb.length()-1);
	    }
	  }
	  private static String[] getKeyPad(){
	    String[] ans=new String[10];
	    ans[0]="";
	    ans[1]="";
	    ans[2]="abc";
	    ans[3]="def";
	    ans[4]="ghi";
	    ans[5]="jkl";
	    ans[6]="mno";
	    ans[7]="pqrs";
	    ans[8]="tuv";
	    ans[9]="wxyz";
	    return ans;
	  }
	  private static int[] getIntArr(int number){
	    //divide number by 10 get the rest number. until the value is zero.
	    int digits=0;
	    int tmp=number;
	    while(tmp>0){
	      digits++;
	      tmp/=10;
	    }
	    int[] ans=new int[digits];
	    int digit=digits-1;
	    while(number>0){
	      ans[digit--]=number%10;
	      number/=10;
	    }
	    return ans;
	  }
	  private static int getAnsLen(int[] numbers, String[] keyPad){
	    int ans=keyPad[numbers[0]].length();
	    for(int i=1;i<numbers.length;i++){
	      if(numbers[i]!=0){
	        if(ans==0){
	          ans=numbers[i];
	        }else{
	          ans*=numbers[i];
	        }
	      }
	    }
	    return ans;
	  }

}
