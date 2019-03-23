import {
  writeFileSync,
  unlinkSync,
  readdirSync
} from 'fs'
import {
  links, search
} from './setup'

readdirSync('../pages').forEach(file => {
  unlinkSync(`../pages/${file}`)
})

Object.keys(links)
  .map(name => ({
    name,
    path: links[name]
  }))
  .forEach(({ name, path }) => {
    writeFileSync(`../pages/${path === '/' ? 'index' : path}.vue`,
      `<template lang="pug">
  LMain
    | ${name}
</template>

<script>
import mixinPage from '@/mixins/page'

export default {
  mixins: [mixinPage],
  description: '${name} Page Description'
}
</script>
`, 'utf-8')
  })

console.log(search)
if (search) {
  writeFileSync(`../pages/results.vue`,
    `<template lang="pug">
  div
    | Results : query = {{ query }}
</template>

<script>
import mixinPage from '@/mixins/page'

export default {
  mixins: [mixinPage],
  description: 'Results page',
  computed: {
    query () {
      return this.$route.query.search_query
    }
  }
}
</script>
`, 'utf-8')
}

