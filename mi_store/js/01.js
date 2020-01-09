var tabs= document.getElementById('tabs').getElementsByTagName("li");

//nodelist返回多个元素的遍历

for(var i = 0 ; i<tabs.length ; i++){
	tabs[i].onclick = showlist;
}

function getLi1(){
	$.ajax({
			type:'get',
			url:'list.html',
			success:function(data){
				console.log(data);
				$('#showPlays').html(data);
			}
		})
}


function getLi2(){
	$.ajax({
			type:'get',
			url:'list2.html',
			success:function(data){
				console.log(data);
				$('#showPlays').html(data);
			}
		})
}

function showlist(){
	for(var i = 0 ;  i<tabs.length ; i++){
		if(tabs[i] === this){
			tabs[i].className = "seckill-clickVar";
		}
		else{
			tabs[i].className = "";
		}
	}
}

window.onscroll = function(){
	var hight = document.documentElement.scrollTop;
	if (hight >= 260){
		document.getElementById("nav").classList.add("seckill-navfixed");
	}
	else{
		document.getElementById("nav").classList.remove("seckill-navfixed");
	}
}

getLi1();

$(function(){
	$("#li1").on('click',function(){
		getLi1();
	})
	
	$("#li2").on('click',function(){
		getLi2();
	})
})
