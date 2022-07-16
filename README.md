# Docker-compose
Между собой могут общаться: mssql и server, server и nginx. Только nginx имеет external port. Nginx возвращает single page application (1 .html + 2 .js + 1 .css). При запросах с браузера к api(server) SPA обращается к nginx, nginx в этом случае является прокси сервером между браузером и api, следовательно cors механизм не активируется

## Используемые images:
1. mssql: - 1.99 GB
   * mcr.microsoft.com/mssql/server:2022-latest
2. client: - 25.17 MB
   * node:16-alpine
   * nginx:1.23.0-alpine
3. server: - 164.28 MB
   * node:16-alpine

## Можно доделать:
1. Создать .env для docker-compose
2. Следует из первого пункта: создать .env или аналоги для nginx.conf и setup.sql (create first database)
3. Для server. Переделать заполнение базы данных (migrate), с использованием скрипта. И выполнять заполнение только при создании контейнера.
4. Можно заполненную и созданную базу данных поместить в image через docker commit.
5. Запретить извне обращаться к сетям-контейенрам server, mssql (по ip контейнеров)

## docker-compose.yml
![image](https://user-images.githubusercontent.com/71494768/179352190-15f521b4-30cb-4459-bcc8-465d766d1b1e.png)
![image](https://user-images.githubusercontent.com/71494768/179352244-6bb56c49-c802-4f7b-b1de-c57eabd9ca01.png)

