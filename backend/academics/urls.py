from django.urls import path
from .views import UniversityView,UnviersityDetailsView,CollegeDetailsView,CollegeView,DegreeView,DegreeDetailsView,BranchView,BranchDetailsView,SemesterView,SemesterDetailsView,SubjectView,SubjectDetailsView,ResourceDetailsView,ResourceView,MyUploadsView,CollegeProgramDetailsView,CollegeProgramView,Academic_directory
urlpatterns = [
    path('university',UniversityView.as_view()),
    path('university/<int:pk>',UnviersityDetailsView.as_view()),

    path('college',CollegeView.as_view()),
    path('college/<int:pk>',CollegeDetailsView.as_view()),

    path('degree',DegreeView.as_view()),
    path('degree/<int:pk>',DegreeDetailsView.as_view()),

    path('branch',BranchView.as_view()),
    path('branch/<int:id>',BranchDetailsView.as_view()),

    path('sem',SemesterView.as_view()),
    path("sem/<int:id>",SemesterDetailsView.as_view()),

    path('subject',SubjectView.as_view()),
    path('subject/<int:id>',SubjectDetailsView.as_view()),

    path('resource',ResourceView.as_view()),
    path('resource/<int:pk>',ResourceDetailsView.as_view()),
    path('my-uploads', MyUploadsView.as_view()),


    path('collegeprogram',CollegeProgramView.as_view()),
    path('collegeprogram/<int:pk>',CollegeProgramDetailsView.as_view()),

    path('directory',Academic_directory.as_view())

]
