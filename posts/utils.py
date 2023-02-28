from django.shortcuts import redirect
from django.urls import reverse

from posts.models import Post
from profiles.models import Profile


def action_permission(func):
    def wrapper(request, **kwargs):
        # func=delete post that get target post-> delete_post(request,pk)->**kwargs=pk
        pk = kwargs.get('pk')
        profile = Profile.objects.get(user=request.user)
        post = Post.objects.get(pk=pk)
        if profile.user == post.author.user:
            return func(request, **kwargs)
        else:
            print('no')
            return redirect(reverse('post-list'))
            # this redirect when occur that we write url in address by hand not btn.if click on
            # btn function do like main author but post dont delete!

    return wrapper