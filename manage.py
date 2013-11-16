#!/usr/bin/env python
import os
import sys

if __name__ == "__main__":
<<<<<<< HEAD
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "fb_crm.settings")
=======
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "hellodjango.settings")
>>>>>>> 7d05c2c6fedb34b589688aa10ca9d7b75ec31866

    from django.core.management import execute_from_command_line

    execute_from_command_line(sys.argv)
