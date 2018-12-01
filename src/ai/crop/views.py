from django.http import HttpResponse
from django.views.generic import View

from crop.preprocess import crop_folder


class CropView(View):

    def get(self, request):
        crop_folder(
            '/root/openface/code/pictures/upload/input/user_' +
            request.GET['user'],
            '/root/openface/code/pictures/upload/output',
            180,
            request.GET['image']
        )
        return HttpResponse("ok")
