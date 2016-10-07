import tornado.ioloop
import tornado.web
import os

def SyntaxApp():

	settings = {
		"debug": True,
		"static_path": os.path.join(os.path.dirname(__file__), "static")
	}

	app = tornado.web.Application([
		(r"/", MainHandler),
		(r"/login", LoginHandler),
		(r"/coolbeans", CoolBeansHandler)
	], **settings)

	return app

class MainHandler(tornado.web.RequestHandler):

    def get(self):
        self.write("Hello, world! Click <a href='/login'>here</a> to login! (This website is being transitioned from flask to tornado. So for now '/login' is the only page re-coded, so the rest won't work)")

class LoginHandler(tornado.web.RequestHandler):

	def get(self):
		err = get_arg(self, "err", 0)
		self.render("templates/login.html", err=err)

	def post(self):
		pw = get_form(self, "pass")
		if pw == "syntaxe" or pw == "synt":
			return self.redirect('/coolbeans')
		else:
			return self.redirect('/login?err=1')

class CoolBeansHandler(tornado.web.RequestHandler):

	def get(self):
		self.write("This website is in the proccess of transitioning to tornado. Therefore after you login (or you type this url in the address bar), you will get redirected to here. You cannot use this website at this time. Please check bar later. Thanks for your patience! (I'm 1/4 way there! But I have rowing now.)")

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

app = SyntaxApp()

if __name__ == "__main__":
    app.listen(8000)
    tornado.ioloop.IOLoop.current().start()