from .models import Profile
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

'''
profile and user are models that we want to connect.
post_save is signal model that we want to connect models in that momemnt.
there are 2 ways to use signals.receiver is one way to use signals with this decorator.
after setting this method we must register signals in apps.py
'''


@receiver(post_save, sender=User)
def create_profile_with_user_post_save(sender, instance, created, *args, **kwargs):
    print(sender)  # <class 'django.contrib.auth.models.User'> ->sender
    print(instance)  # username(bahman) ->instance
    if created:
        Profile.objects.create(user=instance)
