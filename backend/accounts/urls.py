from django.urls import path
from .views import (
    LoginView,
    RegisterView,
    PublicProfileView,
    UserDetailsView,
    ChangePasswordView,
    DeleteAccountView,
    LogoutView,
    ForgotPasswordView,
    ResetPasswordView,
)

urlpatterns = [
    path("login", LoginView.as_view()),
    path("register", RegisterView.as_view()),
    path("profile", UserDetailsView.as_view()),
    path("publicProfile", PublicProfileView.as_view()),
    path("change-password", ChangePasswordView.as_view()),
    path("delete-account", DeleteAccountView.as_view()),
    path("logout", LogoutView.as_view()),
    path("forgot-password", ForgotPasswordView.as_view()),
    path("reset-password", ResetPasswordView.as_view()),
]
