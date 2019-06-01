<template>
  <Row :gutter="30">
    <Col />
    <ThingCreate />
    </Col>
    <br>
    <Col />
    <ThingDisplay />
    </Col>
  </Row>
</template>

<script>
import ThingDisplay from '../components/things/Display.vue'
import ThingCreate from '../components/things/Create.vue'

export default {
  components: {
    ThingDisplay, ThingCreate
  },
  data() {
    return {

    }
  }
}
</script>
