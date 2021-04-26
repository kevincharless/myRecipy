let menuCategory = false
let nav = false
let layar = screen.width

if ( layar <= 680 ) {
	document.getElementsByClassName("home-sidebar")[0].style.display = "none"
} else {
	document.getElementById("nav-toggle").style.display = "none"
}

document.getElementById("menuCategory").addEventListener("click",function(){
	if ( menuCategory == false ) {
		document.getElementById("subMenuCategory").style.display = ""
		// document.getElementById("arrowCategory").style.transform = "rotate(90deg)"
		menuCategory = true	
	} else {
		document.getElementById("subMenuCategory").style.display = "none"
		// document.getElementById("arrowCategory").style.transform = "rotate(0deg)"
		menuCategory = false
	}
})

document.getElementById("nav-toggle").addEventListener("click",function(){
	if ( nav == false ) {
		document.getElementsByClassName("home-sidebar")[0].style.display = ""
		document.getElementsByClassName("home-sidebar")[0].style.position = "fixed"
		nav = true
	} else {
		document.getElementsByClassName("home-sidebar")[0].style.display = "none"
		document.getElementsByClassName("home-sidebar")[0].style.position = ""
		nav = false
	}
})