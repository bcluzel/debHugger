<script>
import AuthSignin from './signin/'
import AuthSignup from './signup/'

export default {
  functional: true,

  render: (_) => ([
      _(AuthSignin),
      _(AuthSignup)
    ])
}
</script>
