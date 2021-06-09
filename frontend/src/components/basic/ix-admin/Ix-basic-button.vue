<template>
  <button :type="btnType" :class="className"><slot></slot></button>
</template>

<script>
    export default {
        name: "IxButton",
        components: {},
        props: ['btnType', 'className'],
        computed: {},
    }
</script>
<style scoped>
.btn-purple{
  background:#650CB4;
  color:#fff;
}
.btn-purple:hover{
  background:#550CB4;
  color:#fff;
}
</style>>
