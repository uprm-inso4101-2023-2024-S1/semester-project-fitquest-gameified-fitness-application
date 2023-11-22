# DB configurations for easy access in handler classes
import psycopg2


conn = psycopg2.connect(
    database="FitQuestDB",
    user="root",
    password="password",
    host="localhost",
    port="5432"
)

