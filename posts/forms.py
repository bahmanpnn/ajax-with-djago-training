from django import forms
from .models import Post


class AddPostForm(forms.ModelForm):
    # title = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control'}))
    # body = forms.CharField(widget=forms.Textarea(attrs={'class': 'form-control', 'rows': 3}))
    # if we dont mark them they load first and before crispy using
    class Meta:
        model = Post
        # fields = ['title', 'body'] ->it does not matter with [] or ()
        fields = ('title', 'body')
