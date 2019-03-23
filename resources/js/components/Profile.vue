<template>
    <div class="profile">
        <h1>Profile</h1>

    </div>
</template>

<script>

    export default {
        name: 'Profile',
        data() {
            return {
                msg: ''
            }
        },
        computed: {

        },
        methods: {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: #42b983;
    }

    button {
        padding: 10px;
        margin-top: 30px;
        width: 100%;
        background: none;
        border: 1px solid lightgray;
        outline: 0;
        cursor: pointer;
    }
</style>
