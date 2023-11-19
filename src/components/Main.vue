<template>
  <main class="main__wrapper mt-9 m-10 p-7">
    <div class="flex flex-row justify-between color-main-black">
      <div class="flex flex-col">
        <div class="font-bold fs-28">Добрый день!</div>
        <div>Добро пожаловать на туристическую платформу Re:Travel!</div>
      </div>
      <div class="input-with-icon flex items-center">
        <img :src="iconSearch" alt="Поиск">
        <input type="text" class="fs-12" placeholder="Поиск по направлениям...">
      </div>
    </div>
    <div class="cards">
      <place-card />
    </div>
  </main>
</template>
<script>
import { defineComponent } from "vue";
import iconSearch from '@/assets/images/iconSearch.svg'
import PlaceCard from "@/components/Cards/PlaceCard.vue";
export default defineComponent({
  name: "Main",
  components: { PlaceCard },
  data () {
    return {
      iconSearch
    }
  }
});
</script>

<style scoped lang="sass">
.main
  &__wrapper
    display: flex
    flex-direction: column
    max-width: 60%
    background: #DAE8DA
    border-radius: 25px
    border: 1px solid #4E944F80
.input-with-icon
  display: flex
  img
    position: absolute
    padding-left: 0.3rem
  input
    display: flex
    outline: none
    padding: 0.7rem 2rem
    border-radius: 100px

</style>