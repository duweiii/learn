export default {
  type: "div",
  props: {
    id: 'root-id',
    class: 'root-class',
    onClick: () => console.log( 'enen' )
  },
  children: [
    {
      type: "p",
      props: {
        id: 'p-id',
        class: 'p-class'
      },
      children: 'p-content'
    },
    {
      type: "span",
      props: {
        id: 'span-id',
        class: 'span-class'
      },
      children: 'span-content'
    }
  ]
}