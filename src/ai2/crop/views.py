from django.http import HttpResponse
from django.views.generic import View

from util.align_dlib import alignMain


class CropView(View):

    def get(self, request):
        '''crop_folder(
            '/code/pictures/upload/input/user_' + request.GET['user'],
            '/code/pictures/upload/output',
            180,
            request.GET['image']
        )'''
        return HttpResponse("ok")
