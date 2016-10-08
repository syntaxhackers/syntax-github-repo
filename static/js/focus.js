var cons = document.getElementById("console");
var command = document.getElementById("command");
var commandstack = [];

function focusToInput()
{
	command.focus();
	/*setTimeout(focusToInput, 1000);*/
	autoFocusToInput();
	log("You have connceted to the syntax terminal!\nType 'help' for a list of commands.\n")
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

function handleHelpCommand(args)
{
	log("-------------HELP--------------")
	log("Help:")
	log("  Usage: help")
	log("  Description: Shows help for all commands")
	log("Echo:")
	log("  Usage: echo [message..]")
	log("  Description: Sends a message to the console")
	log("Cls:")
	log("  Alias: clear")
	log("  Usage: cls")
	log("  Description: Clears the console")
	log("Lsg:")
	log("  Usage: lsg")
	log("  Description: Lists all groups you have access to.")
	log("Cg:")
	log("  Usage: cg <group>")
	log("  Description: Changes current group to <group>")
	log("-------------------------------")
}

function handleClearCommand(args)
{
	cons.innerHTML = "";
}

function handleClsCommand(args)
{
	handleClearCommand(args);
}

function handleLsgCommand(args)
{
	log("------------GROUPS-------------")
	log("You have access to:")
	log(" - CXX")
	log("-------------------------------")
}

function handleCgCommand(args)
{
	if (equalsIgnoreCase(args[0], "cxx"))
		window.location = "/group?cnael=CXX";
	else
		log("Error: Invalid group");
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

function equalsIgnoreCase(str, str2)
{
	try
	{
		if (str.toLowerCase() == str2.toLowerCase())
		{
			return true;
		}
		return false;
	}
	catch(e)
	{
		return false;
	}
}