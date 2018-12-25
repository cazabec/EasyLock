# EasyLock app

EasyLock provides a React App done with react from where you can manage your account and your locks
Below I'll describe all the different parts of the app

## Different views of project :

### Home

It's the part of the app in charged to rendre a homepage, it's called just after the user has logged in

### Locks

This part is all about locks management, a component is in charge to list all the locks the user has access to and another one shows the configuration of a lock when you click on it in the list.
This components are called when you click on the lock icon in the navbar

### Login

This part has just for purpose to log the user into the app. This view is invoked when you try to access a page where you need to be logged

### NotFound

This part is just here to display a 404 error page when you try to access an url that is not linked to any component

### Register

This part is just here to register the user into the database. This page appears when you arrive on the application

### Root

This component just load the router and initialize redux

### Settings

This is the part in charge of rendering the settings view to the user. It appears when you click on the settings icon in the navbar

### Test

This part is here just to test a specific lock, by entering the profile picture of someone you can check if he can enter to a specific lock. It appears when you are on the Lock view and you click on 'test this lock'

### Upload

This one is here to show a upload form to the user when he has to upload his profile pictures. This page appears the first time you connect to the application and when you click on 'add more pictures' in the settings view
