from django.urls import path
from .views import LoginView,RegisterView,PublicProfileView,UserDetailsView


urlpatterns = [
    path("login",LoginView.as_view()),
    path("register",RegisterView.as_view()),
    path("profile",UserDetailsView.as_view()),
    path("publicProfile",PublicProfileView.as_view())
]
