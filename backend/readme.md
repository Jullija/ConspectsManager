### Backend

Create virtual environment
```python3 -m venv env```
```source env/bin/activate```


Install pip requirements
```pip install -r requirements.txt```


Make django migrations
```python manage.py makemigrations```
```python manage.py migrate```

Add example data
```python manage.py init_data```

Run server
```python manage.py runserver```

To use Django admin panel you have to create superuser.

run ```python manage.py createsuperuser```

Than you can login into ```http://127.0.0.1:8000/admin``` with created superuser account.