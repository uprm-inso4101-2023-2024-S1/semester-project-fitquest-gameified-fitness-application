
from .userDAO import usersDAO


class DAOFactory:
    def __init__(self, conn):
        self.conn = conn

    def get_user_dao(self):
        return usersDAO(self.conn)