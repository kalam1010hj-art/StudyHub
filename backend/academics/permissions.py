from rest_framework.permissions import BasePermission

class IsAdminForWrite(BasePermission):
    def has_permission(self, request, view):
        if request.method == "GET":
            return True
        if request.method in ["POST","PUT","DELETE"]:
            return request.user.is_authenticated and request.user.is_staff
        return False
class IsAuthenticatedForWrite(BasePermission):
    def has_permission(self, request, view):
        if request.method == "GET":
            return True
        if request.method in ["POST","PUT","DELETE"]:
            return request.user.is_authenticated
        return False

class IsSuperuserForWrite(BasePermission):
    def has_permission(self, request, view):
        if request.method == "GET":
            return True
        if request.method in ["POST", "PUT", "DELETE"]:
            return request.user.is_authenticated and request.user.is_superuser
        return False
