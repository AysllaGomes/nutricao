# Nutrição

O sistema "Nutrição" é uma aplicação desenvolvida com Laravel e Angular. Deve-se seguir atentamente
as orientações a seguir para configurar o seu ambiente.

1º- O projeto necessita que sejam instalados o "docker", "docker-compose", "node", "npm instalados" em seu ambiente.

2º- Verifique o ambiente que deseja subir e confirme se o job no jenkis esta correto.

3º- Em seguida, execute o comando: "docker-compose -f 'ambiente_desejado' up --build -d".

# BUILD DO PROJETO POR AMBIENTE

A seguir estarão as opções para subir o projeto de acordo com o ambiente desejado.

# AMBIENTE LOCAL

1º - O comando a ser executado é: "docker-compose -f local.yml up --build -d"

2º - Configure o seu arquivo hosts conforme descrito abaixo:

```yml
172.21.0.103    nutricao-local.economia.com.br
```
3º - Para fazer o auto reload do frontend, deve se deixar o watch do ng no console, com o comando abaixo:
```
sudo docker exec -it nutricao-frontend ng build --watch
```

OBS: No console do logs dos containers, aplicação so sobe quando o frontend, e backend fizer a instalação das dependências, e quando o backend fizer as migrations, e aparece a mensagem *Back - Finzalizando o Endpoint da Application*.

# AMBIENTE DESENVOLVIMENTO

1º - O comando a ser executado é: "docker-compose -f development.yml up --build -d"

# AMBIENTE HOMOLOGAÇÃO

1º - O comando a ser executado é: "docker-compose -f homolog.yml up --build -d"

# AMBIENTE PRODUÇÃO

1º - O comando a ser executado é: "docker-compose -f production.yml up --build -d"

Após seguir atentamente os passos acima, abra o browser de sua preferência insira a url "nutricao-local.economia.com.br".
