// Импорт модулей
const fs = require('fs/promises');
const path = require('path');
// Пути к исходной и целевой папкам
const srcFolder = path.join(__dirname, 'files');
const destFolder = path.join(__dirname, 'files-copy');

async function copyDir() {
    try {
        try {
            await fs.access(destFolder); // проверяем есть ли такая папка
            console.log('The folder already exists!');
            return;
        } catch {}
        // если папки 'files-copy' нет то создаем
        await fs.mkdir(destFolder, { recursive: true });
        // копируем все файлы
        const files = await fs.readdir(srcFolder, { withFileTypes: true });

        for (const el of files) {
            const srcPath = path.join(srcFolder, el.name);
            const destPath = path.join(destFolder, el.name);
            // перебираем файлы и вставляем в новую папку 'files-copy'
            if (el.isFile()) {
            await fs.copyFile(srcPath, destPath);
            }
        }

      console.log('Copy completed!');
    } catch (error) {
      console.error('Error:', error);
    }
  }
  copyDir();