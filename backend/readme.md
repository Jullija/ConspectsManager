### Backend

Create and activate virtual environment
```python3 -m venv env```
```source env/bin/activate```

Make runserver.sh executable:
```chmod +x runserver.sh```

Run ```./runserver.sh``` or ```runserver.bat``` (for windows) to:

- Remove the SQLite database file
- Install Python dependencies
- Run Django migrations
- Add example data to the database
- Start the Django development server


