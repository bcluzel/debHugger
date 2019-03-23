<template lang="pug">
  ToolbarBase
    template(v-if="!searchIsActive")
      ToolbarSideIcon(v-if="Object.keys($setup.links).length > $setup.tabsCount")
      ToolbarLogo
      ToolbarTitle
      v-spacer
      ToolbarSearchOn.hidden-md-and-up
      ToolbarSearchInput.hidden-sm-and-down
      v-spacer.hidden-sm-and-down
      ToolbarItems.ml-3
      ToolbarSettings
      //-ToolbarTabs(slot="tabs" v-if="!navCanShow")
    template(v-else)
      ToolbarLogo
      ToolbarSearchInput(autofocus)
</template>

<script>
import ToolbarBase from './_base'
import ToolbarLogo from './_logo'
import ToolbarTitle from './_title'
import ToolbarItems from './_items'
import ToolbarSideIcon from './_sideIcon'
import ToolbarSearchOn from './_searchOn'
import ToolbarSearchInput from './_searchInput'
import ToolbarSettings from './settings'
import ToolbarTabs from './_tabs'

import {
  getState
} from '@/storeInterface/'

export default {
  components: {
    ToolbarBase,
    ToolbarLogo,
    ToolbarTitle,
    ToolbarItems,
    ToolbarSideIcon,
    ToolbarSearchOn,
    ToolbarSearchInput,
    ToolbarSettings,
    ToolbarTabs
  },
  computed: {
    ...getState(['search', 'nav'], true)
  }
}
</script>
