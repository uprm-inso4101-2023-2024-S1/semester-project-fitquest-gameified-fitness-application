
from .userDAO import usersDAO




class DAOFactory:
    def __init__(self, conn):
        self.conn = conn

        def get_userDAO(self):
            return usersDAO(self.conn)
