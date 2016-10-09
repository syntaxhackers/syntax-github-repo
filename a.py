import tornado.ioloop
import tornado.web
import tornado.websocket
import os

getUserFromPassword = {
	'synt': 'Espix',
	'syntaxe': 'Xeophalt'
}

def SyntaxApp():

	settings = {
		"debug": True,
		"cookie_secret": "DGHDFGFSHDTSDAFSDYHTRZEGHTUKFJYHGSFGDHYTJHDGSFGHY",
		"static_path": os.path.join(os.path.dirname(__file__), "static")
	}

	app = tornado.web.Application([
		(r"/", MainHandler),
		(r"/login", LoginHandler),
		(r"/logout", LogoutHandler),
		(r"/google", GoogleHandler),
		(r"/group", GroupHandler),
		(r"/chatsocket", ChatWSHandler),
	], **settings)

	return app

class MainHandler(tornado.web.RequestHandler):

    def get(self):
    	user = self.get_secure_cookie('user')
        if not user:
        	return self.redirect('/login')
       	self.render("templates/index.html", username=user)

class LoginHandler(tornado.web.RequestHandler):

	def get(self):
		err = get_arg(self, "err", 0)
		self.render("templates/login.html", err=err)

	def post(self):
		pw = get_form(self, "pass")
		if pw == "syntaxe" or pw == "synt":
			self.set_secure_cookie('user', getUserFromPassword[pw])
			self.redirect('/')
		else:
			self.redirect('/login?err=1')

class LogoutHandler(tornado.web.RequestHandler):

	def get(self):
		self.clear_cookie('user')
		self.redirect('/')

class GoogleHandler(tornado.web.RequestHandler):

	def get(self):
		self.render("templates/google.html")

class GroupHandler(tornado.web.RequestHandler):

	def get(self):
		self.write("This page has been deprecated for a while and is now removed. Hit the back button on your browser!")

class ChatWSHandler(tornado.websocket.WebSocketHandler):

	cons = [];

	def open(self):
		self.cons.append(self)
		self.write_message("[Server] Connected with client!")

	def on_message(self, message):
		user = self.get_secure_cookie('user')
		if not user:
			return
		write_message_all(self, user + ": " + message)

	def on_close(self):
		self.cons.remove(self)

def get_arg(self, arg, or_=None):
	try:
		value = self.get_argument(arg)
	except:
		value = or_

	return value

def get_form(self, f, or_=None):
	try:
		value = self.get_body_argument(f)
	except:
		value = or_

	return value

def write_message_all(self, message):
	[c.write_message(message) for c in self.cons]

app = SyntaxApp()

if __name__ == "__main__":
    app.listen(8000)
    tornado.ioloop.IOLoop.current().start()