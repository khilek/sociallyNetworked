<script setup>
import { Fun } from "../models/Fun.js";



defineProps({fun: {type: Fun, required: true}})




</script>


<template>
  <img :src="fun.tall" :alt="fun.title">
</template>


<style lang="scss" scoped>

</style>