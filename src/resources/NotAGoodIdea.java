package resources;

import java.util.ArrayList;
import java.util.List;

public class NotAGoodIdea {
	List<List<Integer>> ans=combinations(4);
	List<List<Integer>> ans2=combinations(4);
	public List<List<Integer>> combinations(int target) {
	    // Write your solution here
	    List<List<Integer>> ans=new ArrayList<List<Integer>>();
	    List<Integer> candidates=findAllFactors(target);
	    int[] numbers=new int[candidates.size()];
	    combinations(target,ans,numbers,candidates,0,candidates.size());
	    return ans;
	  }
	  private void combinations(int target,List<List<Integer>> ans, int[] numbers, List<Integer> candidates,
	   int level,int totalLevel){
	     //base case
	     if(target==1){
	       List<Integer> res=makeFactorsComb(candidates,numbers);
	       ans.add(res);
	       return;
	     }
	     if(level==totalLevel){
	       return;
	     }
	     int cur=candidates.get(level);
	     int curNum=0;
	     while(target%cur==0){
	       target/=cur;
	       numbers[level]=++curNum;
	       combinations(target/cur,ans,numbers,candidates,level+1,totalLevel);
	     }
	  }
	  private List<Integer> findAllFactors(int target){
	    List<Integer> ans=new ArrayList<>();
	    for(int i=2;i<=target/2;i++){
	      if(target%i==0){
	        ans.add(i);
	      }
	    }
	    return ans;
	  }
	  private List<Integer> makeFactorsComb(List<Integer> candidates,int[] numbers){
	    List<Integer> ans=new ArrayList<>();
	    for(int i=0;i<numbers.length;i++){
	      int number=numbers[i];
	      for(int j=1;j<=number;j++){
	        ans.add(candidates.get(i));
	      }
	    }
	    return ans;
	  }
}
