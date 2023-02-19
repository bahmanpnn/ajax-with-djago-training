from django.http import JsonResponse
from django.shortcuts import render
from django.core import serializers
# Create your views here.
from posts.models import Post
from .forms import AddPostForm
from profiles.models import Profile


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


# -------------------------------------------------------------------------
# main project

# send object-array
def send_data_two(request, **kwargs):
    # except kwargs we can use n_post straight but for more learning and exprience i use **kwargs
    n_post = kwargs.get('n_post')
    visible = 3
    upper = n_post
    lower = upper - visible
    posts = Post.objects.all()
    size = posts.count()
    data = []
    for post in posts:
        item = {
            'id': post.id,
            'body': post.body,
            'title': post.title,
            'liked': True if request.user in post.liked.all() else False,
            'count': post.like_count,
            'author': post.author.user.username
        }
        data.append(item)
    return JsonResponse({
        'data': data[lower:upper], 'size': size
    })


def like_unlike_post(request):
    if request.POST:
        pk = request.POST.get('pk')
        target_post = Post.objects.get(pk=pk)
        if request.user in target_post.liked.all():
            liked = False
            target_post.liked.remove(request.user)
        else:
            liked = True
            target_post.liked.add(request.user)
        return JsonResponse({'liked': liked, 'count': target_post.like_count})


def posts(request):
    form = AddPostForm(request.POST or None)
    if request.POST:
        if form.is_valid():
            # if request.user.is_authenticated:
            author = Profile.objects.get(user=request.user)
            instance = form.save(commit=False)
            instance.author = author
            instance.save()
            return JsonResponse({
                'title': instance.title,
                'body': instance.body,
                'author': instance.author.user.username,
                'id': instance.id,
            })
    context = {
        'form': form
    }
    return render(request, 'posts/posts(main).html', context)
