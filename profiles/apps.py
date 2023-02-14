from django.apps import AppConfig


class ProfilesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'profiles'

    def ready(self):
        import profiles.signals
        #after register signals in apps.py we must jump to init__.py and set default app
        # configuration!!
