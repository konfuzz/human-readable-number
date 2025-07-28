module.exports = function toReadable(number) {
  const ones = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
  ];
  const teens = [
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen',
  ];
  const tens = [
    '',
    '',
    'twenty',
    'thirty',
    'forty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety',
  ];
  const llions = [
    '',
    'thousand',
    'million',
    'billion',
    'trillion',
    'quadrillion',
    'quintillion',
    'sextillion',
    'septillion',
    'octillion',
    'nonillion',
    'decillion',
  ];

  function convertHundreds(n) {
    let readable = '';
    const hundred = Math.floor(n / 100);
    const rest = n % 100;

    if (hundred > 0) {
      readable += `${ones[hundred]} hundred`;
      if (rest > 0) readable += ' ';
    }

    if (rest < 10 && rest > 0) {
      readable += ones[rest];
    } else if (rest >= 10 && rest < 20) {
      readable += teens[rest - 10];
    } else if (rest >= 20) {
      readable += tens[Math.floor(rest / 10)];
      if (rest % 10 !== 0) {
        readable += ` ${ones[rest % 10]}`;
      }
    }

    return readable;
  }

  if (number === 0) return 'zero';

  const n = String(number);
  const groups = [];

  for (let i = n.length; i > 0; i -= 3) {
    const start = Math.max(i - 3, 0);
    const group = parseInt(n.slice(start, i), 10);
    groups.unshift(group);
  }

  const readable = [];

  for (let i = 0; i < groups.length; i += 1) {
    const groupNum = groups[i];
    if (groupNum !== 0) {
      const groupWord = convertHundreds(groupNum);
      const llion = llions[groups.length - 1 - i];
      readable.push(groupWord + (llion ? ` ${llion}` : ''));
    }
  }

  // console.log(readable.join(' '));
  return readable.join(' ');
};
