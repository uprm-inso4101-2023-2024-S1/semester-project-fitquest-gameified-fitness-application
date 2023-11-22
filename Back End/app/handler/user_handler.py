from flask import Blueprint, request, jsonify
from dao.dao_factory import DAOFactory
from config.dbconfig import conn

user_handler = Blueprint('user_handler', __name__)

@user_handler.route('/', methods=['POST'])
def create_users():
    data = request.get_json()
    '''
    Json request must follow the convention
    
    {
    "UserName": "John Does",
    "Email": "xyzxyz@test.com",
    "Password": "somethingPassword"
}
    '''
    username = data.get('UserName')
    email = data.get('Email')
    password = data.get('Password')

    dao_factory = DAOFactory(conn)
    user_dao = dao_factory.get_users_dao()

    try:
        user_id = user_dao.create_account(username,email,password)
        response = {
            'message': 'User created successfully',
            'UserID': user_id[0]
        }
        return jsonify(response), 201

    except Exception as e:
        return jsonify(error=str(e)), 500