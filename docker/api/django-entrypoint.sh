#!/bin/bash

until cd src
do
    echo "Waiting for django volume..."
    sleep 2
done

until python manage.py migrate --settings=easylock.settings.settings_dev
do
    echo "Waiting for postgres ready..."
    sleep 2
done

python manage.py loaddata fixtures.json --settings=easylock.settings.settings_dev
python manage.py runserver 0.0.0.0:8000 --settings=easylock.settings.settings_dev