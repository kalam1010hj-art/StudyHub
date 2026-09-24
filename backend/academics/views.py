from rest_framework.views import APIView
from rest_framework.response import Response
from .models import  University,College,Degree,Branch,Subject,Semester,Resource,CollegeProgram
from .serializers import UniversitySerailizer,CollegeSerializer,DegreeSerializer,BranchSerializer,SubjectSerializer,SemesterSerializer,ResourceSerializer,MyResourceSerializer,CollegeProgramSerializer
from rest_framework.permissions import IsAdminUser,IsAuthenticated,IsAuthenticatedOrReadOnly,AllowAny
from django.db.models import ProtectedError
from .permissions import IsAdminForWrite,IsSuperuserForWrite,IsAuthenticatedForWrite
# Create your views here.

# Universtiy view created for get and post of univesity's

class UniversityView(APIView):
    permission_classes = [IsSuperuserForWrite]
    def get(self,request):
        universitys = University.objects.all()
        serializer  = UniversitySerailizer(universitys,many = True)
        return Response(serializer.data)

    
    # only authenticated user's are allowed to post , I will implement it later
    def post(self,request):
        serializer = UniversitySerailizer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=201)
        return Response(serializer.errors,status=400)

class UnviersityDetailsView(APIView):
    permission_classes = [IsSuperuserForWrite]
    def get(self,request,pk):
         try:
            university = University.objects.get(id = pk)
            serializer = UniversitySerailizer(university)
            return Response(serializer.data)
         except University.DoesNotExist:
              return Response({"error":"Emo bro university leadu!"})

    def delete(self,request,pk):
        try:
            university = University.objects.get(id = pk)
            university.delete()
            return Response(status=204)
        except University.DoesNotExist:
            return Response({"erorr":"No University present! or already deleted"})
    def put(self,request,pk):
        try:  
            university = University.objects.get(id = pk)
            serializer = UniversitySerailizer(university,data = request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors,status=404)
        except University.DoesNotExist:
                    return Response({"erorr":"No University present!"})
    
            

class CollegeView(APIView):
     permission_classes = [IsSuperuserForWrite]
     def get(self,request):
        colleges = College.objects.all()
        university_id = request.query_params.get("university")
        if university_id:
            try:
                colleges = College.objects.filter(university_id = university_id)
                university = University.objects.get(id=university_id)
                collegeSerializer = CollegeSerializer(colleges,many = True)
                universitySerializer = UniversitySerailizer(university)
                return Response({"colleges":collegeSerializer.data,"university":universitySerializer.data})
            except University.DoesNotExist:
                return Response({"error":"No university present"},status=404)

        serializer = CollegeSerializer(colleges,many = True)
        return Response(serializer.data)
     def post(self,request):
          serializer = CollegeSerializer(data = request.data)
          if serializer.is_valid():
               serializer.save()
               return Response(serializer.data,status=201)
          return Response(serializer.errors,status=400)

class CollegeDetailsView(APIView):
        permission_classes = [IsSuperuserForWrite]
        def get(self,request,pk):
            try:
                college  = College.objects.get(id = pk)
                serializer = CollegeSerializer(college)
                return Response(serializer.data)
            except College.DoesNotExist:
                 return Response({"error":"No College found"},status=404)

        def put(self,request,pk):
             try:
                college  = College.objects.get(id = pk)
                serializer = CollegeSerializer(college,data = request.data)
                if serializer.is_valid():
                     serializer.save()
                     return Response(serializer.data)
                return Response(serializer.errors,status=400)
             except College.DoesNotExist:
                  return Response({"error":"OBJECT NOT FOUND BRO!"},status=400)
        def delete(self,request,pk):
             try:
                  college  = College.objects.get(id = pk)
                  college.delete()
                  return Response(status=204)
             except College.DoesNotExist:
                               return Response({"error":"OBJECT NOT FOUND BRO!"},status=404)
             
                  
        
class DegreeView(APIView):
    permission_classes = [IsSuperuserForWrite]

    def get(self, request):
        degrees = Degree.objects.all()
        serializer = DegreeSerializer(degrees, many=True)
        collegeId = request.query_params.get("collegeId")
        if collegeId:
            try:
                college = College.objects.get(id = collegeId)
                degrees = Degree.objects.filter(college_id=collegeId)
                degreeSerializer = DegreeSerializer(degrees,many = True)
                collegeSerializer = CollegeSerializer(college)
                return Response({
                    "college":collegeSerializer.data,
                    "degrees":degreeSerializer.data
                    })
            except College.DoesNotExist:
                return Response({"error":"No college exits"},status=404)
            
        return Response(serializer.data)

    def post(self, request):
        serializer = DegreeSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)


