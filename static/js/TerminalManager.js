function TerminalManager()
{
	this.console;
	this.chat;
}

TerminalManager.prototype.initialize = function()
{
	this.console = new Console();
	this.console.log("You have connected to the syntax terminal!\nType 'help' for a list of commands.\n")
	//this.chat = new Chat();

	this.addEventHandlers();
}

TerminalManager.prototype.addEventHandlers = function()
{
	document.addEventListener("keydown", this.keyDownHandler.bind(this));
}

TerminalManager.prototype.keyDownHandler = function(event)
{
	if (event.keyCode == 13)	// ENTER
	{
		this.console.sendCommandFromInput();
	}
	else if (event.keyCode == "tab")	//TAB
	{
		// Not added yet...
	}
	else
	{
		this.console.focusInput();
	}
}