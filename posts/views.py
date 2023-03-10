from django.contrib.auth import login, logout
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render, redirect
from django.core import serializers
# Create your views here.
from django.urls import reverse
from django.views import View

from posts.models import Post, PhotoPost
from .forms import AddPostForm
from profiles.models import Profile
# decorators
from django.contrib.auth.decorators import login_required
from .utils import action_permission


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
# def send_data_two(request,n_post):
# except kwargs we can use n_post directly but for more learning and exprience i use **kwargs
@login_required
def send_data_two(request, **kwargs):
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


@login_required
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
    return redirect(reverse('posts'))


@login_required
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


@login_required
def detail_post(request, pk):
    post = Post.objects.get(pk=pk)
    form = AddPostForm()
    context = {
        'form': form,
        'post': post
    }
    return render(request, 'posts/detail_post.html', context)


@login_required
def detail_post_data(request, pk):
    post = Post.objects.get(pk=pk)
    data = {
        'id': post.id,
        'title': post.title,
        'body': post.body,
        'author': post.author.user.username,
        'logged_in': request.user.username
    }
    return JsonResponse({'data': data})


@login_required
@action_permission
def update_post(request, pk):
    if request.POST:
        target_post = Post.objects.get(pk=pk)
        new_title = request.POST.get('title')
        new_body = request.POST.get('body')
        target_post.title = new_title
        target_post.body = new_body
        target_post.save()
        return JsonResponse({'title': new_title, 'body': new_body, 'status': 'post updated'})
    return redirect(reverse('posts'))


@login_required
@action_permission
def delete_post(request, pk):
    if request.POST:
        target_post = Post.objects.get(pk=pk)
        target_post.delete()
        return JsonResponse({'status': 'post deleted!!'})
    return JsonResponse({'status': 'access denied!!'})


# @login_required
def image_upload(request):
    print(request.FILES)
    # if request.POST:
    if request.method == 'POST':
        img = request.FILES.get('file')
        new_post_id = request.POST.get('new_post_id')
        target_post = Post.objects.get(id=new_post_id)
        PhotoPost.objects.create(image=img, post=target_post)
    return HttpResponse('error')


class LogoutView(View):
    def get(self, request):
        logout(request)
        return redirect(reverse('post-list'))
