import sys
sys.path.insert(0, '.')
from app import app, db, User

with app.app_context():
    user = User.query.filter_by(username='Yurii123').first()
    if user:
        print(f"User found: {user.username}")
        print(f"Password hash: {user.password_hash[:50]}...")
        print(f"Testing password 'Yurii123': {user.check_password('Yurii123')}")
    else:
        print("User not found!")
