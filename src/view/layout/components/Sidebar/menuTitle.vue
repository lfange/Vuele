
<script setup lang="ts">
  import { isExternal } from '@/utils/validate.ts'
  import { Location, } from '@element-plus/icons-vue'
  // import TextItem from './TextItem.tsx'
  import { toRefs } from 'vue';
  import path from 'path';
  
  const props = defineProps({
    foo: String,
    item: Object
  })
  
  console.log('item', props.item)

  const { item } = toRefs(props) 

  const resolvePath = (routePath) => {
    if (!routePath) return 'routePath null'
    if (isExternal(routePath)) {
      return routePath
    }
    return path.resolve(props.basePath, routePath)
  }
</script>
<script lang="ts">
  export default {
    name: 'menuTitle'
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
  <el-sub-menu ref="subMenu" :index="resolvePath(props.item?.path)" popper-append-to-body>
    <template #title>
      <el-icon><location /></el-icon>
      <span>{{props.item?.title}}</span>
    </template>
    <sidebar-item
      v-for="child in item?.children"
      :is-nest="true"
      :item="child"
      :key="child.path"
      :base-path="resolvePath(child.path)"
      class="nest-menu" />
  </el-sub-menu>
</template>
