# SWAPI Backend - Serverless API

Este proyecto es un backend serverless desarrollado con AWS Lambda, DynamoDB y Serverless Framework. Su objetivo es ofrecer un conjunto de APIs que interactúan con la [API de Star Wars (SWAPI)](https://swapi.py4e.com/), traduciendo los datos obtenidos y almacenándolos en DynamoDB.

## Requisitos previos

- Node.js 18.x
- Serverless Framework (`npm install -g serverless`)
- AWS CLI configurado
- DynamoDB local (si deseas ejecutar DynamoDB localmente)

## Instalación

1. Clona el repositorio.
2. Instala las dependencias:

   ```bash
   npm install


serverless offline --stage dev --httpPort 4000


APIs disponibles
1. Crear Personaje
Descripción: Crea un personaje obteniendo datos de la API de SWAPI, traduce los atributos y los almacena en DynamoDB.

Método: POST

URL: http://localhost:4000/dev/personajes

Body: 
{
  "id": "1"
}

Respuesta exitosa:

{
  "message": "Personaje creado",
  "personaje": {
    "nombre": "Luke Skywalker",
    "altura": "172",
    "masa": "77",
    "colorCabello": "blond",
    "colorPiel": "fair",
    "colorOjos": "blue",
    "anioNacimiento": "19BBY",
    "genero": "male"
  }
}

2. Obtener Personajes
Descripción: Devuelve todos los personajes almacenados en DynamoDB.

Método: GET
URL: http://localhost:4000/dev/personajes
Respuesta exitosa:
{
  "personajes": [
    {
      "id": "some-uuid",
      "nombre": "Luke Skywalker",
      "altura": "172",
      "masa": "77",
      "colorCabello": "blond",
      "colorPiel": "fair",
      "colorOjos": "blue",
      "anioNacimiento": "19BBY",
      "genero": "male"
    }
  ]
}

3. Obtener Personaje por ID
Descripción: Obtiene un personaje específico de DynamoDB usando su ID.

Método: GET
URL: http://localhost:4000/dev/personajes/{id}
Respuesta exitosa:
{
  "id": "some-uuid",
  "nombre": "Luke Skywalker",
  "altura": "172",
  "masa": "77",
  "colorCabello": "blond",
  "colorPiel": "fair",
  "colorOjos": "blue",
  "anioNacimiento": "19BBY",
  "genero": "male"
}

4. Actualizar Personaje
Descripción: Actualiza los detalles de un personaje existente en DynamoDB.

Método: PUT

URL: http://localhost:4000/dev/personajes/{id}

Body:
{
  "altura": "175",
  "masa": "80"
}
Respuesta exitosa:
{
  "message": "Personaje actualizado",
  "personaje": {
    "id": "some-uuid",
    "nombre": "Luke Skywalker",
    "altura": "175",
    "masa": "80",
    "colorCabello": "blond",
    "colorPiel": "fair",
    "colorOjos": "blue",
    "anioNacimiento": "19BBY",
    "genero": "male"
  }
}

5. Eliminar Personaje
Descripción: Elimina un personaje de DynamoDB usando su ID.

Método: DELETE
URL: http://localhost:4000/dev/personajes/{id}
Respuesta exitosa:
{
  "message": "Personaje eliminado"
}