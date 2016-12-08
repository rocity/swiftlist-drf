from django.db import models

# Create your models here.
class List(models.Model):
    """ List Model
    """

    STATUSES = (
            ('active', 'Active'),
            ('archived', 'Archived'),
            ('deleted', 'Deleted'),
        )

    title = models.CharField(max_length=250)
    description = models.TextField(null=True, blank=True)
    status = models.CharField(max_length=50, choices=STATUSES)

    modified = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '{}'.format(self.title)

class Item(models.Model):
    """ Item Model (fk to List)
    """

    item_list = models.ForeignKey(List)
    text = models.CharField(max_length=250)
    done = models.BooleanField(default=False)

    modified = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '{} - {}'.format(self.text, self.done)
