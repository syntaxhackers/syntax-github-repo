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
	this.initializeWebsockets();
}

Chat.prototype.initializeWebsockets = function()
{
	this.wsurl = "ws://" + location.host + "/chatsocket";
	this.ws = new WebSocket(this.wsurl);
	
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
	this.logMessage("Connected to chat...");
}

Chat.prototype.handleWebsocketMessage = function(evt)
{
	this.logMessage("[Message recieved] Got some nice data here! " + evt.data);
}

Chat.prototype.sendMessage = function(message)
{
	this.logMessage("[Message sent] Sent message! Should recieve it shortly!")
	this.ws.send(message);
}

Chat.prototype.logMessage = function(text)
{
	this.text.innerHTML += text + "\n"
}

Chat.prototype.clearMessages = function()
{
	this.text.innerHTML = "";
}