from django.http import JsonResponse
from django.shortcuts import render
from django.core import serializers
# Create your views here.
from posts.models import Post


def post_list(request):
    posts = Post.objects.all()
    return render(request, 'posts/post.html', {
        'posts': posts
    })


def hello_data(request):
    posts = list(Post.objects.values())
    return JsonResponse({
        'posts': posts
    })


# send object-json(dic)
def send_data_one(request):
    posts = Post.objects.all()
    data = serializers.serialize('json', posts)
    return JsonResponse({
        'posts': data
    })


# send object-array
def send_data_two(request):
    posts = Post.objects.all()
    data = []
    for post in posts:
        item = {
            'id': post.id,
            'body': post.body,
            'title': post.title,
            'author': post.author.user.username
        }
        data.append(item)
    return JsonResponse({
        'data': data
    })
