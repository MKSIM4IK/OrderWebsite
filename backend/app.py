from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from datetime import datetime, timedelta
from functools import wraps
import os

app = Flask(__name__)


import os
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{os.path.join(app.root_path, "servicefix.db")}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your-secret-key-change-this-in-production'
app.config['JWT_EXPIRATION_HOURS'] = 24

db = SQLAlchemy(app)
CORS(app)


class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Order(db.Model):
    __tablename__ = 'orders'
    
    id = db.Column(db.Integer, primary_key=True)
    client_name = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    description = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(20), default='new')
    work_status = db.Column(db.String(20), default='not_done')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    accepted_at = db.Column(db.DateTime, nullable=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'client_name': self.client_name,
            'phone': self.phone,
            'description': self.description,
            'status': self.status,
            'work_status': self.work_status,
            'created_at': self.created_at.isoformat(),
            'accepted_at': self.accepted_at.isoformat() if self.accepted_at else None
        }


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            try:
                token = auth_header.split(' ')[1]
            except IndexError:
                return jsonify({'message': 'Invalid token format'}), 401
        
        if not token:
            return jsonify({'message': 'Token is missing'}), 401
        
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            current_user = User.query.filter_by(username=data['username']).first()
            if not current_user:
                return jsonify({'message': 'Invalid token'}), 401
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token'}), 401
        
        return f(current_user, *args, **kwargs)
    
    return decorated


@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    
    if not data or not data.get('username') or not data.get('password'):
        return jsonify({'message': 'Missing username or password'}), 400
    
    user = User.query.filter_by(username=data['username']).first()
    
    if not user or not user.check_password(data['password']):
        return jsonify({'message': 'Invalid credentials'}), 401
    
    expiration = datetime.utcnow() + timedelta(hours=app.config['JWT_EXPIRATION_HOURS'])
    token = jwt.encode(
        {'username': user.username, 'exp': expiration},
        app.config['SECRET_KEY'],
        algorithm='HS256'
    )
    
    return jsonify({
        'message': 'Login successful',
        'token': token,
        'username': user.username
    }), 200

@app.route('/api/orders', methods=['POST'])
def create_order():
    data = request.get_json()
    
    if not data or not data.get('client_name') or not data.get('phone') or not data.get('description'):
        return jsonify({'message': 'Missing required fields'}), 400
    
    new_order = Order(
        client_name=data['client_name'],
        phone=data['phone'],
        description=data['description'],
        status='new'
    )
    db.session.add(new_order)
    db.session.commit()
    return jsonify({
        'message': 'Order created successfully',
        'order': new_order.to_dict()
    }), 201

@app.route('/api/orders', methods=['GET'])
def get_orders():
    orders = Order.query.order_by(Order.created_at.desc()).all()
    return jsonify([order.to_dict() for order in orders]), 200

@app.route('/api/orders/<int:order_id>/accept', methods=['POST'])
@token_required
def accept_order(current_user, order_id):
    order = db.session.get(Order, order_id)

    if not order:
        return jsonify({'message': 'Order not found'}), 404

    if order.status == 'accepted':
        return jsonify({'message': 'Order already accepted'}), 400

    order.status = 'accepted'
    order.accepted_at = datetime.utcnow()
    db.session.commit()

    return jsonify({
        'message': 'Order accepted successfully',
        'order': order.to_dict()
    }), 200

@app.route('/api/orders/<int:order_id>/work-status', methods=['PUT'])
@token_required
def update_work_status(current_user, order_id):
    order = db.session.get(Order, order_id)
    
    if not order:
        return jsonify({'message': 'Order not found'}), 404
    
    data = request.get_json()
    new_status = data.get('work_status')
    
    if new_status not in ['not_done', 'in_progress', 'done']:
        return jsonify({'message': 'Invalid status'}), 400
    
    order.work_status = new_status
    db.session.commit()
    
    return jsonify({
        'message': 'Work status updated',
        'order': order.to_dict()
    }), 200

@app.route('/api/orders/<int:order_id>', methods=['DELETE'])
@token_required
def delete_order(current_user, order_id):
    order = db.session.get(Order, order_id)

    if not order:
        return jsonify({'message': 'Order not found'}), 404

    db.session.delete(order)
    db.session.commit()

    return jsonify({'message': 'Order deleted successfully'}), 200

@app.route('/api/verify-token', methods=['GET'])
@token_required
def verify_token(current_user):
    return jsonify({
        'message': 'Token is valid',
        'username': current_user.username
    }), 200

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'ok'}), 200


@app.before_request
def create_tables():
    db.create_all()

def init_db():

    db.create_all()
    
    
    existing_user = User.query.filter_by(username='Yurii123').first()
    if not existing_user:
        yurii = User(username='Yurii123')
        yurii.set_password('Yurii123')
        db.session.add(yurii)
        db.session.commit()
        print("Initialized Yurii user")

if __name__ == '__main__':
    with app.app_context():
        init_db()
    app.run(debug=True, port=5000)
