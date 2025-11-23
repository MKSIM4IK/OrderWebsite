# ServiceFix - Deployment Guide

## 🚀 Deploying to Production

This guide covers deploying ServiceFix to a production environment.

---

## 📋 Pre-Deployment Checklist

- [ ] All tests passing
- [ ] No console errors
- [ ] Environment variables configured
- [ ] Database backups created
- [ ] SSL/HTTPS certificate ready
- [ ] Domain name purchased and configured
- [ ] Hosting provider selected

---

## 🔧 Backend Deployment (Flask)

### Option 1: Deploy on Heroku

**Setup:**
1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create your-app-name`

**Configuration:**
Create `Procfile` in backend folder:
```
web: gunicorn app:app
```

**Requirements update:**
Add to `requirements.txt`:
```
gunicorn==21.2.0
```

**Deploy:**
```bash
cd backend
git init
git add .
git commit -m "Initial commit"
git push heroku main
```

**Set environment variables:**
```bash
heroku config:set SECRET_KEY=your-production-secret-key
heroku config:set FLASK_ENV=production
```

### Option 2: Deploy on PythonAnywhere

1. Create account on pythonanywhere.com
2. Upload files via web interface
3. Configure WSGI file
4. Set environment variables in web app settings
5. Reload web app

### Option 3: Deploy on AWS/Azure/GCP

Use their respective deployment guides and deploy with:
```bash
pip install -r requirements.txt
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Production Configuration

**Create `config.py`:**
```python
import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev-key')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'sqlite:///servicefix.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_EXPIRATION_HOURS = 24
    CORS_ORIGINS = os.environ.get('CORS_ORIGINS', 'http://localhost:3000')

class ProductionConfig(Config):
    DEBUG = False
    TESTING = False

class DevelopmentConfig(Config):
    DEBUG = True
    TESTING = False
```

**Update `app.py` to use config:**
```python
from config import ProductionConfig, DevelopmentConfig
import os

config = ProductionConfig if os.environ.get('FLASK_ENV') == 'production' else DevelopmentConfig
app.config.from_object(config)
```

---

## 🎨 Frontend Deployment (React)

### Option 1: Deploy on Vercel

**Setup:**
1. Create account on vercel.com
2. Connect GitHub repository
3. Click "Deploy"

Vercel automatically:
- Builds React app
- Optimizes assets
- Deploys globally
- Sets up HTTPS

**Configuration:**
Create `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ]
}
```

Update API URL in components (use environment variables):
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
```

Create `.env.production`:
```
REACT_APP_API_URL=https://your-backend-domain.com
```

### Option 2: Deploy on Netlify

1. Connect GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Deploy

**Configure redirects in `_redirects` file:**
```
/* /index.html 200
```

### Option 3: Deploy on GitHub Pages

1. Add to `package.json`:
```json
"homepage": "https://yourusername.github.io/Order"
```

2. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

3. Add scripts:
```json
"predeploy": "npm run build",
"deploy": "gh-pages -d build"
```

4. Deploy:
```bash
npm run deploy
```

### Option 4: Custom Server (VPS)

**Build and serve:**
```bash
npm run build
# Use nginx or Apache to serve static files
```

**Nginx configuration:**
```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /var/www/servicefix/frontend/build;
    index index.html;

    location / {
        try_files $uri /index.html;
    }

    location /api {
        proxy_pass http://backend-server:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## 🔐 Production Security

### Backend Security

1. **Secure SECRET_KEY:**
```python
import secrets
SECRET_KEY = secrets.token_urlsafe(32)
```

2. **Enable HTTPS:**
```python
app.config['SESSION_COOKIE_SECURE'] = True
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
```

3. **Rate Limiting:**
```bash
pip install Flask-Limiter
```

Add to app.py:
```python
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

limiter = Limiter(
    app=app,
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)

@app.route('/api/login', methods=['POST'])
@limiter.limit("5 per minute")
def login():
    # ...
```

4. **Database Security:**
- Use PostgreSQL instead of SQLite in production
- Enable SSL connections
- Regular backups
- Strong passwords

5. **CORS Configuration:**
```python
CORS(app, resources={
    r"/api/*": {
        "origins": ["https://your-frontend-domain.com"],
        "methods": ["GET", "POST"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})
```

### Frontend Security

1. **Environment Variables:**
- Never commit API keys
- Use `.env` files (in .gitignore)
- Use process.env for sensitive data

2. **Helmet Headers:**
```python
# Backend
pip install Flask-Talisman
from flask_talisman import Talisman
Talisman(app)
```

3. **Update Dependencies:**
```bash
npm audit
npm audit fix
```

---

## 📊 Database Migration (SQLite to PostgreSQL)

For production, migrate from SQLite to PostgreSQL:

1. **Install PostgreSQL adapter:**
```bash
pip install psycopg2-binary
```

2. **Update database URL:**
```python
# Production
DATABASE_URL = "postgresql://user:password@localhost:5432/servicefix"
```

3. **Export SQLite data:**
```bash
sqlite3 servicefix.db .dump > backup.sql
```

4. **Import to PostgreSQL:**
```bash
psql -U postgres < backup.sql
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy ServiceFix

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2
    
    - name: Set up Python
      uses: actions/setup-python@v2
      with:
        python-version: '3.9'
    
    - name: Install dependencies
      run: |
        cd backend
        pip install -r requirements.txt
    
    - name: Run tests
      run: |
        cd backend
        pytest
    
    - name: Deploy to Heroku
      uses: akhileshns/heroku-deploy@v3.12.12
      with:
        heroku_api_key: ${{secrets.HEROKU_API_KEY}}
        heroku_app_name: ${{secrets.HEROKU_APP_NAME}}
        heroku_email: ${{secrets.HEROKU_EMAIL}}
```

---

## 📈 Monitoring & Logging

### Backend Monitoring

1. **Error tracking:**
```bash
pip install sentry-sdk
```

```python
import sentry_sdk
from sentry_sdk.integrations.flask import FlaskIntegration

sentry_sdk.init(
    dsn="your-sentry-dsn",
    integrations=[FlaskIntegration()],
    traces_sample_rate=1.0
)
```

2. **Logging:**
```python
import logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
```

### Frontend Monitoring

```bash
npm install sentry/react
```

---

## 🚨 Rollback Procedures

### Heroku Rollback
```bash
heroku releases
heroku rollback v4
```

### Git Rollback
```bash
git revert HEAD
git push heroku main
```

---

## 📝 Production Checklist

- [ ] All environment variables configured
- [ ] SSL/HTTPS enabled
- [ ] Database backed up
- [ ] Error logging configured
- [ ] Rate limiting enabled
- [ ] CORS properly configured
- [ ] Dependencies updated
- [ ] Security headers set
- [ ] Monitoring tools integrated
- [ ] Backup restore procedure tested
- [ ] Load tested
- [ ] Performance optimized

---

## 🆘 Common Issues

### 502 Bad Gateway
- Check backend logs
- Verify environment variables
- Restart backend service

### CORS Errors
- Verify frontend domain in CORS config
- Check API URL in frontend
- Ensure credentials header if needed

### Database Connection Failed
- Check DATABASE_URL
- Verify database is running
- Check firewall rules

### Out of Memory
- Optimize database queries
- Add caching (Redis)
- Scale horizontally

---

## 📞 Support Contacts

- Backend: [Your contact]
- Frontend: [Your contact]
- Infrastructure: [Your contact]

---

## 🎉 Deployment Complete!

After following this guide, your ServiceFix application should be live and ready for production use.

Monitor logs and metrics regularly for optimal performance.
