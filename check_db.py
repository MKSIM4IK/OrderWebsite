import sqlite3
conn = sqlite3.connect('backend/servicefix.db')
c = conn.cursor()
c.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = c.fetchall()
print("Tables:", tables)
for table in tables:
    if table[0] == 'users':
        c.execute("SELECT * FROM users;")
        users = c.fetchall()
        print("Users:", users)
    if table[0] == 'orders':
        c.execute("SELECT COUNT(*) FROM orders;")
        count = c.fetchone()[0]
        print(f"Orders count: {count}")
