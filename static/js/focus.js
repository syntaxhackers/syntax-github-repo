var cons = document.getElementById("console");
var command = document.getElementById("command");
var commandstack = [];

function focusToInput()
{
	command.focus();
	/*setTimeout(focusToInput, 1000);*/
	autoFocusToInput();
	log("Welcome to the terminal!\nIt is cool terminal. Anyways.\nThe two commands at the moment are 'echo <message..>' and 'goto_cxx_group'!\n'goto_cxx_group' is deprecated.\nAvoid high usage of that command.\n\nIMPORTANT NOTICE!!!!!\n - The underscore letter looks hidden in the command input box.\nIt is still there, but it looks lieks a space\nkeep this in mind but don't wory coz commands with '_' (underscore) will still work!")
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

	log("Command sent!");
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