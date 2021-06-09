<template>
  <input :type="inputType" :name="inputName" :id="inputName" :placeholder="inputPlaceholder" :class="className" :value="value" @input="updateValue($event.target.value)" />
</template>

<script>
    export default {
        name: "IxInput",
        components: {},
        props: ['inputType', 'className', 'inputName', 'inputPlaceholder', 'value'],
        computed: {},
        methods : {
          updateValue(value) {
            this.$emit('input', value);
          }
        }
    }
</script>
<style scoped>
</style>>
