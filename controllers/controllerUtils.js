const colors = require('colors');

exports.consoleLoud = function (logObject, msg, options) {
  let paddingColor = 'grey';
  let messageColor = 'magenta';
  let objColor = 'cyan';
  let rowLength = 100;
  let msgOne = " SOME PEOPLE DON'T THINK IT BE LIKE IT IS ";
  let msgTwo = " BUT IT DO ";
  let isTight = false;

  if (msg) {
    msgOne = ` ${msg} `;
    msgTwo = ` END OF ${msg} `;
  }

  if (options) {
    const { padding, message, log, row, tight } = options;
    if (padding) paddingColor = padding;
    if (message) messageColor = message;
    if (log) objColor = log;
    if ((row || row === 0) && row <= 150 && row >= 0) rowLength = row;
    if (tight) isTight = tight;
  }

  // set defaults:
  const padLeft1 = (rowLength - (msgOne.length)) / 2;
  const padLeft2 = (rowLength - (msgTwo.length)) / 2;
  let padRight1 = (rowLength - (msgOne.length)) / 2;
  let padRight2 = (rowLength - (msgTwo.length)) / 2;

  if ((rowLength - msgOne.length) % 2 === 1)
    padRight1 = ((rowLength - (msgOne.length + 1)) / 2);
  if ((rowLength - msgTwo.length) % 2 === 1)
    padRight2 = ((rowLength - (msgTwo.length + 1)) / 2);

  if (!isTight) console.log('\n');
  if (rowLength) console.log(`${writeRow(rowLength, paddingColor)}`);
  console.log(`${writePadding(padLeft1, paddingColor)}${msgOne[messageColor]}${writePadding(padRight1, paddingColor)}`);
  if (rowLength) console.log(`${writeRow(rowLength, paddingColor)}`);
  if (!isTight) console.log('\n');
  console.log(getColor(objColor, logObject));
  if (!isTight) console.log('\n');
  if (rowLength) console.log(`${writeRow(rowLength, paddingColor)}`);
  console.log(`${writePadding(padLeft2, paddingColor)}${msgTwo[messageColor]}${writePadding(padRight2, paddingColor)}`);
  if (rowLength) console.log(`${writeRow(rowLength, paddingColor)}`);
  if (!isTight) console.log('\n');
}

// helper functions:
function writeRow(num, color) {
  let str = '';
  for (let i = 0; i < num; i++) { str += '%'; }
  return str[color];
}

function writePadding(len, color) {
  let str = '';
  for (let i = 0; i < len; i++) {
    str += '%';
  }
  return str[color];
}

function getColor(color, logObject) {
  switch (color) {
    case 'black': return colors.black(logObject);
    case 'red': return colors.red(logObject);
    case 'green': return colors.green(logObject);
    case 'yellow': return colors.yellow(logObject);
    case 'blue': return colors.blue(logObject);
    case 'magenta': return colors.magenta(logObject);
    case 'cyan': return colors.cyan(logObject);
    case 'white': return colors.white(logObject);
    case 'grey': return colors.grey(logObject);
    case 'gray': return colors.gray(logObject);
    default: return colors.cyan(logObject);
  }
}