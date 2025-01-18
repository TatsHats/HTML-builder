// Импорт модулей
const fs = require('fs/promises');
const path = require('path');

// Пути к папкам
const stylesFolder = path.join(__dirname, 'styles');
const outputFolder = path.join(__dirname, 'project-dist');
const outputFile = path.join(outputFolder, 'bundle.css');

async function mergeCss() {
  try {
    // Создаём папку если нету
    await fs.mkdir(outputFolder, { recursive: true });
    // Создаём файл bundle.css
    await fs.writeFile(outputFile, '');

    // Читаем содержимое папки styles
    const files = await fs.readdir(stylesFolder, { withFileTypes: true });
    // массив для стилей
    const styles = [];

    // Перебираем файлы
    for (const file of files) {
        if (file.isFile() && path.extname(file.name) === '.css') {
            const content = await fs.readFile(path.join(stylesFolder, file.name), 'utf-8');
            styles.push(content); // Добавляем в массив
        }
    }
    
    // Записываем в файл (join чтоб склеить строку)
    await fs.writeFile(outputFile, styles.join('\n'));

    console.log('CSS bundle created!');
  } catch (error) {
    console.error('Error:', error);
  }
}

// Запуск функции
mergeCss();