# Generated by Django 5.1.1 on 2024-10-09 19:41

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Tienda',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre_legal', models.CharField(max_length=255)),
                ('razon_social', models.CharField(blank=True, max_length=255, null=True)),
                ('ruc_cif_nit', models.CharField(max_length=50, unique=True)),
                ('sector', models.CharField(max_length=100)),
                ('tamano_empresa', models.CharField(max_length=100)),
                ('direccion_fisica', models.TextField()),
                ('telefono_principal', models.CharField(max_length=20)),
                ('correo_electronico', models.EmailField(max_length=254)),
                ('sitio_web', models.URLField(blank=True, null=True)),
            ],
        ),
    ]
