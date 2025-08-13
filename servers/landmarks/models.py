from django.db import models

class Landmark(models.Model):
    name = models.CharField(max_length=100)
    lat = models.FloatField()
    lon = models.FloatField()
    description = models.TextField()

    def __str__(self):
        return self.name
