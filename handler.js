const AWS = require('aws-sdk');
const axios = require('axios');
const uuid = require('uuid');

const isOffline = process.env.IS_OFFLINE;
const dynamoDb = new AWS.DynamoDB.DocumentClient({
    region: 'us-east-1',
    endpoint: isOffline ? 'http://localhost:8000' : undefined
  });
const swapiBaseUrl = 'https://swapi.py4e.com/api';

function traducirAtributos(personaje) {
  return {
    nombre: personaje.name,
    altura: personaje.height,
    masa: personaje.mass,
    colorCabello: personaje.hair_color,
    colorPiel: personaje.skin_color,
    colorOjos: personaje.eye_color,
    anioNacimiento: personaje.birth_year,
    genero: personaje.gender
  };
}

module.exports.crearPersonaje = async (event) => {
  try {
    const { id } = JSON.parse(event.body);
    const swapiResponse = await axios.get(`${swapiBaseUrl}/people/${id}`);
    const personajeTraducido = traducirAtributos(swapiResponse.data);

    const params = {
      TableName: process.env.TABLE_NAME,
      Item: {
        id: uuid.v4(),
        ...personajeTraducido
      }
    };
    await dynamoDb.put(params).promise();

    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'Personaje creado', personaje: personajeTraducido })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error al crear el personaje', error: error.message })
    };
  }
};

module.exports.actualizarPersonaje = async (event) => {
    try {
      const { id } = event.pathParameters;
      const { nombre, altura, masa, colorCabello, colorPiel, colorOjos, anioNacimiento, genero } = JSON.parse(event.body);
  
      const params = {
        TableName: process.env.TABLE_NAME,
        Key: { id },
        UpdateExpression: 'set nombre = :nombre, altura = :altura, masa = :masa, colorCabello = :colorCabello, colorPiel = :colorPiel, colorOjos = :colorOjos, anioNacimiento = :anioNacimiento, genero = :genero',
        ExpressionAttributeValues: {
          ':nombre': nombre,
          ':altura': altura,
          ':masa': masa,
          ':colorCabello': colorCabello,
          ':colorPiel': colorPiel,
          ':colorOjos': colorOjos,
          ':anioNacimiento': anioNacimiento,
          ':genero': genero
        },
        ReturnValues: 'ALL_NEW'
      };
  
      const result = await dynamoDb.update(params).promise();
  
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Personaje actualizado', personaje: result.Attributes })
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Error al actualizar el personaje', error: error.message })
      };
    }
  };

module.exports.eliminarPersonaje = async (event) => {
    try {
      const { id } = event.pathParameters;
  
      const params = {
        TableName: process.env.TABLE_NAME,
        Key: { id }
      };
  
      await dynamoDb.delete(params).promise();
  
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Personaje eliminado' })
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Error al eliminar el personaje', error: error.message })
      };
    }
};

module.exports.obtenerPersonajes = async () => {
  try {
    const params = {
      TableName: process.env.TABLE_NAME
    };
    const data = await dynamoDb.scan(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ personajes: data.Items })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error al obtener los personajes', error: error.message })
    };
  }
};