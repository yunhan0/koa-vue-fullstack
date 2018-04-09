<template>
  <Layout :style="{padding: '0 50px'}">
      <Breadcrumb :style="{margin: '16px 0'}">
        <BreadcrumbItem>Home</BreadcrumbItem>
      </Breadcrumb>
      <Content :style="{padding: '24px 0', minHeight: '280px', background: '#fff'}">
          <Layout>
            <Sider hide-trigger :style="{background: '#fff'}">
              <app-sider></app-sider>
            </Sider>
            <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                <thing></thing>
            </Content>
          </Layout>
      </Content>
  </Layout>   
</template>

<script>
import Sider from '../components/Sider.vue';
import Thing from '../components/Thing.vue';

export default {
  components: {
    'app-sider': Sider,
    'thing': Thing
  },
  data() {
    return {

    }
  }
}
</script>