class DegreeDetailsView(APIView):
    permission_classes = [IsSuperuserForWrite]

    def get(self, request, pk):
        try:
            degree = Degree.objects.get(id=pk)
            serializer = DegreeSerializer(degree)
            return Response(serializer.data)

        except Degree.DoesNotExist:
            return Response(
                {"error": "No Degree found"},
                status=404
            )

    def put(self, request, pk):
        try:
            degree = Degree.objects.get(id=pk)
            serializer = DegreeSerializer(
                degree,
                data=request.data
            )

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)

            return Response(serializer.errors, status=400)

        except Degree.DoesNotExist:
            return Response(
                {"error": "No Degree found"},
                status=404
            )

    def delete(self, request, pk):
        try:
            degree = Degree.objects.get(id=pk)
            degree.delete()
            return Response(status=204)

        except Degree.DoesNotExist:
            return Response(
                {"error": "No Degree found"},
                status=404
            )
class BranchView(APIView):
    permission_classes = [IsAdminForWrite]

    def get(self, request):
        degreeId = request.query_params.get("degreeId")
        branches = Branch.objects.all()
        serializer = BranchSerializer(branches, many=True)
        if degreeId:
            try:
                degree = Degree.objects.get(id=degreeId)
                branches = degree.branches.all()
                degreeSerializer = DegreeSerializer(degree)
                branchSerializer = BranchSerializer(branches,many = True)
                return Response({
                    "branches":branchSerializer.data,
                    "degree":degreeSerializer.data
                    })
            except Degree.DoesNotExist:
                return Response({"error":"Not found"},status=404)

        
        return Response(serializer.data)

    def post(self, request):
        serializer = BranchSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)


class BranchDetailsView(APIView):
    permission_classes = [IsAdminForWrite]

    def get(self, request, pk):
        try:
            branch = Branch.objects.get(id=pk)
            serializer = BranchSerializer(branch)
            return Response(serializer.data)

        except Branch.DoesNotExist:
            return Response(
                {"error": "No Branch found"},
                status=404
            )

    def put(self, request, pk):
        try:
            branch = Branch.objects.get(id=pk)
            serializer = BranchSerializer(
                branch,
                data=request.data
            )

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)

            return Response(serializer.errors, status=400)

        except Branch.DoesNotExist:
            return Response(
                {"error": "No Branch found"},
                status=404
            )

    def delete(self, request, pk):
        try:
            branch = Branch.objects.get(id=pk)
            branch.delete()
            return Response(status=204)

        except Branch.DoesNotExist:
            return Response(
                {"error": "No Branch found"},
                status=404
            )
        except ProtectedError:
            return Response(
                {"error": "This branch cannot be deleted because it has resources that depend on it."},
                status=409
            )

class SubjectView(APIView):
    permission_classes = [IsAdminForWrite]

    def get(self, request):
        semesterId = request.query_params.get("semesterId")
        subjects = Subject.objects.all()
        serializer = SubjectSerializer(subjects, many=True)
        if semesterId:
            try:
                semester = Semester.objects.get(id = semesterId)
                subjects = Subject.objects.filter(semester_id = semesterId)
                semesterSerializer = SemesterSerializer(semester)
                subjectsSerializer = SubjectSerializer(subjects,many = True)
                semester = semesterSerializer.data
                return Response({"semester":semester,"subject":subjectsSerializer.data})
            except Semester.DoesNotExist:
                return Response({"error":"Got an erorr"},status=404)

        return Response(serializer.data)

    def post(self, request):
        serializer = SubjectSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)


class SubjectDetailsView(APIView):
    permission_classes = [IsAdminForWrite]

    def get(self, request, pk):
        try:
            subject = Subject.objects.get(id=pk)
            serializer = SubjectSerializer(subject)
            return Response(serializer.data)

        except Subject.DoesNotExist:
            return Response(
                {"error": "No Subject found"},
                status=404
            )

    def put(self, request, pk):
        try:
            subject = Subject.objects.get(id=pk)
            serializer = SubjectSerializer(
                subject,
                data=request.data
            )

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)

            return Response(serializer.errors, status=400)

        except Subject.DoesNotExist:
            return Response(
                {"error": "No Subject found"},
                status=404
            )

    def delete(self, request, pk):
        try:
            subject = Subject.objects.get(id=pk)
            subject.delete()
            return Response(status=204)

        except Subject.DoesNotExist:
            return Response(
                {"error": "No Subject found"},
                status=404
            )
        except ProtectedError:
            return Response(
                {"error": "This subject cannot be deleted because resources are attached to it."},
                status=409
            )

class SemesterView(APIView):
    permission_classes = [IsAdminForWrite]

    def get(self, request):
        branchId = request.query_params.get("branchId")
        semesters = Semester.objects.all()
        serializer = SemesterSerializer(semesters, many=True)
        if branchId:
            try:
                branch = Branch.objects.get(id = branchId)
                semesters = Semester.objects.filter(branch_id = branchId)
                branchSerializer = BranchSerializer(branch)
                semSerializer = SemesterSerializer(semesters,many = True)
                return Response({"branch":branchSerializer.data,"semesters":semSerializer.data})
            except Branch.DoesNotExist:
                return Response({"error":"No Branch found with that branchID"},status=404)
        return Response(serializer.data)

    def post(self, request):
        serializer = SemesterSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)


