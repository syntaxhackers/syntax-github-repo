from flask import Flask, send_from_directory, render_template, request, session, redirect
app = Flask(__name__)
app.secret_key = 'DFGDFHGSRGFYDTGFSDFJHHGDSHGFSGHJHGDFZSDJTYHTSGRASKUEYTAHGRAKUOUIYSHTAGSUROIUTSGSYIUY46'

@app.route('/')
def landing():
	if 'user' not in session:
		return redirect('/login', 302)

	#return error("Service is down right now will be back up soon doing some stuff.");

@app.route('/login')
def login():
	#return redirect('/error?message=Service is down right now will be back up soon you cannot login right now ok!')
	return render_template("index.html")

@app.route('/dologin')
def dologin():
	session['user'] = "logged in!"
	return "you've logged in with hacks!"

@app.route('/dologout')
def dologout():
	session.pop('user')
	return "you've logged out with hacks!"

@app.route('/challenge', methods=["POST"])
def challenge():
	passw = request.form["pass"]
	if passw == "syntaxe" or passw == "synt":
		return render_template('syntax.html')
	return "Sorry, go back, or else die! You're not allowed here.<br>Oh wait... if you don't know what is after happening just simply <a href='/'>click here</a> to get back to somewhere which I am no longer responsible for!"



@app.route('/static/<path:path>')
def get_static(path):
	return send_from_directory('static', path)

@app.route('/error', methods=["GET"])
def error_page():
	error = request.args["message"]
	return "<h1>Error</h1>Sorry there is an error coming from the server right now so here is the message that's been given to us:<br><b>" + error + "</b>"

if __name__ == "__main__":
	app.run()