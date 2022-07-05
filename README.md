# Интернет магазин
Авторизация только для админ панели.

## База данных
![image](https://user-images.githubusercontent.com/71494768/177323275-ef941084-4953-41eb-8273-4552aee7365c.png)

## Frontend
1. React
2. Mobx 
3. Axios
4. Bootstrap (адаптивная вёрстка - :white_check_mark:) 
5. Jwt-decode

### Нужны исправления:
1. При замене в url id type и id product на символы. Ошибки
2. Лишние запросы в панеле администратора на бэк
3. Ошибки на странице списка продуктов. При выборе брендов и обновлении страницы. Смотреть на mobx
4. Изменить систему в подгрузке брендов в первый раз и в компоненте checkbrandbar. useRef(true)
5. При загрузке страницы со списком продуктов. Добавить галочку по умолчанию на все продукты (в магазинах и нет). 

## Скрины
![image](https://user-images.githubusercontent.com/71494768/177332584-a1bb607e-4142-4508-a4e2-cca6e81f5d94.png)

![image](https://user-images.githubusercontent.com/71494768/177332780-af7dc2cc-e3c2-458a-a8fa-14bf65fda6ba.png)

![image](https://user-images.githubusercontent.com/71494768/177333035-fcbd2cc4-8ce4-4272-a859-1599d05f148c.png)

![image](https://user-images.githubusercontent.com/71494768/177333197-17a72aaa-77f7-4f65-826e-56b33ce83e6a.png)

![image](https://user-images.githubusercontent.com/71494768/177333281-9827c25d-59f1-4df5-869d-7e8446df61fd.png)

![image](https://user-images.githubusercontent.com/71494768/177333395-c6cbc30b-fa5b-4e3f-b169-f8d4eea54477.png)

![image](https://user-images.githubusercontent.com/71494768/177333471-d27adb8a-6392-47a2-9b75-bf5d70a4f43a.png)

![image](https://user-images.githubusercontent.com/71494768/177333605-fab92d8f-acf0-4429-9749-13d3a127d7fa.png)




## Backend
1. NodeJS
2. Express
3. Jsonwebtoken
4. Mssql (только подключение и сырые sql)

### Роуты
1. Авторизация и контроль доступа исправны. На jwt токенах. Один администратор user 222. 
2. Добавлен роут для создания процедур, тригеров, функций, представлений, таблиц в базы данных (аналог миграций)
3. База данных заполняется данными

### Middleware
1. Контроль доступа исправен
2. Фильтрация ошибок присутствует

### Контроллеры
1. Валидация аргументов request'a слабая
2. Используются сырые sql запросы. Замена orm. 
