from .models import MunicipalitiesNl
from .serializers import MunicipalitiesNlSerializer
from rest_framework.generics import RetrieveUpdateAPIView, ListCreateAPIView
from .utils import extract_floats

class MunicipalitiesDetail(RetrieveUpdateAPIView):
    queryset = MunicipalitiesNl
    serializer_class = MunicipalitiesNlSerializer

class MunicipalitiesList(ListCreateAPIView):
    serializer_class = MunicipalitiesNlSerializer
    model = MunicipalitiesNl

    def get_queryset(self):
        municipalities = MunicipalitiesNl.objects.all()
        x_high_bound = float(self.request.query_params.get("x_high_bound"))
        y_high_bound = float(self.request.query_params.get("y_high_bound"))
        x_low_bound = float(self.request.query_params.get("x_low_bound"))
        y_low_bound = float(self.request.query_params.get("y_low_bound"))
        for i in municipalities:
            coordinates = extract_floats(i.geom_text)
            if not any(x_high_bound >= float(coordinates[j]) >= x_low_bound and y_high_bound >= float(
                    coordinates[j + 1]) >= y_low_bound
                       for j in range(len(coordinates))):
                print("Removing " + i.name)
                municipalities = municipalities.exclude(ogc_fid=i.ogc_fid)
        print(len(municipalities))
        return municipalities
