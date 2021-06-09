<template>
  <div class="custom-control custom-checkbox mr-sm-2">
      <input type="checkbox" class="custom-control-input" :id="inputId" :v-model="inputName" :value="inputValue">
      <label class="custom-control-label" :for="inputId"><slot></slot></label>
    </div>
</template>

<script>
    export default {
        name: "IxCheckbox",
        components: {},
        props: ['inputId', 'inputName', 'inputValue'],
        computed: {},
    }
</script>
<style scoped>
</style>>
