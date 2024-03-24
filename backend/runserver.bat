@echo off

REM Delete the SQLite database file if it exists
del /f db.sqlite3

REM Find and delete migration files (excluding __init__.py) and .pyc files within migrations folders up to 3 levels deep
FOR /R %%i IN (migrations\*.py) DO (
    IF NOT "%%~nxi"=="__init__.py" (
        del /f "%%i"
    )
)
FOR /R %%i IN (migrations\*.pyc) DO (
    del /f "%%i"
)

REM Install requirements from the requirements.txt file
pip install -r requirements.txt

REM Make migrations and migrate the database
python manage.py makemigrations
python manage.py migrate

REM Initialize the database with initial data
python manage.py init_data

REM Run the Django development server on port 8000
python manage.py runserver 8000
