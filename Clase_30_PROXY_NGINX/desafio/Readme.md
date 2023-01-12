# Info del desafio

1) Se agrego a /info el numero de procesadores del servidor

2) Inicio del servidor

a) Si se ejecuta el server normalmente inicia en fork 
node index.js

b) Si se ejecuta el server con el argumento -m cluster inicia en modo cluster nativo de node.js
node index.js -m cluster

3) se realizaron las pruebas con pm2 en modo fork y modo cluster implementando el modo escucha con --watch para que reinicie en las actualizaciones.

# Configurar Nginx para balancear cargas de nuestro servidor de la siguiente manera:

1) Redirigir todas las consultas a /api/randoms a un cluster de servidores escuchando en el puerto 8081. El cluster será creado desde node utilizando el módulo nativo cluster.

iniciar el server: nodemon index.js -p 8081 -m cluster
redirigir con conf Nginx

2) El resto de las consultas, redirigirlas a un servidor individual escuchando en el puerto 8080.
iniciar otro server normal.

3) Luego, modificar la configuración para que todas las consultas a /api/randoms sean redirigidas a un cluster de servidores gestionado desde nginx, repartiéndolas equitativamente entre 4 instancias escuchando en los puertos 8082, 8083, 8084 y 8085 respectivamente.

la ultima conf de Nginx se realizo con todas las consultas a /api/randoms sean redirigidas equitativamente entre 4 instancias escuchando en los puertos 8082, 8083, 8084 y 8085 respectivamente.

Levantar 4 instancias con pm2 o en distintas consolas, con los puertos 8082, 8083, 8084 y 8085.
