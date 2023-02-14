from django.shortcuts import render

# Create your views here.
from posts.models import Post


def post_list(request):
    posts = Post.objects.all()
    return render(request, 'posts/post.html', {
        'posts': posts
    })
