<script setup lang="ts">
import gsap from "gsap";
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {onMounted, ref} from "vue";

const c = ref()

onMounted(() => {
  setTimeout(() => {
    gsap.registerPlugin(ScrollTrigger)
    gsap.to('.c', {
      scrollTrigger: {
        start: "top center",
        trigger: '.c',
        markers: false,
        scrub: true,
        pin:true,
        toggleActions: "restart pause reverse pause"
      },
      x: 400,
      rotation: 360,
      duration: 1,
    })
  }, 500)
})


</script>

<template>
  <div class="h-screen flex-row align-content-center w-screen">
    <div class="c w-20 h-20 bg-red-500" ref="c">
    </div>
  </div>
</template>

<style scoped>

</style>