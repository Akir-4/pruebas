# Generated by Django 5.1.1 on 2024-10-22 20:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('productos', '0013_producto_precio_ofertado'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='producto',
            name='precio_inicial',
        ),
        migrations.RemoveField(
            model_name='producto',
            name='precio_ofertado',
        ),
    ]
