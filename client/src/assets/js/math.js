function getNearestValue(list,value) {
	list = list.map(l=>parseFloat(l));
	list.sort((a,b)=>a<b);

	let ans;
	if (value<=list[0])
		ans = list[0];
	else if (value>=list[list.length-1])
		ans = list[list.length-1];
	else{
		for (let i=1;i<list.length; i++){
			if (list[i-1] <= value && value <= list[i]){
				if (value < (list[i-1]+list[i])/2){
					ans = list[i-1];
				}else{
					ans = list[i];
				}
				break;
			}
		}
	}

	return ans;
}
export {
	getNearestValue,
}