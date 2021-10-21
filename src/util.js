export default function fomatFloat(value, n = 8) {
  let str = (value / 100000000).toString();
  const strArr = str.split('.');
  let zeroPadding = 0;
  if (strArr.length === 1) {
    zeroPadding = n;
    str += '.';
  } else {
    zeroPadding = n - strArr[1].length;
  }
  if (zeroPadding > 0) {
    for (let i = 0; i < zeroPadding; i++) {
      str += '0';
    }
  }
  return str;
}
