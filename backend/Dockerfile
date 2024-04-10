FROM python:alpine

WORKDIR /backend

COPY . .

EXPOSE 8000

RUN chmod +x buildserver.sh
RUN ./buildserver.sh


ENTRYPOINT ["python3"]
CMD ["manage.py", "runserver", "0.0.0.0:8000"]