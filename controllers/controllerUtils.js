const colors = require('colors');

exports.consoleLoudLog = function (msg, logObject, colorObj) {

  let paddingColor = 'grey';
  let messageColor = 'magenta';
  let objColor = 'cyan';

  if (colorObj) {
    const { padding, message, log } = colorObj;
    if (padding) paddingColor = padding;
    if (message) messageColor = message;
    if (log) objColor = log;
  }

  const padOneR = (100 - msg.length) / 2;
  let padOneL = padOneR;
  const padTwoR = (92 - msg.length) / 2;
  let padTwoL = padTwoR;

  if (msg.length % 2 == 1) {
    padOneL -= 1;
    padTwoL -= 1;
  }

  console.log('\n');
  console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++'[paddingColor]);
  console.log(`${makePadding(padOneL, paddingColor)}${msg.bold[messageColor]}${makePadding(padOneR, paddingColor)}`);
  console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++'[paddingColor]);
  console.log('\n');
  console.log(getColorFunction(objColor, logObject));
  console.log('\n');
  console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++'[paddingColor]);
  console.log(`${makePadding(padTwoL, paddingColor)}` + `END OF: `.bold[messageColor] + `${msg.bold[messageColor]}${makePadding(padTwoR, paddingColor)}`);
  console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++'[paddingColor]);
  console.log('\n');
}

function makePadding(len, color) {
  let str = '';
  for (let i = 0; i < len; i++) {
    str += '+';
  }
  return str[color];
}

function getColorFunction(color, logObject) {
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