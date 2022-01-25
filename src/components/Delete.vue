<template>
    <button v-on:click="callback">Click me</button>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    name: "Delete",
    props: {
        callback: Function
    }
})
</script>

<style >

</style>