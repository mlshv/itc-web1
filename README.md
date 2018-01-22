# itc-web1-frontend
Материалы для проекта фронтэнд-направления продвинутого курса ITC по web-разработке.

## О проекте
Проект - переосмысленный сайт Delivery Club'a. Веб-приложение для клиентов и курьеров.

## ./src
Пример реализации приложения.

## ./server
Бэкенд.
### Эндпоинты
#### /store
Все данные магазина, JSON-объект.

Query-параметры:
* uuid - uuid идентификатор магазина
#### /stores
Список магазинов, JSON-массив.

Query-параметры:
* limit - количество магазинов в списке (по умолчанию 10)
* offset - сдвиг от начала списка (по умолчанию 0)
#### /locations
Список местоположений всех магазинов. JSON-массив.

## TODO
- Пофиксить frontend, дописать загрузку с учётом offset'а
- Написать страницу магазина
- Написать авторизацию для курьера
- Написать UI курьера
- Впилить монгу