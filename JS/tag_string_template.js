const a = (string, ...params) => {
  let str = '';
  string.forEach(item => str += item);
  params.forEach(item => str += item);
  return str.replace(/[.]/g, '哈')
}

let b = a`我${ '.'.repeat(10) },这是后面的部分${2_000*4_000}`;