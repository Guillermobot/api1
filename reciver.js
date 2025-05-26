var AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });

var sqs = new AWS.SQS({ apiVersion: "2012-11-05" });
var queueURL = "https://sqs.us-east-1.amazonaws.com/823681268597/ProyectoFinal";

var params = {
  AttributeNames: ["SentTimestamp"],
  MaxNumberOfMessages: 10,
  MessageAttributeNames: ["All"],
  QueueUrl: queueURL,
  VisibilityTimeout: 20,
  WaitTimeSeconds: 0,
};

// Importamos el módulo server.js para agregar jugadores
const { agregarJugador } = require("./rutas");

function receive() {
  sqs.receiveMessage(params, function (err, data) {
    if (err) {
      console.log("Receive Error", err);
    } else if (data.Messages && data.Messages.length > 0) {
      data.Messages.forEach((message) => {
        console.log(`Mensaje recibido: ${message.Body}`);

        // Parseamos el mensaje (JSON string)
        const jugador = JSON.parse(message.Body);

        // Guardamos jugador en arreglo
        agregarJugador(jugador);

        // Eliminamos el mensaje para que no se procese otra vez
        const deleteParams = {
          QueueUrl: queueURL,
          ReceiptHandle: message.ReceiptHandle,
        };
        sqs.deleteMessage(deleteParams, (err, data) => {
          if (err) {
            console.log("Delete Error", err);
          } else {
            console.log("Mensaje eliminado de la cola SQS");
          }
        });
      });
    } else {
      console.log("No messages received");
    }
  });
}

// Exportamos la función para que se use desde server.js
module.exports = function iniciarReceiver() {
  console.log("Iniciando escucha de SQS...");
  setInterval(receive, 5000);
};
