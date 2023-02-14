from django.urls import path
# from .views import *
from .views import (post_list, hello_data, send_data_one, send_data_two, posts)

# app_name = 'posts'
urlpatterns = [
    path('', post_list, name='post-list'),
    path('hello-data', hello_data, name='hello-data'),
    path('send-data-one', send_data_one, name='send-data-one'),
    path('send-data-two', send_data_two, name='send-data-two'),
    path('posts', posts, name='posts'),

]
