<template>
  <Layout>
    <Sider
      :style="{background: '#fff'}"
      :collapsed-width="78"
      v-model="isCollapsed"
      collapsible>
      <app-sider :is-collapsed="isCollapsed"/>
    </Sider>
    <Layout :style="{padding: '0 24px 24px'}">
      <Breadcrumb :style="{margin: '24px 0'}">
        <BreadcrumbItem
          v-if="$route.path!== '/home'"
          to="/home"> Home </BreadcrumbItem>
        <BreadcrumbItem>{{ $route.name }}</BreadcrumbItem>
      </Breadcrumb>
      <Content>
        <router-view/>
      </Content>
    </Layout>
  </Layout>
</template>

<script>
import { Layout, Sider, Content, Breadcrumb, BreadcrumbItem } from 'iview'

export default {
  components: {
    'app-sider': () => import('../components/Sider.vue'),
    Layout, Sider, Content, Breadcrumb, BreadcrumbItem
  },
  data() {
    return {
      isCollapsed: false
    }
  }
}
</script>
