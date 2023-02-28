from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.shortcuts import render

# Create your views here.
from .models import Profile
from .forms import UserProfileForm


@login_required
def profile_page(request):
    user = Profile.objects.get(user=request.user)
    form = UserProfileForm(request.POST or None, request.FILES or None, instance=user)
    if request.POST:
        if form.is_valid():
            instance = form.save()
            # we must not save form directly to use that form and send data with jsonresponse
            return JsonResponse({
                'bio': instance.bio,
                'avatar': instance.avatar.url,
                'user': instance.user.username
            })
    # if request is not Post (is Get) must send form to show it
    context = {
        'user': user,
        'form': form
    }
    return render(request, 'profile/main_user_profile.html', context)
