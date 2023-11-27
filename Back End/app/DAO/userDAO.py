from .dao import BaseDAO


class usersDAO(BaseDAO):

    # def __init__(self):
    #     connection_url = "dbname=%s user=%s password=%s" % (config_db['dbname'],
    #                                                         config_db['user'],
    #                                                         config_db['password'])
    #     self.conn = psycopg2._connect(connection_url)

    def __init__(self, conn):
        super().__init__(conn)

    def create_account(self, name, email, password):
        # if not self.check_email(email):
        #     cursor = self.conn.cursor()
        #     query = ("insert into users(name, email, password, exercise_count, time_exercised, experience_points)"
        #              " values (%s,%s,%s,0,0,0 )")
        #     cursor.execute(query, (name, email, password))
        #     self.conn.commit()
        # else:
        #     print("Email already in use")
        if not self.check_email(email):
            query = 'INSERT INTO "users"(name, email, password, exercise_count, time_exercised, experience_points) VALUES (%s,%s,%s,0,0,0 ) RETURNING user_id;'

            cur = self.execute_query(query, (name, email, password))
            self.commit()
            return cur.fetchone()
        # do in handler
        # else:
        #     print("Email already in use")

    def get_users(self):
        query = 'SELECT * FROM "users";'
        cur = self.execute_query(query)
        return cur.fetchall()

    def check_email(self, email):
        query = 'SELECT * FROM users WHERE email = %s;'
        cursor = self.execute_query(query, (email,))
        result = cursor.fetchone()
        cursor.close()
        return result is not None

    def delete_user_by_id(self, user_id):
        query = 'DELETE FROM "users" WHERE "user_id" = %s;'
        self.execute_query(query, (user_id,))
        self.commit()

    def update_exercise_count(self, user_id):
        query = 'update "users" SET exercise_count = exercise_count + 1 WHERE user_id = %s;'
        self.execute_query(query, (user_id,))
        self.conn.commit()

    def update_time_exercised(self, user_id, time_gained):
        query = 'UPDATE "users" SET time_exercised = time_exercised + %s WHERE user_id = %s;'
        self.execute_query(time_gained, user_id)
        self.commit()

    def update_experience_points(self, user_id, xp_gain):
        cursor = self.conn.cursor()
        query = 'update "users" set experience_points = experience_points + %s where user_id = %s;'
        cursor.execute(query, (xp_gain, user_id,))
        self.conn.commit()
