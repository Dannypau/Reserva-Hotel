# Proyecto de Software 2

# Integrantes:

- `Homero Arias`
- `Juan Erazo`
- `Alexandra Granda`
- `Daniela Ramos`

# Deploy con HEROKU

Push en Heroku:

```
git push heroku master
```

Deploy en Heroku
```
heroku ps:scale web=1
```

Visualizar
```
heroku open
```

Acceder a la base de datos
```
heroku pg:psql postgresql-rectangular-92584 --app hotel-sw2
```

#Variable de entorno
Obtener la variable de entorno para configurar el .env
```
heroku config -s | grep HEROKU_POSTGRESQL
```
