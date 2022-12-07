from rest_framework.viewsets import GenericViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework import mixins
from .serializers import UserModelSerializer, UserModelSerializerWithStaff
from .models import User


class UserModelViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, GenericViewSet):

    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.version == 'v2':
            return UserModelSerializerWithStaff
        return UserModelSerializer
