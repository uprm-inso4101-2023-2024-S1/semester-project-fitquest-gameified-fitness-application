class BaseDAO:
    def __init__(self, conn):
        self.conn = conn

    def execute_query(self, query, params=None):
        cur = self.conn.cursor()
        if params:
            cur.execute(query, params)
        else:
            cur.execute(query)
        return cur

    def commit(self):
        self.conn.commit()