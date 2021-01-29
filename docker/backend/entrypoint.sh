#!/bin/sh
echo "Back - Iniciando o Endpoint da Aplicação e setando o dono da pasta storage"
chown -R $USER:www-data storage

if ! [ -f ".env" ]; then
    echo "Arquivo '.env' não encontrado - Gerando arquivo"
    cp env.deployment .env
fi

echo "Instalando as dependências com o composer"
composer install --verbose

echo "DB Migration"
php artisan migrate --force

echo "Configurando o cache da aplicação"
php artisan key:generate
php artisan config:cache

echo "Configurando a chave do token"
php artisan jwt:secret --force

echo "Limpando o cache, configurações e view"
php artisan view:clear
php artisan cache:clear
php artisan config:clear

echo "Permissões de acesso a pasta vendor"
chmod -R 777 vendor

echo "Permissões de acesso a pasta storage"
chmod -R 777 storage

echo "Execução da Cron"
service cron start

echo "Back - Finzalizando o Endpoint da Application"
