if(dispositivo=="Unico") {
var ht="40"
var online ="<link rel='stylesheet' type='text/css' href='online_unico.css'>";
online +="<div class='main' onclick='c19()'>"
online +="<div class='mainBox' draggable='true'>"
online += "<div class='front'><img src='Img/telephone.png' height=" +ht+ "  width=" +ht+ "></div>";
online += "<div class='back'><img src='Img/telephone.png'  height=" +ht+ "  width=" +ht+ "></div>";
online += "<div class='left'><img src='Img/telephone.png'  height=" +ht+ "  width=" +ht+ "></div>";
online += "<div class='right'><img src='Img/telephone.png' height=" +ht+ "  width=" +ht+ "></div>";
online += "<div class='top'></div>";
online += "<div class='bottom'></div>";
online +="</div>"
online +="</div>"


var offline = "<link rel='stylesheet' type='text/css' href='offline_unico.css'>";
offline += "<div class='main' onclick='c19()'>";
offline += "<div class='mainBox' draggable='true'>";
offline += "<div class='front'><img src='Img/telephone.png' height=" +ht+ " width=" +ht+ "></div>";
offline += "<div class='back'></div>";
offline += "<div class='left'></div>";
offline += "<div class='right'></div>";
offline += "<div class='top'></div>";
offline += "<div class='bottom'></div>";
offline +="</div>";
offline +="</div>";
}

if(dispositivo=="Tablet"){
var ht="80"
var online ="<link rel='stylesheet' type='text/css' href='online_tablet.css'>";
online +="<div class='main' onclick='c19()' >"
online +="<div class='mainBox' draggable='true'>"
online += "<div class='front'><img src='Img/telephone.png' height=" +ht+ "  width=" +ht+ "></div>";
online += "<div class='back'><img src='Img/telephone.png'  height=" +ht+ "  width=" +ht+ "></div>";
online += "<div class='left'><img src='Img/telephone.png'  height=" +ht+ "  width=" +ht+ "></div>";
online += "<div class='right'><img src='Img/telephone.png' height=" +ht+ "  width=" +ht+ "></div>";
online += "<div class='top'></div>";
online += "<div class='bottom'></div>";
online +="</div>"
online +="</div>"

var offline = "<link rel='stylesheet' type='text/css' href='offline_tablet.css'>";
offline += "<div class='main' onclick='c19()'>";
offline += "<div class='mainBox' draggable='true'>";
offline += "<div class='front'><img src='Img/telephone.png' height=" +ht+ " width=" +ht+ "></div>";
offline += "<div class='back'></div>";
offline += "<div class='left'></div>";
offline += "<div class='right'></div>";
offline += "<div class='top'></div>";
offline += "<div class='bottom'></div>";
offline +="</div>";
offline +="</div>";
}