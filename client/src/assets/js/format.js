let numberSizeFormat = (n)=>{
	n = parseInt(n);
	if (n<1000){
		return n;
	}else if(n>=1000 && n<100000){
		return (~~(n/10))/100+'K';
	}else{
		return (~~(n/1000))/100+'L';
	}
};
function salaryFormat(n,n2=null,showCharacter = false) {
	if (showCharacter){
		if (n2 && n2!==n){
			return '₹'+numberSizeFormat(n)+' - ₹'+numberSizeFormat(n2);
		}
		return '₹'+numberSizeFormat(n);
	}else{
		let nf = Intl.NumberFormat('en-IN');
		let result = '₹'+nf.format(n);
		if (n2 && n2!==n){
			result = result + ' - ₹'+nf.format(n2);
		}
		return result;
	}
}
function numberFormat(n) {
	return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(n);
}
function currencyFormat(n) {
	return '₹ '+ numberFormat(n);
}
function timeDifferenceFormat(time,anotherTime = null,wordLength = -1) {
	if (!time)return '';

	if (!anotherTime)
		anotherTime = new Date().getTime();

	let subWord = (n,word)=>{
		if(wordLength === -1)
			return ' '+word+(n>1?'s':'');
		else
			return ' '+word.substr(0,wordLength);
	}

	let difference = Math.abs(anotherTime - time);
	difference /= 1000;

	let yearSeconds = 3600*24*365;
	let years = Math.floor(difference/yearSeconds);
	if (years>0)
		return years+subWord(years,'year');
	difference -= years*yearSeconds;

	let monthSeconds = 3600*24*30;
	let months = Math.floor(difference/monthSeconds);
	if (months>0)
		return months+subWord(months,'Month');
	difference -= months*monthSeconds;

	let daySeconds = 3600*24;
	let days = Math.floor(difference/daySeconds);
	if (days>0)
		return days+subWord(days,'day');
	difference -= days*daySeconds;

	let hourSeconds = 3600;
	let hours = Math.floor(difference/hourSeconds);
	if (hours>0)
		return hours+subWord(hours,'hour');
	difference -= hours*hourSeconds;

	let minuteSeconds = 60;
	let minutes = Math.floor(difference/minuteSeconds);
	if (minutes>0)
		return minutes+subWord(minutes,'minute');
	difference -= minutes*minuteSeconds;

	let seconds = Math.floor(difference);
	if (seconds>0)
		return seconds+subWord(seconds,'second');

	return 0+subWord(0,'second');
}
let dataFormat = (n)=>{
	if (n<1024){
		return (~~(n*100))/100+' B';
	}else if(n>=1024 && n<1024*1024){
		return (~~(n*100/1024))/100+' K';
	}else if(n>=1024*1024 && n<1024*1024*1024){
		return (~~(n*100/(1024*1024)))/100+' M';
	}else if(n>=1024*1024*1024 && n<1024*1024*1024*1024){
		return (~~(n*100/(1024*1024*1024)))/100+' G';
	}else{
		return (~~(n*100/(1024*1024*1024*1024)))/100+' T';
	}
};
function addressFormat(city,state,country,pincode) {
	let address2 = [];
	if (city) address2.push(city);
	if (state) address2.push(state);
	if (country) address2.push(country);
	if (address2.length>0)
		address2 = [address2.join(", ")];
	if (pincode)
		address2.push(pincode);
	return address2.join(' - ');
}

export {
	numberSizeFormat,
	salaryFormat,
	numberFormat,
	currencyFormat,
	timeDifferenceFormat,
	dataFormat,
	addressFormat,
}