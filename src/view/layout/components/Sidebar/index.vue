<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    : {{ navTabs.menuRoutes.length }}
    <el-menu
      :default-active="$route.path"
      :collapse="isCollapse"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      :collapse-transition="false"
      mode="vertical"
    >
      <div @click="Routeset">state.routers</div>
      <!-- <sidebar-item v-for="route in routers" :key="route.path" :item="route" :base-path="route.path"/> -->
      <SideBarItem  v-for="route in navTabs.menuRoutes" :key="route.path" :item="route" :base-path="route.path" :title="'SideBarItem'" />
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts" setup>
// import { mapGetters } from 'vuex'
import variables from '@/styles/variables.scss'
import { storeToRefs } from 'pinia'
import { useappStore } from '@/store/app'
import { useNavTabsStore } from '@/store/navTabs.ts'
import SideBarItem from './SidebarItem.vue'
import { computed } from 'vue';

const appStore = useappStore()

const navTabs = useNavTabsStore()

const isCollapse = computed(() => appStore.opened)

const { menuRoutes } = storeToRefs(navTabs)

console.log('Routeset', menuRoutes)
const Routeset = () => {
  console.log('Routeset', menuRoutes)
  // userStore.GetRoutes()
}

</script>
