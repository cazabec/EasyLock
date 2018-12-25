# EasyLock AI

EasyLock provides an AI to detect faces on an image

## Different views of project :

### Crop

This part of the project handles the reception of images
When an image arrives, a request i made to the ai, and the image is cropped to show juste the face of the person

I used the dlib library to do this: https://github.com/davisking/dlib

The endpoint in charge of cropping is the one below:

* crop:
    * **GET** http://ai:2000/image/crop/
    * Parameters: user, image

When this endpoint is called the image in the picture folder of the user is cropped and sent to the output folder.
The input folder where the images are stored is src/pictures/upload/input/user_{user_id}
The output folder where the cropped images are stored is src/pictures/upload/output/user_{user_id}


### Classifier

This part has for purpose to take all the output images in the folder and to generate a classifier. When we send an image to the trained classifier, it returns the user that match the most to the input image.

I used openface to train the classifier: https://github.com/cmusatyalab/openface

The endpoint in charge of training the classifier is:

* train:
    * **GET**    http://ai:2000/classifier/run/
    * Parameters: image

this endpoint returns the folder which matches the input profile picture (example: user_2bca29fe-eaf6-44b3-a0fc-f5ced61b284a) and the similarity between the user and the input picture (example: 89,5%)

