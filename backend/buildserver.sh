#!/bin/sh


rm -f ./db.sqlite3



find . -maxdepth 3 -path "*/migrations/*.py" -not -name "__init__.py" -delete
find . -maxdepth 3 -path "*/migrations/*.pyc" -delete

pip install -r requirements.txt


python manage.py makemigrations
python manage.py migrate


python manage.py init_data