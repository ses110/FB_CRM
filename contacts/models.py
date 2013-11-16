from django.db import models

# Create your models here.
class Contact(models.Model):
	name = models.CharField(max_length = 200)
	tag = models.CharField(max_length = 200)
	source = [1, 0, 0, 0]

	def __unicode__(self):
		return self.name

	def is_new(self):
		source = [1, 0, 0, 0]
		return self

	def is_in_dev(self):
		source = [0, 1, 0, 0]
		return self

	def is_resolved(self):
		source = [0, 0, 1, 0]
		return self

	def is_notify(self):
		source = [0, 0, 0, 1]
		return self