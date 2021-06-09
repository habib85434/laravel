<template>
    <div class="custom-control custom-radio custom-control-inline">
      <input type="radio" :name="inputName" class="custom-control-input" :id="inputId">
      <label class="custom-control-label" :for="inputId"></label>
    </div>
    <!-- <div class="custom-control custom-radio">
        <input class="custom-control-input" type="radio" :id="inputId" :value="value">
        <input type="radio" class="custom-control-input" :name="inputName" :id="inputId" :value="value" @input="updateValue($event.target.value)">
        <label class="custom-control-label" :for="inputId"><slot></slot></label>
    </div> -->
</template>

<script>
    export default {
        name: "IxRadioButton",
        components: {},
        props: ['inputId', 'value', 'inputName'],
        computed: {},
        // methods : {
        //   updateValue(value) {
        //       console.log(value);
        //     this.$emit('input', value);
        //   }
        // }
    }
</script>
<style scoped>
</style>>
