import toast from "react-hot-toast";

function enterFullScreen() {
	let elem = document.documentElement;
	if (elem.requestFullscreen) {
		elem.requestFullscreen();
	} else if (elem.webkitRequestFullscreen) { /* Safari */
		elem.webkitRequestFullscreen();
	} else if (elem.msRequestFullscreen) { /* IE11 */
		elem.msRequestFullscreen();
	}
}

function printPage(path) {
	let frame = document.querySelector('[name=printFrame]');
	if (!frame) {
		let app = document.querySelector('.App');
		frame = document.createElement('iframe');
		frame.name = 'printFrame';
		app.appendChild(frame);
	}
	frame.style.width = '100vw';
	frame.style.height = '100vh';

	const printFrame = () => {
		frame.contentWindow.print();
		setTimeout(() => {
			frame.style.display = 'none';
		}, 10);
	}
	if (frame.src !== window.location.origin + path) {
		frame.onload = function () {
			setTimeout(() => {
				printFrame();
			}, 100);
		}
		frame.src = path;
	} else {
		printFrame();
	}
}

function backInUp(elem, ms, display = 'inline-block') {
	if (!elem)
		return;
	fadeIn(elem, 300, 'flex');
	setTimeout(() => {
		elem.children[0].classList.remove("d-none");
		elem.children[0].style.opacity=1;
		elem.children[0].classList.add("d-flex","animate__animated","animate__bounceInUp");
	}, 400);
	setTimeout(() => {
		elem.children[0].classList.remove("animate__bounceInUp");
	},1400);
}
function backInDown(elem, ms, display = 'inline-block') {
	if (!elem)
		return;
	elem.children[0].classList.remove("animate__bounceInUp");
	elem.children[0].style.opacity=0;
	elem.children[0].classList.add("animate__bounceOut");
	setTimeout(() => {
		fadeOut(elem, ms);
	}, 500);
}
function fadeInUpBig(elem, ms, display = 'inline-block') {
    if (!elem)
		return;
	fadeIn(elem, 300, 'flex');
	setTimeout(() => {
        elem.children[0].classList.remove("d-none");
        elem.children[0].style.opacity=1;
		elem.children[0].classList.add("d-flex","animate__animated","animate__fadeInUpBig");
	}, 100);
	setTimeout(() => {
		elem.children[0].classList.remove("animate__fadeInUpBig");
	},1100);
}
function fadeInDownBig(elem, ms, display = 'inline-block') {
	if (!elem)
		return;
	elem.children[0].classList.remove("animate__fadeInUpBig");
	elem.children[0].classList.add("animate__fadeOutDownBig");
	setTimeout(() => {
		fadeOut(elem, ms);
        elem.children[0].style.opacity=0;
		elem.children[0].classList.remove("animate__fadeOutDownBig");
    }, 600);
}

function fadeIn(elem, ms, display = 'inline-block') {
	if (!elem)
		return;
	elem.style.opacity = 0;
	elem.style.filter = "alpha(opacity=0)";
	elem.style.display = display;
	elem.style.visibility = "visible";

	if (ms) {
		let opacity = 0;
		let timer = setInterval(function () {
			opacity += 50 / ms;
			if (opacity >= 1) {
				clearInterval(timer);
				opacity = 1;
			}
			elem.style.opacity = opacity;
			elem.style.filter = "alpha(opacity=" + opacity * 100 + ")";
		}, 50);
	} else {
		elem.style.opacity = 1;
		elem.style.filter = "alpha(opacity=1)";
	}
}

function fadeOut(elem, ms) {
	if (!elem)
		return;

	if (ms) {
		let opacity = 1;
		let timer = setInterval(function () {
			opacity -= 50 / ms;
			if (opacity <= 0) {
				clearInterval(timer);
				opacity = 0;
				elem.style.display = "none";
				elem.style.visibility = "hidden";
			}
			elem.style.opacity = opacity;
			elem.style.filter = "alpha(opacity=" + opacity * 100 + ")";
		}, 50);
	} else {
		elem.style.opacity = 0;
		elem.style.filter = "alpha(opacity=0)";
		elem.style.display = "none";
		elem.style.visibility = "hidden";
	}
}

function isEmptyElement(str) {
	if (!str)
		return true;
	let div = document.createElement("div");
	div.innerHTML = str;
	let text = div.textContent || div.innerText || "";
	div.remove()
	return text.trim() === ''
}

function isEmptyObject(obj) {
	if (Array.isArray(obj)) {
		return obj.length === 0;
	}
	for (let prop in obj) {
		if (obj.hasOwnProperty(prop)) {
			return false;
		}
	}
	return JSON.stringify(obj) === JSON.stringify({});
}

