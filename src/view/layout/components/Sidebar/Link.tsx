import { defineComponent } from 'vue'
import { useLink } from 'vue-router'
import { isExternal } from '@/utils/validate.ts'

const Link = defineComponent({
  name: 'Link',
  props: {
    to: {
      type: String,
      required: true
    }
  },
  setup(props, { attrs, slots, emit, expose }) {
    console.log('props', props)
    // `props` 包含 `to` 和任何其他可以传递给 <router-link> 的 prop
    const { navigate, href, route, isActive, isExactActive } = useLink(props)
    
    const ALink = () => (
      <a {...attrs} href={props.to} target="_blank">
        { slots.default?.() }
      </a>
    )
    const VLink = () => (
      <router-link to={props.to} {...attrs} v-slots={{ isActive, href, navigate }}>
        { slots.default?.() }
      </router-link>
    )

    // profit!
    return () => (
      <>
        { isExternal(props.to) ? <ALink /> : <VLink /> }
      </>
    )
  }
})

export default Link
