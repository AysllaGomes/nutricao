#!/bin/bash

if [ -d "/var/www/html/node_modules" ]
 then
    rm -rf node_modules
fi

if [ -d "/var/www/html/dist" ]
then
    echo "Apagando o dist anterior"
    rm -rf dist
fi

mkdir "dist"

export NG_CLI_ANALYTICS=false
echo "Instalando o node"
npm install

echo "Buildando o projeto - ambiente: ${AMBIENTE}"
ng build  --configuration=${AMBIENTE}

echo "Dando permissão na pasta dist"
chmod -R 777 dist

echo "Finalizando a instalação do Frontend"