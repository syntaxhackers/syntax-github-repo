function TerminalManager()
{
	this.console;
	this.chat;
	this.current = "console";
}

TerminalManager.prototype.initialize = function()
{
	this.console = new Console();
	this.chat = new Chat();
	this.chat.initialize();
	this.console.log("You have connected to the syntax terminal!\nType 'help' for a list of commands.\n");

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
		this[this.current].sendCommandFromInput();
	}
	else if (event.keyCode == 9)	//TAB
	{
		if (this.current == "console")
		{
			this.current = "chat";
			this.chat.expand();
			this.chat.focusInput();
		}
		else
		{
			this.current = "console";
			this.chat.contract();
			this.console.focusInput();
		}

		event.preventDefault();
	}
	else
	{
		this[this.current].focusInput();
	}
}