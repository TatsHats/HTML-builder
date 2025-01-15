// импорт модулей
const fs = require('fs');
const readLine = require('readline');
// создание файла text.txt
const textFile = fs.createWriteStream('./02-write-file/text.txt');
// интерфейс для чтения
const readInterface = readLine.createInterface({
  input: process.stdin,
  output: process.stdout
});

// приветствие
console.log('Hello! How are you? Enter text and press "exit" or "ctrl + c" to exit');

// событие = Enter
readInterface.on('line', (input) => {
  if (input.trim().toLowerCase() === 'exit') {
    readInterface.close();
  } else {
    textFile.write(input + '\n');
    console.log('Would you like to add anything? (press "exit" or "ctrl + c" to exit)');
  }
});

// событие = exit или Ctrl+C
readInterface.on('close', () => {
  console.log('\nBye! Bye!');
  process.exit();
});
