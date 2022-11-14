<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    {{ routers }} {{ routers.length }}
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
      <sidebar-item v-for="route in routers" :key="route.path" :item="route" :base-path="route.path"/>
      <SideBarItem  v-for="route in routers" :key="route.path" :item="route" :base-path="route.path" :title="'SideBarItem'" />
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts" setup>
// import { mapGetters } from 'vuex'
import variables from '@/styles/variables.scss'
import { storeToRefs } from 'pinia'
import { useappStore } from '@/store/app'
import { useuserStore } from '@/store/user.ts'
import SideBarItem from './SideBarItem.tsx'
import { computed } from 'vue';

const appStore = useappStore()

const userStore = useuserStore()

const isCollapse = computed(() => appStore.sidebar.opened)

const { routers } = storeToRefs(userStore)

const Routeset = () => {
  console.log('Routeset', routers)
  userStore.GetRoutes()
}

</script>
