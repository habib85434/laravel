<template>
  <Dropdown
    class="custom-dropdown"
    :options="data"
    v-on:selected="validateSelection"
    v-on:filter="getDropdownValues"
    :disabled="false"
    :name="inputName"
    :maxItem="10"
    :placeholder="placeholder"
  >
  </Dropdown>
</template>

<script>
import Dropdown from "vue-simple-search-dropdown";

export default {
  name: "IxSearchDropdown",
  components: { Dropdown },
  props: ["inputName", "data", "placeholder"],
  // computed: {},
};
</script>

<style scoped>
/* .custom-dropdown {
  font-size: 0.6em;
  border: 1px solid #666;
  height: 2.7em;
  border-radius: 0.25rem;
}

.dropdown-input {
  min-width: 0 !important;
} */
</style>
