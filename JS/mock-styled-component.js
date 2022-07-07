const styled = {};

styled.div = (template, ...params) => {
  let styleSheet = '';
  let i = 0;
  if( template ){
    template.forEach((item, index) => {
      styleSheet += item;
      styleSheet += params[i++];
    })
  }
  console.log( styleSheet )
}

const width = 2000;
const height = 1000;

styled.div`
  width: ${width}px;
  height: ${height}px;
  background: red;
  cursor: pointer;
`

