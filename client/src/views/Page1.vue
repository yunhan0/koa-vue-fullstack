<template>
  <Content :style="{padding: '0 50px'}">
    <Breadcrumb :style="{margin: '20px 0'}">
      <BreadcrumbItem to="/">Home</BreadcrumbItem>
      <BreadcrumbItem to="page1">Page 1</BreadcrumbItem>
    </Breadcrumb>
    <Card>
      <div style="min-height: 200px;">
        Content
      </div>
    </Card>
  </Content>
</template>

<script>

import { Layout, Breadcrumb, BreadcrumbItem, Content } from 'iview';

export default {
  components: {
    Layout, Breadcrumb, BreadcrumbItem, Content
  },
  data() {
    return {

    }
  }
}
</script>