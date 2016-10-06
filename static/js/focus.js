var command = document.getElementById("command");

function focusToInput()
{
	command.focus();
	/*setTimeout(focusToInput, 1000);*/
	autoFocusToInput();
}

function autoFocusToInput()
{
	document.addEventListener("keydown", function()
	{
		command.focus();
	});
}