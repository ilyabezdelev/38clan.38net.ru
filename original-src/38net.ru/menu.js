//document.height = 0;

function Menu(mlayer) {
	if (navigator.appName == "Netscape") {

	document.layers['total'].document.layers['src_Menu'].visibility = "hidden";
	document.layers['total'].document.layers['club_Menu'].visibility = "hidden";
	document.layers['total'].document.layers['photos_Menu'].visibility = "hidden";
	document.layers['total'].document.layers['games_Menu'].visibility = "hidden";
	document.layers['total'].document.layers['gb_Menu'].visibility = "hidden";

	document.layers['total'].document.layers[mlayer].visibility = "visible";
	} else {

	document.all['src_Menu'].style.visibility = "hidden";
	document.all['club_Menu'].style.visibility = "hidden";
	document.all['photos_Menu'].style.visibility = "hidden";
	document.all['games_Menu'].style.visibility = "hidden";
	document.all['gb_Menu'].style.visibility = "hidden";

	document.all[mlayer].style.visibility="visible";
	}
}

function MenuC(mlayer) {
	if (navigator.appName == "Netscape") {
	document.layers['total'].document.layers[mlayer].visibility = "hidden";
	} else {
	document.all[mlayer].style.visibility="hidden";
	}
}

function new_win(theURL,features) { //v2.0
  window.open(theURL,'',features);}

function MenuCloseAll() {
	if (navigator.appName == "Netscape") {

	document.layers['total'].document.layers['src_Menu'].visibility = "hidden";
	document.layers['total'].document.layers['club_Menu'].visibility = "hidden";
	document.layers['total'].document.layers['photos_Menu'].visibility = "hidden";
	document.layers['total'].document.layers['gb_Menu'].visibility = "hidden";
	document.layers['total'].document.layers['games_Menu'].visibility = "hidden";
	} else {

	document.all['src_Menu'].style.visibility = "hidden";
	document.all['club_Menu'].style.visibility = "hidden";
	document.all['photos_Menu'].style.visibility = "hidden";
	document.all['games_Menu'].style.visibility = "hidden";
	document.all['gb_Menu'].style.visibility = "hidden";

//	document.all[mlayer].style.visibility="hidden";
	}
}

//	document.layers['total'].document.layers[mlayer].visibility = "hidden";