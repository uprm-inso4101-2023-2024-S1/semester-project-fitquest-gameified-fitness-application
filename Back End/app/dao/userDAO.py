from app.config.dbconfig import config_db
import psycopg2


class users:
    def __init__(self):
        connection_url = "dbname=%s user=%s password=%s" % (config_db['dbname'],
                                                            config_db['user'],
                                                            config_db['password'])
        self.conn = psycopg2._connect(connection_url)

    def create_account(self, name, email, password):
        if not self.check_email(email):
            cursor = self.conn.cursor()
            query = ("insert into users(name, email, password, exercise_count, time_exercised, experience_points)"
                     " values (%s,%s,%s,0,0,0 )")
            cursor.execute(query, (name, email, password))
            self.conn.commit()
        else:
            print("Email already in use")

    def check_email(self, email):
        cursor = self.conn.cursor()
        query = "SELECT * FROM users WHERE email = %s"
        cursor.execute(query, (email,))
        result = cursor.fetchone()
        cursor.close()
        return result is not None

    def delete_user_by_id(self, user_id):
        query = 'DELETE FROM "users" WHERE "user_id" = %s;'
        self.conn.execute_query(query, (user_id,))
        self.conn.commit()

    def update_exercise_count(self, user_id):
        cursor = self.conn.cursor()
        query = "update users set exercise_count = exercise_count + 1 where user_id = %s"
        cursor.execute(query, (user_id,))
        self.conn.commit()

    def update_time_exercised(self, user_id):
        ursor = self.conn.cursor()
        query = ""
        # TODO make the function increase the time_exercised

    def update_experience_points(self, user_id, xp_gain):
        cursor = self.conn.cursor()
        query = "update users set experience_points = experience_points + %s where user_id = %s"
        cursor.execute(query, (xp_gain, user_id,))
        self.conn.commit()
