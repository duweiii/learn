const compiler = require("vue-template-compiler")
const template = `<div id="div-id" class="div-class">div-content-text</div>`


const result = compiler.compile(template)
console.log( result ) 

/**
 *
 * result ↓
   {
    ast: {    
        type: 1,
        tag: 'div',
        attrsList: [ [Object] ],
        attrsMap: { id: 'div-id', class: 'div-class' },
        rawAttrsMap: {},
        parent: undefined,
        children: [ [Object] ],
        plain: false,
        staticClass: '"div-class"',
        attrs: [ [Object] ],
        static: true,
        staticInFor: false,
        staticRoot: false
      },
      render: `with(this){return _c('div',{staticClass:"div-class",attrs:{"id":"div-id"}},[_v("div-content-text")])}`,
      staticRenderFns: [],
      errors: [],
      tips: []
    }
 */