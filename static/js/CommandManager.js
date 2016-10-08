function CommandManager()
{
	this.console;
	this.data = {group: ''};
}

CommandManager.prototype.setConsole = function(cons)
{
	this.console = cons;
}

CommandManager.prototype.sendCommand = function(command, args, ops, kwops)
{
	/*this.console.log("name -- " + command);
	this.console.log("args -- " + args.join(", "))
	this.console.log("ops -- " + ops.join(", "))
	this.console.log("kwops -- " +  JSON.stringify(kwops))*/

	try { var wind = this["execute" + Jva.capitalizeCase(command) + "Command"].bind(this); }
	catch(e) { this.console.log(command.toLowerCase() + " is not a valid command!"); return; }
	wind(args, ops, kwops);
}

// echo Hello World! -t Title --title Title -o --option --kwop Hello + World


























































CommandManager.prototype.executeEchoCommand = function(args)
{
	console.log(this)
	this.console.log(args.join(" "));
}

CommandManager.prototype.executeClsCommand = function()
{
	this.console.clear();
}

CommandManager.prototype.executeClearCommand = function()
{
	this.executeClsCommand();
}


CommandManager.prototype.executeHelpCommand = function(args)
{
	this.console.log("-------------HELP--------------")
	this.console.log("Help:")
	this.console.log("  Usage: help")
	this.console.log("  Description: Shows help for all commands")
	this.console.log("Echo:")
	this.console.log("  Usage: echo [message..]")
	this.console.log("  Description: Sends a message to the console")
	this.console.log("Cls:")
	this.console.log("  Alias: clear")
	this.console.log("  Usage: cls")
	this.console.log("  Description: Clears the console")
	this.console.log("Lsg:")
	this.console.log("  Usage: lsg")
	this.console.log("  Description: Lists all groups you have access to.")
	this.console.log("Cg:")
	this.console.log("  Usage: cg <group>")
	this.console.log("  Description: Changes current group to <group>")
	this.console.log("-------------------------------")
}

CommandManager.prototype.executeLsgCommand = function(args)
{
	this.console.log("------------GROUPS-------------")
	this.console.log("You have access to:")
	this.console.log(" - CXX")
	this.console.log("-------------------------------")
}

CommandManager.prototype.executeCgCommand = function(args)
{
	if (Jva.equalsIgnoreCase(args[0], "cxx"))
	{
		this.data["group"] = "CXX";
		this.console.log("Changed group to 'CXX'");
		this.console.log("Type 'sg' to get the selected group");
	}
	else
		this.console.log("Error: Invalid group");
}

CommandManager.prototype.executeSgCommand = function()
{
	this.console.log("The selected group is: " + this.data['group'])
}