# Используем официальный образ Node.js
FROM node:18

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Собираем проект
RUN npm run build

# Устанавливаем простой сервер для статики (serve)
RUN npm install -g serve

# Указываем порт, на котором будет работать приложение
EXPOSE 3000

# Команда запуска контейнера
CMD ["serve", "-s", "build", "-l", "3000"]
