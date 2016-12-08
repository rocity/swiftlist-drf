from django.contrib import admin

from todo.models import List, Item

class ItemInline(admin.TabularInline):
    model = Item

class ListAdmin(admin.ModelAdmin):
    '''
        Admin View for List
    '''
    list_display = ('title', 'status', 'created')
    inlines = [
        ItemInline,
    ]

class ItemAdmin(admin.ModelAdmin):
    '''
        Admin View for Item
    '''
    list_display = ('item_list', 'text', 'done', 'created')
    raw_id_fields = ('item_list',)

admin.site.register(Item, ItemAdmin)
admin.site.register(List, ListAdmin)