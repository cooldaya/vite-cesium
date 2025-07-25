<script setup>
import { ref } from "vue";
import HelloWorld from "./components/HelloWorld.vue";

const message = ref("Hello World");


console.log(message.value);
</script>

<template>
  <div>
    <HelloWorld msg="Vite + Vue" />
  </div>
</template>

<style scoped>
</style>