class SemesterDetailsView(APIView):
    permission_classes = [IsAdminForWrite]

    def get(self, request, pk):
        try:
            semester = Semester.objects.get(id=pk)
            serializer = SemesterSerializer(semester)
            return Response(serializer.data)

        except Semester.DoesNotExist:
            return Response(
                {"error": "No Semester found"},
                status=404
            )

    def put(self, request, pk):
        try:
            semester = Semester.objects.get(id=pk)
            serializer = SemesterSerializer(
                semester,
                data=request.data
            )

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)

            return Response(serializer.errors, status=400)

        except Semester.DoesNotExist:
            return Response(
                {"error": "No Semester found"},
                status=404
            )

    def delete(self, request, pk):
        try:
            semester = Semester.objects.get(id=pk)
            semester.delete()
            return Response(status=204)

        except Semester.DoesNotExist:
            return Response(
                {"error": "No Semester found"},
                status=404
            )
        except ProtectedError:
            return Response(
                {"error": "This semester cannot be deleted because it contains subjects with resources."},
                status=409
            )


class ResourceView(APIView):

    permission_classes = [IsAuthenticatedForWrite]

    def get(self, request):
        subjectId = request.query_params.get("subjectId")
        if subjectId:
            print("Excecuted")
            try:
                subject = Subject.objects.get(id = subjectId)
                resources = Resource.objects.filter(subject_id = subjectId)
                subjectSerializer  = SubjectSerializer(subject)
                resourceSerializer = ResourceSerializer(resources,many = True)
                return Response({
                                "subject":subjectSerializer.data,
                                "resources":resourceSerializer.data
                                })
            except Subject.DoesNotExist:
                return Response({"erorr":" subject not present"},status=404)

        resources = Resource.objects.all()
        serializer = ResourceSerializer(resources, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ResourceSerializer(data=request.data)

        if serializer.is_valid():
            print(serializer.validated_data)
            serializer.save(uploaded_by=request.user)
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)


class MyUploadsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        resources = (
            Resource.objects
            .filter(uploaded_by=request.user)
            .select_related("subject")
            .order_by("-created_at")
        )

        serializer = MyResourceSerializer(resources, many=True)
        return Response(serializer.data)


class ResourceDetailsView(APIView):

    def get(self, request, pk):
        try:
            resource = Resource.objects.get(id=pk)
            serializer = ResourceSerializer(resource)
            return Response(serializer.data)

        except Resource.DoesNotExist:
            return Response(
                {"error": "No Resource found"},
                status=404
            )

    def put(self, request, pk):
        try:
            resource = Resource.objects.get(id=pk)

            serializer = ResourceSerializer(
                resource,
                data=request.data
            )

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)

            return Response(serializer.errors, status=400)

        except Resource.DoesNotExist:
            return Response(
                {"error": "No Resource found"},
                status=404
            )

    def delete(self, request, pk):
        try:
            resource = Resource.objects.get(id=pk)
            resource.delete()
            return Response(status=204)

        except Resource.DoesNotExist:
            return Response(
                {"error": "No Resource found"},
                status=404
            )


class CollegeProgramView(APIView):
    permission_classes = [IsSuperuserForWrite]
    def get(self, request):
        programs = CollegeProgram.objects.all()
        serializer = CollegeProgramSerializer(programs, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CollegeProgramSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)


class CollegeProgramDetailsView(APIView):
    permission_classes = [IsSuperuserForWrite]
    def get(self, request, pk):
        try:
            program = CollegeProgram.objects.get(id=pk)
            serializer = CollegeProgramSerializer(program)
            return Response(serializer.data)

        except CollegeProgram.DoesNotExist:
            return Response(
                {"error": "College Program not found"},
                status=404
            )

    def put(self, request, pk):
        try:
            program = CollegeProgram.objects.get(id=pk)

            serializer = CollegeProgramSerializer(
                program,
                data=request.data
            )

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)

            return Response(serializer.errors, status=400)

        except CollegeProgram.DoesNotExist:
            return Response(
                {"error": "College Program not found"},
                status=404
            )

    def delete(self, request, pk):
        try:
            program = CollegeProgram.objects.get(id=pk)
            program.delete()
            return Response(status=204)

        except CollegeProgram.DoesNotExist:
            return Response(
                {"error": "College Program not found"},
                status=404
            )

# used to get all enity of universities,clg,degree,branch,sem and subject for uploading resource
class Academic_directory(APIView):
    def get(self,request):
        universites = University.objects.all()
        colleges    = College.objects.all()
        programs    = Degree.objects.all()
        branches    = Branch.objects.all()
        semesters   = Semester.objects.all()
        subjects    = Subject.objects.all()

        universitySerializer = UniversitySerailizer(universites,many = True)
        collegeSerializer    = CollegeSerializer(colleges,many = True)
        programSerializer   = DegreeSerializer(programs,many = True)
        brancheSerializer       = BranchSerializer(branches,many = True)
        semesterSerializer   =SemesterSerializer(semesters,many =True)
        subjectSerializer = SubjectSerializer(subjects,many = True)

        return Response({
            "universities":universitySerializer.data,
            "colleges":collegeSerializer.data,
            "programs":programSerializer.data,
            "branches":brancheSerializer.data,
            "semesters":semesterSerializer.data,
            "subjects" :subjectSerializer.data
        })

