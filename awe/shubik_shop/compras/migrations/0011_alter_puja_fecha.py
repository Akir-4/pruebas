# Generated by Django 5.1.1 on 2024-10-26 02:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('compras', '0010_rename_producto_subasta_producto_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='puja',
            name='fecha',
            field=models.DateTimeField(),
        ),
    ]
