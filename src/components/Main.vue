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
    <div class="cards my-6">
      <place-card
        v-for="card in cards"
        :key="card.id"
        :card-data="card"
      />
    </div>
  </main>
</template>
<script>
import { defineComponent } from "vue";
import iconSearch from '@/assets/images/iconSearch.svg'
import image1 from '@/assets/images/cardImages/image1.svg'
import image2 from '@/assets/images/cardImages/image2.svg'
import image3 from '@/assets/images/cardImages/image3.svg'
import PlaceCard from "@/components/Cards/PlaceCard.vue";
export default defineComponent({
  name: "Main",
  components: { PlaceCard },
  data () {
    return {
      iconSearch,
      cards: [
        {
          id: 0,
          icon: image1,
          title: 'Эльбрус',
          location: 'Кабардино-Балкария',
          rating: 3
        },
        {
          id: 1,
          icon: image2,
          title: 'Плато Путорана',
          location: 'Красноярский край',
          rating: 3
        },{
          id: 2,
          icon: image3,
          title: 'Долина гейзеров',
          location: 'Камчатка',
          rating: 3
        }
      ]
    }
  }
});
</script>

<style scoped lang="sass">
.main
  &__wrapper
    display: flex
    flex-direction: column
    max-width: 45%
    background: #DAE8DA
    border-radius: 25px
    border: 1px solid #4E944F80
.cards
  display: grid
  grid-template-columns: repeat(3, 1fr)
  grid-gap: 1.5rem
</style>