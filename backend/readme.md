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