FROM centos:7

WORKDIR /var/www/html

RUN yum -y update \
    && yum -y install curl httpd git make \
    && curl --silent --location https://rpm.nodesource.com/setup_14.x | bash - \
    && yum -y install nodejs \
    && npm install -g @angular/cli

ADD ./000-default-frontend.conf /etc/httpd/conf.d/000-default.conf

COPY html/ /var/www/html/
COPY build.sh /usr/local/bin/

# Configurando o timezone do servidor
ENV TZ="America/Sao_Paulo"
RUN date

RUN chmod +x /usr/local/bin/build.sh

EXPOSE 80

CMD [ "sh", "-c", "envsubst < html/src/assets/env/env.template.js > html/src/assets/env/env.js ; /usr/local/bin/build.sh ; httpd -DFOREGROUND" ]
