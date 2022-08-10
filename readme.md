# Простой сайт новостей, server

REST API, серверная часть, построение архитектуры приложения Express

Front-end, клиент на Angular, здесь [simple-news-site-client](https://github.com/dmitriy-tka4/simple-news-site-client)

## Техническое задание

* Express
* БД MongoDB, ODM Mongoose, базовые операции CRUD
* REST API (методы, статусы ответа), все данные в формате JSON
* Пользователей и авторизации нет
* Обработка ошибок

API docs:

* `GET` `/articles/` - спискок всех новостей
* `GET` `/articles/:id` - получение одной новости по id
* `POST` `/articles/` - создание новости
* `PUT` `/articles/:id` - обновление новости
* `DELETE` `/articles/:id` - удаление новости
* `PATCH` `/articles/:id` - *not implemented*

## TODO

* Добавить метод в контроллере для обработки `PATCH`
* Добавлять поле `modifiedAt` с датой исправления при редактировании
* При обработке ошибок менять статус ответа (400, 404, 500), например, использовать http-errors или добавлять вручную
* Обработка обязательных полей, валидация при создании и редактировании

## Feedback

Писать на почту - dmitriy.tka4@gmail.com
