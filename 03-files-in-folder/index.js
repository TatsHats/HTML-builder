// импорт модулей
const fs = require('fs/promises');
const path = require('path');
// путь к папке
const folderPath = path.join(__dirname, 'secret-folder');

(async () => {
  try {
    if (!folderPath) throw new Error('Folder path is not defined.');

    // читаем содержимое папки
    const elements = await fs.readdir(folderPath, { withFileTypes: true });

    // обработка элементов папки
    for (const el of elements) {
      if (el.isFile()) {
        const fileStats = await fs.stat(path.join(folderPath, el.name));
        const fileName = path.basename(el.name, path.extname(el.name));
        const fileSizeKB = (fileStats.size / 1024).toFixed(3); // р-р в кБ, 3зн после зап.
        const fileExt = path.extname(el.name).slice(1); // расширение (без .)
        // вывод информации (<file name>-<file extension>-<file size>)
        console.log(`${fileName}-${fileExt}-${fileSizeKB}kb`);
      }
    }

    } catch (error) {
        console.error('Error:', error);
    }
  })();