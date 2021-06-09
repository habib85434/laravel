<template>
  <div class="table-responsive ">
    <table class="table white-bg rounded-border rounded">
      <thead class="thead-dark">
        <tr>
          <th v-for="(obj, ind) in tableConfig" :key="ind">{{ obj.title }}</th>
          <th class="text-right"></th>
        </tr>
      </thead>
      <tbody>
        <slot></slot>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "IxTable",
  components: {},
  props: ["tableConfig"]
  //computed: {},
  //methods: {}
};
</script>
<style scoped>
.rounded-border {
  border-spacing: 0;
  border-collapse: separate;
  border: solid #dee2e6 1px;
  border-radius: 6px;
}
.thead-dark {
  white-space: nowrap;
}

.table {
  font-size: 0.8rem !important;
}
</style>
