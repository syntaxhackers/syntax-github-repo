from flask import Flask, send_from_directory, render_template, request, session, redirect
app = Flask(__name__)
app.secret_key = 'DFGDFHGSRGFYDTGFSDFJHHGDSHGFSGHJHGDFZSDJTYHTSGRASKUEYTAHGRAKUOUIYSHTAGSUROIUTSGSYIUY46'

getUserFromPassword = {
	'synt': 'Espix',
	'syntaxe': 'Xeophalt'
}

groups = [
	{
		"title": "CXX",
		"who": ['Espix', 'Xeophalt']
	}
]

def red(where):
	return redirect(where, 302)

@app.route('/')
def landing():
	if 'user' not in session:
		return red('/login')
	user = session['user']
	if user == "Itane":
		return "This account name has been renamed from 'Itane' to 'Xeophalt'. The session cookie is still showing you logged in as 'Xeophalt'. Because of this, the server will encounter errors because you are logged into an invalid account. Long story short: To continue, please <a href='/logout'>logout</a> and log back in!"
	return render_template("index.html", username=user, groups=groups)

@app.route('/login', methods=['GET'])
def login():
	err = None
	if ('err' in request.args):
		err = request.args['err']
	return render_template("login.html", err=err)

@app.route('/challenge', methods=["POST"])
def challenge():
	passw = request.form["pass"]
	if passw == "syntaxe" or passw == "synt":
		session['user'] = getUserFromPassword[passw]
		return red('/')
	else:
		return red('/login?err=1')

@app.route('/logout')
def logout():
	session.pop('user')
	return red('/')

@app.route('/group', methods=["GET"])
def group():
	if 'user' not in session:
		return red('/login')
	user = session['user']
	if user == "Itane":
		return "This account name has been renamed from 'Itane' to 'Xeophalt'. The session cookie is still showing you logged in as 'Xeophalt'. Because of this, the server will encounter errors because you are logged into an invalid account. Long story short: To continue, please <a href='/logout'>logout</a> and log back in!"
	gr = request.args["cnael"]
	return render_template("group.html", username=user, group=gr)

@app.route('/google')
def google():
	if 'user' not in session:
		return red('http://www.google.com/')
	return render_template("google.html")


@app.route('/static/<path:path>')
def get_static(path):
	return send_from_directory('static', path)

@app.route('/error', methods=["GET"])
def error_page():
	error = request.args["message"]
	return "<h1>Error</h1>Sorry there is an error coming from the server right now so here is the message that's been given to us:<br><b>" + error + "</b>"

if __name__ == "__main__":
	app.run()