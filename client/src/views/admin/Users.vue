<template>
  <div>
    <Row>
      <Col>
      <UserTable/>
			</Col>
    </Row>
  </div>
</template>

<script>
import UserTable from '../../components/admin/UserTable.vue'

export default {
  components: {
    UserTable
  }
}
</script>