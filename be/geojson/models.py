from django.db import models

class MunicipalitiesNl(models.Model):
    ogc_fid = models.AutoField(primary_key=True)
    name = models.CharField(blank=True, null=True)
    geom_text = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'municipalities_nl'
        ordering=['ogc_fid']

    def __str__(self):
        return self.name