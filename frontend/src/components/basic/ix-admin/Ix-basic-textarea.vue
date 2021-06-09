<template>
  <textarea
    :rows="inputRows"
    :name="inputName"
    :id="inputName"
    :class="className"
    :value="value"
    @input="updateValue($event.target.value)"
  ></textarea>
</template>

<script>
export default {
  name: "IxTextarea",
  components: {},
  props: ["className", "inputName", "inputRows", "value"],
  computed: {},
  methods: {
    updateValue(value) {
      this.$emit("input", value);
    }
  }
};
</script>
<style scoped>
textarea {
  height: auto !important;
}
</style>
