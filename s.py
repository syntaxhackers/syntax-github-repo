from flask import Flask, send_from_directory, render_template, request, session, redirect
app = Flask(__name__)
app.secret_key = 'DFGDFHGSRGFYDTGFSDFJHHGDSHGFSGHJHGDFZSDJTYHTSGRASKUEYTAHGRAKUOUIYSHTAGSUROIUTSGSYIUY46'

getUserFromPassword = {
	'synt': 'Espix',
	'syntaxe': 'Itane'
}

groups = [
	{
		"title": "CXX",
		"who": ['Espix', 'Itane']
	}
]

def red(where):
	return redirect(where, 302)

@app.route('/')
def landing():
	if 'user' not in session:
		return red('/login')
	user = session['user']
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

@app.route('/fl')
def forcelogout():
	session.pop('user')
	return "you've forced logouted! <a href='/'>Click here to go back!</a>"

@app.route('/logout')
def logout():
	session.pop('user')
	return red('/')

@app.route('/group', methods=["GET"])
def group():
	if 'user' not in session:
		return red('/login')
	user = session['user']
	gr = request.args["cnael"]
	return render_template("group.html", username=user, group=gr)


@app.route('/static/<path:path>')
def get_static(path):
	return send_from_directory('static', path)

@app.route('/error', methods=["GET"])
def error_page():
	error = request.args["message"]
	return "<h1>Error</h1>Sorry there is an error coming from the server right now so here is the message that's been given to us:<br><b>" + error + "</b>"

if __name__ == "__main__":
	app.run()