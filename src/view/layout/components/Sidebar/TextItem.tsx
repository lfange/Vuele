import { defineComponent } from 'vue';

const Item = defineComponent({
  name: 'Item',
  props: {
    meta: {
      type: Object,
      default: () => {
        return {
          title: '',
          icon: ''
        }
      }
    }
  },
  setup(props) {
    console.log('Item props', props.meta)
    return () => (
      <>
      propro: { props.meta }
        { props.meta.icon && <svg-icon icon-class={props.meta.icon}/> }
        { props.meta.title && <span slot='title'>{(props.meta.title)}</span> }
      </>
    )
  }
})

export default Item