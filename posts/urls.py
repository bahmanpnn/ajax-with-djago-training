from django.urls import path
# from .views import *
from .views import (post_list, hello_data, send_data_one, send_data_two, posts,
                    like_unlike_post, detail_post, detail_post_data, update_post, delete_post,
                    image_upload, LogoutView)

# app_name = 'posts'
urlpatterns = [
    path('', post_list, name='post-list'),
    path('logout', LogoutView.as_view(), name='logout'),
    path('like_unlike', like_unlike_post, name='like_unlike'),
    path('hello-data', hello_data, name='hello-data'),
    path('send-data-one', send_data_one, name='send-data-one'),
    # path('send-data-two', send_data_two, name='send-data-two'),
    path('send-data-two/<int:n_post>', send_data_two, name='send-data-two'),
    path('posts', posts, name='posts'),
    path('image-upload', image_upload, name='image-upload'),
    path('posts/<int:pk>', detail_post, name='detail-post'),
    path('posts/<int:pk>/data', detail_post_data, name='detail-post-data'),
    path('posts/<int:pk>/update', update_post, name='update-post'),
    path('posts/<int:pk>/delete', delete_post, name='delete-post'),

]