function search(array, key, value) {
	for (let i = 0; i < array.length; i++) {
		if (array[i][key] === value) {
			return i;
		}
	}
	return null;
}

function popByKeyValue(arr, key, value) {
	let index = search(arr, key, value);
	if (index || index === 0)
		return arr.splice(index, 1);
	return null;
}

function blankArray(obj) {
	return (Array.isArray(obj) ? [] : {});
}

function equalTypes(a, b) {
	if (typeof a !== typeof b)
		return false;
	return Array.isArray(a) === Array.isArray(b);
}

function keysEqual(a, b) {
	if ((!Array.isArray(a) && typeof a !== "object") ||
		(!Array.isArray(b) && typeof b !== "object")) {
		return a === b;
	}
	if (!equalTypes(a, b))
		return false;

	if (Array.isArray(a)) {
		a = [...a];
		b = [...b];
		a.sort();
		b.sort();
	}
	let keys1 = Object.keys(a);
	keys1.sort();
	let keys2 = Object.keys(b);
	keys2.sort();

	if (JSON.stringify(keys1) !== JSON.stringify(keys2))
		return false;

	for (let i = 0; i < keys1.length; i++) {
		let k = keys1[i];
		if (!keysEqual(a[k], b[k])) {
			return false;
		}
	}
	return true;
}

function deepEqual(a, b) {
	if (JSON.stringify(a) === JSON.stringify(b))
		return true;
	return keysEqual(a, b);
}

function deepCopy(target, source) {
	if (!source)
		return source;
	Object.keys(source).forEach(k => {
		if (typeof source[k] === "object") {
			let tmp = blankArray(source[k]);
			deepCopy(tmp, source[k]);
			target[k] = tmp;
		} else {
			target[k] = source[k];
		}
	});
}

function clone(source) {
	let cloneObj = blankArray(source);
	deepCopy(cloneObj, source);
	return cloneObj;
}

function getBrowser(userAgent) {
	let browserName, nameOffset, verOffset;

	if (userAgent.indexOf("Opera") !== -1) {
		browserName = "Opera";
	} else if (userAgent.indexOf("MSIE") !== -1) {
		browserName = "Microsoft Internet Explorer";
	} else if (userAgent.indexOf("Chrome") !== -1) {
		browserName = "Chrome";
	} else if (userAgent.indexOf("Safari") !== -1) {
		browserName = "Safari";
	} else if (userAgent.indexOf("Firefox") !== -1) {
		browserName = "Firefox";
	} else if ((nameOffset = userAgent.lastIndexOf(' ') + 1) < (verOffset = userAgent.lastIndexOf('/'))) {
		browserName = userAgent.substring(nameOffset, verOffset);
		if (browserName.toLowerCase() === browserName.toUpperCase()) {
			browserName = navigator.appName;
		}
	}
	return browserName;
}

function getOS(userAgent) {
	let OSName = "Unknown OS";
	if (navigator.appVersion.indexOf("Win") !== -1) OSName = "Windows";
	if (navigator.appVersion.indexOf("Mac") !== -1) OSName = "MacOS";
	if (navigator.appVersion.indexOf("X11") !== -1) OSName = "UNIX";
	if (navigator.appVersion.indexOf("Linux") !== -1) OSName = "Linux";
	return OSName;
}

function shareURL(obj) {
	let url = obj.url || '';
	let title = obj.title || '';
	let description = obj.description || '';
	let media = obj.media || '';

	switch (media) {
		case 'facebook':
			window.open(`http://www.facebook.com/sharer.php?u=${url}`,
				'sharer', 'toolbar=0, status=0, width=626, height=436');
			break;
		case 'linkedin':
			window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${description}&source=example.com`, '_blank');
			break;
		case 'whatsapp':
			window.open(`https://${window.isMobile()?'web':'api'}.whatsapp.com/send?text=${title} ${description} ${url}`);
			break;
		default:
			if (window.isMobile()) {
				if (navigator.share)
					navigator.share({title, text: description, url});
			} else if (navigator.clipboard) {
				navigator.clipboard.writeText(url);
				toast.success('Copied successfully. 🎉');
			}
	}
}

function isDescendant(parent, child) {
	var node = child.parentNode;
	while (node !== null) {
		if (node === parent) {
			return true;
		}
		node = node.parentNode;
	}
	return false;
}

export {
	backInUp,
	backInDown,
	fadeInUpBig,
	fadeInDownBig,
	fadeIn,
	fadeOut,
	printPage,
	enterFullScreen,
	isEmptyObject,
	isEmptyElement,
	search,
	popByKeyValue,
	clone,
	deepEqual,
	getBrowser,
	getOS,
	shareURL,
	isDescendant,
};