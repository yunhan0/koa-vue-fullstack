<template>
  <div>
    <!-- Begin: Form -->
    <el-form :model="thingForm" ref="thingForm" :inline="true" class="demo-form-inline">
      <!-- Input -->
      <el-form-item 
        label="Let's create something: "
        prop="name"
        :rules="[{ required: true, message: 'this is required'}]">
        <el-input placeholder="Type anything" v-model="thingForm.name"></el-input>
      </el-form-item>
      <!-- Input -->
      <el-form-item prop="info">
        <el-input placeholder="Type more details" v-model="thingForm.info"></el-input>
      </el-form-item>      
      <!-- Button -->
      <el-form-item>
        <el-button type="primary" @click="create('thingForm')"> Enter </el-button>
      </el-form-item>
    </el-form>
    <!-- End: Form -->
    <!-- Begin: Table of things -->
    <el-table :data="things" style="width: 100%">
      <!-- Column 1 -->
      <el-table-column label="Blah" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <!-- Column 2 -->
      <el-table-column label="Detail" width="300">
        <template slot-scope="scope">
          <span>{{ scope.row.info }}</span>
        </template>
      </el-table-column>
      <!-- Column Operation -->
      <el-table-column label="Operations">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" plain v-on:click="read(scope.$index)"> Read </el-button>
          <el-button size="mini" v-on:click="update(scope.$index)"> Update </el-button>
          <el-button size="mini" type="danger" plain v-on:click="remove(scope.$index)"> Delete </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- End: Table of things -->   
  </div> 
</template>

<script>
import ThingResource from '../services/thing.service';
import { Table, TableColumn } from 'element-ui';

export default {
  components: {
    'el-table': Table,
    'el-table-column': TableColumn
  },
  data() {
    return {
      thingForm: {
        name: '',
        info: ''
      },
      things: []
    }
  },
  // Request data when the component is created.
  created() {
    ThingResource.show().then(response => {
      this.things = response.data;
    })
    .catch(e => {
      console.log(e);
    })
  },
  methods: {
    create: function(formName) { // Create item
      this.$refs[formName].validate((valid) => {
        if (valid) {
          ThingResource.create(this.thingForm).then(response => {
            this.things.push(response.data);
            // reset form data
            this.$refs[formName].resetFields();
          })
          .catch(e => {
            console.log(e);
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    read: function(index) { // Request single item
      ThingResource.get(this.things[index]._id).then(response => {
        this.things.splice(index, 1, response.data);
      })
      .catch(e => {
        console.log(e);
      });
    },
    update: function(index) { }, // Update item
    
    remove: function(index) { // Delete item
      ThingResource.delete(this.things[index]._id).then(response => {
        this.things.splice(index, 1);
      })
      .catch(e => {
        console.log(e);
      });
    }
  }
}
</script>