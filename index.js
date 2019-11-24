'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const io = require('socket.io');
const config = require('./config')

mongoose.connect(config.db, (err, res) => {
  if (err) {
    return console.log(`Error al conectar a la base de datos: ${err}`)
  }
  console.log('Conexión a la base de datos establecida...')

  
  let socket = io.listen(
    app.listen(config.port, () => {
      console.log(`API REST corriendo en http://localhost:${config.port}`)
    })
  );
  
  socket.on('connection', function(client) {
    client.send("nueva conexion");
    client.broadcast.send("nueva conexion");

    client.on('cam_tarjeta', function(tarjeta) {
      console.log(tarjeta)
      client.emit('cam_tarjeta', tarjeta);
      client.broadcast.emit('cam_tarjeta', tarjeta);
    });

    client.on('message', function(msg) {
        console.log(msg)
        client.send(msg);
        client.broadcast.send(msg);
    });

    client.on('disconnect', function() {
        console.log('Desconectado');
    });
  });
})