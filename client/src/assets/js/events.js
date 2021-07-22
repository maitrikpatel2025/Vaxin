function getLooperFunction(array) {
	return function (e) {
		for (const func of array){
			if (typeof func==="function")
				func(e);
		}
	};
}
function addNewFunctionToArray(array,func,removeSame = true) {
	if (removeSame) {
		let index = indexOfFunc(array, func);
		if (index === -1)
			array.push(func);
		else
			array[index] = func;
	}else
		array.push(func);
}
function indexOfFunc(array,func) {
	let index = -1;
	array.forEach((f,i)=>{
		if (f.toString() === func.toString())
			index = i;
	});
	return index;
}



let keyDownFunctions = [];
function onKeyDown(func) {
	document.onkeydown = getLooperFunction(keyDownFunctions);
	addNewFunctionToArray(keyDownFunctions,func);
}

let documentClickFunctions = [];
function onDocumentClick(func,removeSame = false) {
	document.onclick = getLooperFunction(documentClickFunctions);
	addNewFunctionToArray(documentClickFunctions,func,removeSame);
}

export {onKeyDown,onDocumentClick};