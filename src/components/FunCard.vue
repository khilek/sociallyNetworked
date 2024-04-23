<script setup>
import { computed, onBeforeMount, onMounted, ref } from "vue";
import { funsService } from "../services/FunsService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { AppState } from "../AppState.js";
import { Fun } from "../models/Fun.js";


const funns = computed(()=> AppState.funs)

defineProps({fun: Fun})

const funs = ref('')


async function getAds(){
try {
  await funsService.getAds()
} catch (error) {
  Pop.toast("Couldn't get Fun", 'error')
  logger.error(error)
}

}

onMounted(()=>{
  getAds()
})
</script>


<template>
<div class="container">
  <section class="row">
    <div class="col">

    </div>
  </section>
</div>
</template>


<style lang="scss" scoped>

</style>