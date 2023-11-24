from flask import Flask, request, jsonify
from app.dao.userDAO import users
from handler.user_handler import user_handler
#
app = Flask(__name__)
user = users()



@app.route('/')
def hello_world():  # put application's code here
    return 'Hello!\n'

@app.route('/user/login', methods=['POST'])
def login_routine():
    if request.method == 'POST':
        response = request.get_json
        email = response.get('email')
        user.check_email(email)



    if user.check_email() == False:
        response_data = {
            'message': 'New user detected, creating account...',
        }
        password = response.__get__('password')
        username = response.__get__('username')
        user.create_account(username,email,password)

    else:
        response_data = {
            'message': 'User already has an account',
        }
    return jsonify(response_data)

    


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)

app.register_blueprint(user_handler, url_prefix= "/login")