const fs = require("fs")
const content = fs.readFileSync("./timeout.html", 'utf-8')
console.log( content.length )
let statistic = {}
for( let i = 0; i < content.length; i++){
  if(statistic.hasOwnProperty(content[i])){
    statistic[content[i]] += 1;
  }else{
    statistic[content[i]] = 1;
  }
}
let l = content.length;
for(let i in statistic){
  statistic[i] = Math.round((statistic[i] / l) * 100) + "%";
}
console.log(statistic)