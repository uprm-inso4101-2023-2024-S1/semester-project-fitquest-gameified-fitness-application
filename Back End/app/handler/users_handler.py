from flask import Blueprint, request, jsonify


user_handler = Blueprint('users_handler', __name__)


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

    from app.DAO.dao_factory import DAOFactory
    from app.config.dbconfig import conn

    dao_factory = DAOFactory(conn)
    user_dao = dao_factory.get_user_dao()

    try:
        user_id = user_dao.create_account(username, email, password)
        response = {
            'message': 'User created successfully',
            'UserID': user_id[0]
        }
        return jsonify(response), 201

    except Exception as e:
        return jsonify(error=str(e)), 500
