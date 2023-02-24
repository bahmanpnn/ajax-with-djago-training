from django.contrib import admin
from .models import Post, PhotoPost


# Register your models here.
class PostsAdmin(admin.ModelAdmin):
    list_display = ['__str__', 'like_count']


admin.site.register(Post, PostsAdmin)
admin.site.register(PhotoPost)
