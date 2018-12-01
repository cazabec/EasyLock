from django.http import HttpResponse
from django.views.generic import View

import subprocess


class TrainView(View):

    def get(self, request):
        subprocess.call(
            '/root/openface/batch-represent/main.lua \
            -outDir /root/openface/code/pictures/upload/signatures \
            -data /root/openface/code/pictures/upload/output/', shell=True)
        subprocess.call('/root/openface/demos/classifier.py train  \
        /root/openface/code/pictures/upload/signatures/ ', shell=True)

        return HttpResponse(status=204)


class RunView(View):

    def get(self, request):
        output = subprocess.check_output(
            '/root/openface/demos/classifier.py infer \
            /root/openface/code/pictures/upload/signatures/classifier.pkl ' +
            '/root/openface/code/pictures/tmp/' + request.GET['image'],
            shell=True)

        return HttpResponse(output)
