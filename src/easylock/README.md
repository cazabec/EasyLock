# EasyLock API

EasyLock provides a RESTful API where you can manage everything you need
Below I'll describe all the different parts of the API that were done using django and django-rest-framework

## Different apps of project :

### Accounts

This part of the project handles registration and authentication
The endpoints you can call are the ones below:

* Register:
    * **POST** http://www.your-domain.com/api/v1/accounts/register/
    * Parameters: email, first_name, last-name, password
* Login
    * **POST** http://www.your-domain.com/api/v1/accounts/login/
* Get list of users
    * **GET** http://www.your-domain.com/api/v1/accounts/

### Locks

This part is all about locks management
The endpoints you can call are the ones below:

* Get list of locks:
    * **GET** http://www.your-domain.com/api/v1/lock/
* Try to open a lock
    * **GET** http://www.your-domain.com/api/v1/open/{lock_id}
    * Parameters: picture

### Rights

This part is about the rights on the locks, you can either be OWNER or GUEST on the lock
The endpoints you can call are the ones below:

* Get list of all rights:
    * **GET** http://www.your-domain.com/api/v1/rights/
* Invite someone on a lock
    * **POST** http://www.your-domain.com/api/v1/rights/
    * Parameters: right, expiration, user, lock

### Pictures

This part is about how to store the pictures of the users and handle the upload
The endpoints you can call are the ones below:

* Upload a picture (the picture is cropped around the face once it's uploaded):
    * **POST** http://www.your-domain.com/api/v1/upload/
    * Parameters: image

## Authentication

All request must be authenticated thanks to a Bearer Token returned when you call the login endpoint.

## Database Scheme

![database scheme](https://github.com/cazabec/EasyLock/blob/develop/doc/database-scheme.png "Database scheme")
