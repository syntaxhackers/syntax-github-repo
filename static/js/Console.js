function Console()
{
	this.text = document.getElementById("consoleText");
	this.input = document.getElementById("consoleInput");
	this.commandManager = new CommandManager();
	this.commandManager.setConsole(this);
}

Console.prototype.focusInput = function()
{
	this.input.focus();
}

Console.prototype.sendCommand = function(cmd)
{
	var data = this.getCommandDataFromString(cmd);
	this.commandManager.sendCommand(data.command, data.args, data.ops, data.kwops);
}

Console.prototype.getCommandDataFromString = function(cmd)
{
	var args = [];
	var ops = [];
	var kwops = {};
	var data = cmd.split(" ");
	console.log("data:", data)
	var command = data[0];
	console.log("command:", command)
	var op = "";
	var finishOp = false;
	data.splice(0, 1);

	for (var i = 0; i < data.length; i++)
	{
		var arg = data[i];
		if (arg.startsWith("-"))
		{
			if (finishOp)
			{
				ops.push(op);
				op = "";
			}
			op = arg;
			finishOp = true;
		}
		else if (finishOp)
		{
			kwops[op] = arg;
			finishOp = false;
		}
		else
		{
			args.push(arg);
		}
	}

	if (finishOp)
	{
		ops.push(op);
	}

	return {'command': command, 'args': args, 'ops': ops, 'kwops': kwops}
}

Console.prototype.sendCommandFromInput = function()
{
	var cmd = this.input.value;
	this.input.value = "";
	this.sendCommand(cmd);
}

Console.prototype.log = function(text)
{
	console.log("MARBLES",this.text.scrollTop,"===",this.text.scrollHeight,"-",this.text.offsetHeight,"(",this.text.scrollHeight-this.text.offsetHeight,")")
	var scrollToBottom = false;
	if (this.text.scrollTop === (this.text.scrollHeight - this.text.offsetHeight))
		scrollToBottom = true;
	this.text.innerHTML += text + "\n";
	if (scrollToBottom)
		this.text.scrollTop = this.text.scrollHeight;
}

Console.prototype.clear = function()
{
	this.text.innerHTML = "";
}