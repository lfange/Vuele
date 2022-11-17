
<script setup lang="ts" name="menuTitle">
import { isExternal } from '@/utils/validate.ts'
import { Location, } from '@element-plus/icons-vue'
import SideBarItem from './SideBarItem.tsx'
import { toRefs } from 'vue';
import path from 'path';

const props = defineProps({
  foo: String,
  item: Object
})

console.log('menuTitle item', props.item)

const { item } = toRefs(props)

const resolvePath = (routePath) => {
  if (!routePath) return 'routePath null'
  if (isExternal(routePath)) {
    return routePath
  }
  return path.resolve(props.basePath, routePath)
}
</script>

<template>
  <!-- <el-sub-menu index="1">
    <template #title>
      <el-icon><location /></el-icon>
      <span>Navigator One</span>
    </template>
    <el-menu-item-group title="Group One">
      <el-menu-item index="1-1">item one</el-menu-item>
    </el-menu-item-group>
    <el-sub-menu index="1-4">
      <template #title>item four</template>
      <el-menu-item index="1-4-1">item one</el-menu-item>
    </el-sub-menu>
  </el-sub-menu> -->
  <el-sub-menu ref="subMenu" :index="props.item?.path" popper-append-to-body>
    <template #title>
      <el-icon>
        <location />
      </el-icon>
      <span>{{ props.item?.title }}</span>
    </template>
    <SideBarItem v-for="child in item?.children" :is-nest="true" :item="child" :key="child.path"
      :base-path="resolvePath(child.path)" class="nest-menu" />
  </el-sub-menu>
</template>
