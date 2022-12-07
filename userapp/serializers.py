from rest_framework.serializers import ModelSerializer
from .models import User


class UserModelSerializer(ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'firstname', 'lastname', 'email',)


class UserModelSerializerWithStaff(ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'firstname', 'lastname', 'email', 'is_superuser', 'is_staff',)
