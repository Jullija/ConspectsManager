FROM python:alpine

WORKDIR /backend
COPY requirements.txt .
RUN pip3 install -r requirements.txt --no-cache-dir
COPY . .
RUN python3 manage.py makemigrations
RUN python3 manage.py migrate
RUN python3 manage.py init_data
RUN python manage.py createsuperuser

EXPOSE 8000

ENTRYPOINT ["python3"]
CMD ["manage.py", "runserver", "0.0.0.0:8000"]