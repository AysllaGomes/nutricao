FROM php:7.2-apache

WORKDIR /var/www/html

RUN apt-get update \
    && a2enmod rewrite \
    && apt-get install -y --no-install-recommends libpq-dev libicu-dev libzip-dev libxml2-dev zip unzip git cron \
    && docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \
    && docker-php-ext-install pgsql pdo pdo_pgsql soap\
    && pecl install apcu xdebug \
    && docker-php-ext-enable apcu xdebug \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN apt update \
	&& apt -y install vim

# Configurando o timezone do servidor
RUN echo "America/Sao_Paulo" > /etc/timezone
RUN dpkg-reconfigure -f noninteractive tzdata

# Apache settings
COPY etc/host.conf /etc/apache2/conf-enabled/host.conf
COPY etc/000-default-backend.conf /etc/apache2/sites-enabled/000-default.conf
COPY etc/apache2.conf /etc/apache2/apache2.conf

# PHP settings
COPY etc/production.ini /usr/local/etc/php/conf.d/production.ini

# COMPOSER
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copy cron file to the cron.d directory
COPY crontab /etc/cron.d/cron

# Give execution rights on the cron job
RUN chmod 0644 /etc/cron.d/cron

# Apply cron job
RUN crontab /etc/cron.d/cron

# Create the log file to be able to run tail
RUN mkdir -p /var/log/cron

COPY html/ /var/www/html
COPY entrypoint.sh /usr/local/bin/

RUN chmod +x /usr/local/bin/entrypoint.sh

CMD [ "sh", "-c", "/usr/local/bin/entrypoint.sh; /usr/local/bin/apache2-foreground" ]