import { defineComponent } from 'vue';

const Link = defineComponent({
  name: 'Link',
  props: {
    title: String,
    to: {
      type: String,
      required: true
    }
  },
  setup(props) {
    console.log('props', props)

    return () => (
      <div>
        Link = {props.title}
      </div>
    )
  }
})

export default Link