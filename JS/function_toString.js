const a = () => {
  console.log("哈哈")
}
a.toString = console.log("后执行toString哈哈哈哈哈")
a.valueOf = console.log("先执行valueOf哈哈哈")

a;