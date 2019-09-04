document.onload=start;//sayfa yüklendiğinde start çalışsın.
var isRain=true;//Kar yağışı devam ediyor mu ? true=evet - false=hayır. 

//400 ms aralıklarla moveSnow fonksiyonunu çağırır. Yani her 400 ms'de bir adet kar tanesi oluşturulur. 
var start=setInterval(function(){
	 "use strict";
	createSnow();
},400);

//Sayfa içine snow class'ına sahip bir div etiketi ekler ve bu element'i sayfa sonuna kadar ilerletir..
function createSnow(){	
	 "use strict";
	var snow=document.createElement("div");//bir adet div element'i oluşturuldu.
	snow.classList.add("snow");//oluşturulan elemente "snow" class'ı eklendi.
	var width=window.innerWidth;//pencere'nin iç genişliği alındı.
	var horizontalLocation=Math.floor(Math.random()*width);//0 ile pencerenin iç genişliği arasında rastgele bir sayı olşturuldu.
	snow.style.left=horizontalLocation+"px";//bu rastgele değer element'e left değeri olarak verildi.
	snow.style.top=0+"px";//top değeri varsayılan olarak 0 verildi.
	document.body.appendChild(snow);//oluşturulan element body içine eklendi.
	
	//Kar tanesinin yukarıdan aşağıya doğru ilerlemesini sağlayan fonksiyon. 50 ms'de bir çalışır.
	var interval=setInterval(function(){
		
		//Eğer kar tanesi ekran dışına çıktıysa interval yok edilir ve kar tanesi element'i sayfadan kaldırılır.
		if(snow.offsetTop>window.innerHeight){
			snow.remove();
			clearInterval(interval);
		}
		snow.style.top=(snow.offsetTop+5)+"px";//Interval'in her çalışma zamanında kar tanesi 5px aşağı ilerler.
	},50);
}

//stopSnow class'ına sahip element'in üzerine tıklanıldığında çalışan fonksiyon. Kar yağışını durdurup başlatmaya yarar.
document.getElementById("stopSnow").onclick=function(){
	"use strict";
	
	//Eğer kar yağıyorsa kar yağışını durdurur.
	if(isRain){
		clearInterval(start);//Kar oluşturma interval'ini temizle.
		isRain=false;//Kar yağışı durumunu false yap.
		this.innerHTML="START SNOWFALL";//Element içine "START SNOWFALL" yaz.
	}
	else{
		//Tekrar kar yağışını başlat.
		start=setInterval(function(){
			createSnow();
		},400);
		isRain=true;//Kar yağışı durumunu true yap.
		this.innerHTML="STOP SNOWFALL";//Element içine "STOP SNOWFALL" yaz.
	}
};
