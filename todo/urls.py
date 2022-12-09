from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework.permissions import AllowAny
from graphene_django.views import GraphQLView
from userapp.views import UserModelViewSet
from todoapp.views import ProjectModelViewSet, TodoModelViewSet
from rest_framework.authtoken import views


schema_view = get_schema_view(
    openapi.Info(
        title="Todo",
        default_version='0.9',
        description="Documentation for Todo project",
        contact=openapi.Contact(email="admin@admin.local"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=[AllowAny],
)

router = DefaultRouter()
router.register('users', UserModelViewSet)
router.register('projects', ProjectModelViewSet)
router.register('todos', TodoModelViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
    path('api-token-auth/', views.obtain_auth_token),
    path('api/<str:version>/users/', UserModelViewSet.as_view({'get': 'list'})),
    path('swagger<str:format>/', schema_view.without_ui()),
    path('swagger/', schema_view.with_ui('swagger')),
    path("graphql/", GraphQLView.as_view(graphiql=True)),
]
