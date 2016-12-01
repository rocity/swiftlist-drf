from django.contrib import admin

from todo.models import List, Item

# Register your models here.
class ListAdmin(admin.ModelAdmin):
    '''
        Admin View for List
    '''
    list_display = ('title', 'status', 'created')

class ItemAdmin(admin.ModelAdmin):
    '''
        Admin View for Item
    '''
    list_display = ('item_list', 'text', 'done', 'created')
    raw_id_fields = ('item_list',)

admin.site.register(Item, ItemAdmin)
admin.site.register(List, ListAdmin)