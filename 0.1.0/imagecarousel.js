window.onload = function(){
	var oBox = document.getElementById("box"),
		oList = oBox.children[0].children[0],
		aImg = oBox.getElementsByTagName("img"),
		prev = oBox.children[1],
		next = oBox.children[2],
		index = 0,
		timer = null,
		playTimer = null,
		btnOrder = true,
		aTmp = [],
		aBtn = null;

	(function(){
		for(var i = 0;i < aImg.length;i++){
			aTmp.push("<li>" + "</li>");
		}
		var oCount = document.createElement("ul");
		oCount.className = "count";
		oCount.innerHTML = aTmp.join("");
		oBox.appendChild(oCount);
		aBtn = oBox.getElementsByTagName("ul")[0].getElementsByTagName("li");

		for(var i = 0;i < aBtn.length;i++){
			aBtn[i].index = i;
			aBtn[i].onclick = function(){
				index = this.index;
				countChange();
			};
		}
	})();

	function countChange(){
		for(var i = 0;i < aBtn.length;i++){
			aBtn[i].className = "";
		}
		aBtn[index].className = "current";
		startMove(-(index * aImg[0].offsetWidth));
	}

	function startMove(iTarget){
		clearInterval(timer);
		timer = setInterval(function(){
			doMove(iTarget);
		},30);
	}

	function doMove(iTarget){
		var iSpeed = (iTarget - oList.offsetLeft) / 10;
		iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
		oList.offsetLeft === iTarget ? clearInterval(timer) : oList.style.left = oList.offsetLeft + iSpeed + "px";
	}

	function move(){
		btnOrder ? index++ : index--;
		if(index <= 0){
			index = 0;
			btnOrder = true;
		}else if(index >= aBtn.length - 1){
			index = aBtn.length - 1;
			btnOrder = false;
		}
		countChange();
	}
	
	playTimer = setInterval(move,2000);

	oBox.onmouseover = function(){
		clearInterval(playTimer);
	};

	oBox.onmouseout = function(){
		playTimer = setInterval(move,2000);
	};

	prev.onclick = function(){
		if(index === 0){
			index = aBtn.length - 1;
		}else{
			index--;
		}
		countChange();
	};

	next.onclick = function(){
		if(index == aBtn.length-1){
			index = 0;
		}else{
			index++;
		}
		countChange();
	};
};