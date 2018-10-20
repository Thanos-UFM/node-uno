# UNO Node
## Inicio

### Prerequisitos
Para poder correr el juego es necesario tener instalado [NodeJS](https://nodejs.org/en/).
Una vez descargado e instalado NodeJS verficar que está instalado con 
```bash
$ npm -v
$ node -v
```
Si ambas lineas imprimen la version de npm y node entonces ambos fueron instalados instalados correctamente.

Para poder clonar el proyecto en su computadora es necesario tener [git](https://git-scm.com/) (obviamente)

### Clonar proyecto
Navegar en consola al directorio donde quieran clonar el proyecto y correr las siguientes lineas:
```bash
$ git clone https://github.com/Thanos-UFM/node-uno.git
$ cd node-uno
```

### Correr
Antes de correr el programa es necesario instalar todas las dependencias, con `npm` esto es super sencillo (npm maneja todas las dependecias).
Para instalar las dependencias correr esta linea dentro del directorio del repositorio
```bash
$ npm install
```
Cuando terminen de descargar e instalar las dependecias ya se pueden levantar el programa. Hay dos formas de correr el programa:  
1. **Compilar y correr**  
    ```bash
    npm run build
    npm test
    ```
2. **Live-reload y sin compilar**
    ```bash
    npm start
    ```
Yo recomiendo live-reload para probar cambios y compilar cuando sea necesario llevar a producción el programa