# Generated by Django 5.1.1 on 2024-10-26 00:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('compras', '0009_rename_producto_id_subasta_producto_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='subasta',
            old_name='producto',
            new_name='producto_id',
        ),
        migrations.RenameField(
            model_name='subasta',
            old_name='tienda',
            new_name='tienda_id',
        ),
    ]
