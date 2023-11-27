from flask import Flask, request, jsonify
from handler.users_handler import user_handler
#
app = Flask(__name__)




@app.route('/')
def hello_world():  # put application's code here
    return 'Hello!\n'



if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)

app.register_blueprint(user_handler, url_prefix= "/login")