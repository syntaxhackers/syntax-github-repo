var google_toggle=false;
var googleel=document.getElementById("g");
document.addEventListener("keydown",function(e) {
	if(e.keyCode === 27)
	{
		google_toggle=!google_toggle;
		if(google_toggle)
		{
			googleel.classList.remove("hidden")
		}
		else
		{
			googleel.classList.add("hidden")
		}
	}
});setInterval(function(){googleel.blur();}, 500);