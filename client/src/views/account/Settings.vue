<template>
  <div>
    <Row :gutter="16">
      <Col
        :md="{span: 12}"
        :sm="{span: 24}">
      <!-- Begin Change Password -->
      <ChangePassword/>
      <!-- End Change Password -->
      </Col>
      <Col
        :md="{span: 12}"
        :sm="{span: 24}">
      Col-12
      </Col>
    </Row>
  </div>
</template>

<script>
import ChangePassword from '../../components/account/ChangePassword.vue'

export default {
  components: {
    ChangePassword
  }
}
</script>
