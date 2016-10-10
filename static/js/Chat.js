function Chat()
{
	this.wrapper = document.getElementById("chat");
	this.text = document.getElementById("chatText");
	this.input = document.getElementById("chatInput");
	this.wsurl;
	this.ws;
}

Chat.prototype.initialize = function()
{
	this.initializeText();
	this.initializeWebsockets();
}

Chat.prototype.initializeText = function()
{
	this.logMessage("Type '/clear' to clear the screen!");
	this.logMessage("Type '/list' to list the connected users!\n")
}

Chat.prototype.initializeWebsockets = function()
{
	try
	{
		this.wsurl = "ws://" + location.host + "/chatsocket";
		this.ws = new WebSocket(this.wsurl);
	}
	catch(e)
	{
		console.log("Error while connecting to websockets with non-secure connection!")
		console.log(e)
		console.log("Connecting to secure connection now...")
		this.wsurl = "wss://" + location.host + "/chatsocket";
		this.ws = new WebSocket(this.wsurl);	
	}
	
	this.ws.onopen = this.handleWebsocketOpening.bind(this);
	this.ws.onmessage = this.handleWebsocketMessage.bind(this);
}

Chat.prototype.focusInput = function()
{
	this.input.focus();
}

Chat.prototype.expand = function()
{
	this.wrapper.classList.add("expanded");
}

Chat.prototype.contract = function()
{
	this.wrapper.classList.remove("expanded");
}

Chat.prototype.sendCommandFromInput = function()
{
	var cmd = this.input.value;
	this.input.value = "";
	this.sendMessage(cmd);
}

Chat.prototype.handleWebsocketOpening = function()
{
	this.logMessage("[Client] Connected with server!");
}

Chat.prototype.handleWebsocketMessage = function(evt)
{
	this.logMessage(evt.data);
}

Chat.prototype.sendMessage = function(message)
{
	if (message.startsWith("/"))
	{
		if (message == "/clear")
		{
			this.clearMessages();
		}
		else if (message == "/list")
		{
			this.ws.send("/list")
		}
		else
		{
			this.logMessage("[Client] Invalid command!")
		}
	}
	else
	{
		this.ws.send(message);	
	}
}

Chat.prototype.logMessage = function(text)
{
	var scrollToBottom = false;
	if (this.text.scrollTop === (this.text.scrollHeight - this.text.offsetHeight))
		scrollToBottom = true;
	this.text.innerHTML += text + "\n";
	if (scrollToBottom)
		this.text.scrollTop = this.text.scrollHeight;
}

Chat.prototype.clearMessages = function()
{
	this.text.innerHTML = "";
	this.initializeText();
}