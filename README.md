<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


# Teslo API

1. Clonar proyecto
2. ```yarn install```
3. Clonar el archivo ```.env.template``` y renombrarlo a ```.env```
4. Cambiar las variables de entorno
5. Levantar la base de datos
```
docker-compose up -d
```

6. Levantar: ```yarn start:dev```

7. Ejecutar SEED 
```
http://localhost:3000/api/seed
```

8. Dockerizar el proyecto

docker build -t imageback .

9. Probar la Dockerización

docker run -p80:3000 nest-cloud-run


# Docker Compose

## Build - Dev
docker-compose -f docker-compose.dev.yml --env-file .env.dev up --build

## Build - Prod
docker-compose -f docker-compose.prod.yml --env-file .env.prod up --build

## Run - Dev
docker-compose -f docker-compose.dev.yml --env-file .env.dev up

## Run - Dev With Port 80
docker run --env-file=.env.dev -p 80:4000 nest-back-dev

## Run - Dev With Remote Docker
docker run --env-file=.env.prod oalvaradoc/nest-back-prod:1.0.0

## Run - Prod
docker-compose -f docker-compose.prod.yml --env-file .env.prod up

## Nota
Por defecto, __docker-compose__ usa el archivo ```.env```, por lo que si tienen el archivo .env y lo configuran con sus variables de entorno de producción, bastaría con
```
docker-compose -f docker-compose.prod.yml up --build
```

## Cambiar nombre
```
docker tag <nombre app> <usuario docker hub>/<nombre repositorio>
```
Ingresar a Docker Hub
```
docker login
```

Subir imagen
```
docker push <usuario docker hub>/<nombre repositorio>

```

## Para Despliegues

https://github.com/electerious/Ackee/blob/master/docs/Get%20started.md#2-configure-ackee-1

## Comando Nest para Generar nuevos path

nest g res categoria --no-spec


