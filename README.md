# newsqool

Попытка создания обновлённой веб-морды для [контестного сервера по БД](https://github.com/dbarashev/sqool).

## Макет дизайна

![Макет дизайна](./design_draft.png)

## Инструкция по сборке и установке

### Пререквизиты

Для работы нужен Node.js и пакетный менеджер yarn.

### Установка зависимостей

```sh
cd frontend
yarn install
cd ../proxy
yarn install
```

### Запуск сервера фронтенда в режиме разработки

```sh
cd frontend
yarn start
```

### Запуск прокси-сервера в режиме разработки

```sh
cd proxy
yarn start
```

### Сборка релизной версии

```sh
cd frontend
yarn build
cd ../proxy
yarn build
```

### Установка расширения

- Перейти по адресу `chrome://extensions`
- Нажать на кнопку "Загрузить распакованное расширение"
- Выбрать директорию `extension`

## Команда отважных веб-модельеров:

- [Андрей Егорычев](https://github.com/CherniyKot) -- тимлид
- [Илья Иванцов](https://github.com/ilyaivantsov) -- разработчик
- [Алексей Воробьёв](https://github.com/PinochetLab) -- дизайнер
- [Эридан Доморацкий](https://gh.byprogminer.ru) -- техлид

## Ссылки

- [CSC Wiki](https://wiki.compscicenter.ru/index.php/NewSqool)
- [Видео-бомба](https://youtu.be/AeFrzbK-bQU)
