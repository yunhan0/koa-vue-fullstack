<template>
  <Layout :style="{padding: '0 50px'}">
    <Breadcrumb :style="{margin: '16px 0'}">
      <BreadcrumbItem to="/">Home</BreadcrumbItem>
    </Breadcrumb>
    <Content :style="{padding: '24px 0', minHeight: '280px', background: '#fff'}">
        <Layout>
          <Sider hide-trigger :style="{background: '#fff'}">
            <app-sider></app-sider>
          </Sider>
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            <Row>
                <Col :sm="24" :md="{ span: 11, offset: 1}">
                  <thing></thing>
                </Col>
                <Col :sm="24" :md="{ span: 11, offset: 1}"></Col>
            </Row>
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