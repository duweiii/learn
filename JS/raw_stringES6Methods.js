let a = `abcd哈哈\u4e94`;
console.log(a, String.raw`abcd哈哈\u4e94`)
// raw不会对字符做自动转换