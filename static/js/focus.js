var cons = document.getElementById("console");
var command = document.getElementById("command");
var commandstack = [];

function focusToInput()
{
	command.focus();
	/*setTimeout(focusToInput, 1000);*/
	autoFocusToInput();
	log("You have connceted to the syntax terminal!\nType <not added yet> for a list of commands.\nThe two commands at the moment are 'echo <message..>' and 'goto_cxx_group'!\n'goto_cxx_group' is deprecated.\n\nImportant:\n - Underscores in the input box look invisible\n - The underscores are still there though!\n")
}

function autoFocusToInput()
{
	document.addEventListener("keydown", function(e)
	{
		command.focus();
		if (e.keyCode == 13)
		{
			var cmd = command.value;
			command.value = "";
			handleCommandSent(cmd);
		}
	});
}

function handleCommandSent(cmd)
{
	if (data == "")
		return;

	var data = cmd.split(" ");

	try
	{
		var c = data[0];
		data.splice(0, 1); var args = data;
	}
	catch(e) {
		log("Error: Expected atleast a command!")
		return;
	}

	handleCommand(c, args);
}

function handleCommand(name, args)
{
	var name = name.toLowerCase();

	console.log(capitalizeCase(name) + " !!! :)")
	var func = window["handle" + capitalizeCase(name) + "Command"];
	if (func === undefined)
	{
		log(name + " is not a valid command!");
		return;
	}

	func(args);
}

function handleEchoCommand(args)
{
	log(args.join(" "));
}

function handleGoto_cxx_groupCommand(args)
{
	window.location = "/group?cnael=CXX";
}

function log(msg)
{
	var scrollToBottom = false;
	if (cons.scrollTop === (cons.scrollHeight - cons.offsetHeight))
		scrollToBottom = true;

	cons.innerHTML += msg + "\n";

	if (scrollToBottom)
	{
		cons.scrollTop = cons.scrollHeight;
	}
}

function capitalizeCase(str)
{
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}