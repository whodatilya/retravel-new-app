<template>
  <main class="main__wrapper mt-9 m-10 p-6">
    <div class="flex flex-col justify-between color-main-black">
      <div class="flex flex-row justify-between">
        <div class="font-bold fs-28">Добрый день!</div>
        <search placeholder-value="Поиск по направлениям..."/>
      </div>
      <div class="fs-12 w-[16rem]">Добро пожаловать на туристическую платформу Re:Travel!</div>
    </div>
    <div class="cards my-2.5">
      <place-card
        v-for="card in placeCards"
        :key="card.id"
        :card-data="card"
      />
    </div>
    <div class="popular br-20 my-2.5">
      <div class="flex flex-row justify-between items-center">
        <div class="fs-18 font-semibold color-main-black">
          Популярные маршруты
        </div>
        <div class="filter-button flex flex-row p-1.5 br-8 gap-0.5">
          <img :src="iconFilter" alt="">
          <div class="color-main-gray fs-12">Фильтр</div>
        </div>
      </div>
      <div class="color-main-gray fs-12">
<!--        Сделать pluralize-->
        Найдено {{ popularCards.length }} направлений
      </div>
      <popular-card
        v-for="card in popularCards"
        :key="card.id"
        :card-data="card"
      />
    </div>
    <div class="footer-banner color-semi-white my-2.5">
      <img :src="iconBanner" alt="">
      <div class="text text-end">
        <div class="fs-16 font-semibold">Присоединяйтесь к лучшим турам!</div>
        <div class="fs-12 font-normal">Найдите наилучший маршрут для уникального путешествия</div>
      </div>
    </div>
  </main>
  <div class="flex flex-col ml-2 mt-9 max-w-[20%]">
    <div class="fs-18 font-semibold color-main-black">Карта достопримечательностей</div>
    <div>Тут карта должна быть?</div>
    <div class="flex flex-col gap-4">
      <div class="fs-18 color-main-black font-semibold">Избранные локации</div>
      <popular-card
        v-for="card in popularCards"
        :key="card.id"
        :card-data="card"
        :is-tiny="true"
      />
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import iconSearch from '@/assets/images/iconSearch.svg'
import iconBanner from '@/assets/images/iconBanner.svg'
import iconFilter from '@/assets/images/iconFilter.svg'

import elbrus from '@/assets/images/cardImages/places/elbrus.png'
import plato from '@/assets/images/cardImages/places/plato.jpg'
import kamchatka from '@/assets/images/cardImages/places/kamchatka.jpg'

import karelia from '@/assets/images/cardImages/popular/image1.svg'
import altay from '@/assets/images/cardImages/popular/image2.svg'
import hibins from '@/assets/images/cardImages/popular/image3.svg'

import PlaceCard from "@/components/Cards/PlaceCard.vue";
import PopularCard from "@/components/Cards/PopularCard.vue";
import Search from "@/components/Elements/Search.vue";
export default defineComponent({
  name: "Main",
  components: {
    Search,
    PlaceCard,
    PopularCard
  },
  data () {
    return {
      iconSearch,
      iconFilter,
      iconBanner,
      placeCards: [
        {
          id: 0,
          icon: elbrus,
          title: 'Эльбрус',
          location: 'Кабардино-Балкария',
          rating: 3
        },
        {
          id: 1,
          icon: plato,
          title: 'Плато Путорана',
          location: 'Красноярский край',
          rating: 3
        },{
          id: 2,
          icon: kamchatka,
          title: 'Долина гейзеров',
          location: 'Камчатка',
          rating: 3
        }
      ],
      popularCards: [
        {
          id: 0,
          icon: karelia,
          title: 'Путешествие по Карелии',
          location: 'Россия, Карелия',
          rating: 3
        },
        {
          id: 1,
          icon: altay,
          title: 'Горный Алтай',
          location: 'Россия, Республика Алтай',
          rating: 4
        },
        {
          id: 2,
          icon: hibins,
          title: 'Хибины',
          location: 'Россия, Кольский полуостров',
          rating: 2
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
    flex-basis: 49%
    background: #DAE8DA
    border-radius: 25px
    border: 1px solid #4E944F80
.cards
  display: grid
  grid-template-columns: repeat(3, 1fr)
  grid-gap: 1.5rem
.popular
  display: flex
  flex-direction: column
  background: white
  padding: 1.5rem
.filter-button
  border: 1px solid #D0D0D0
  background: white
  &:hover
    cursor: pointer
    background: rgba(208, 208, 208, 0.25)
.footer-banner
  position: relative
  width: 100%
  img
    width: fill-available
  .text
    position: absolute
    top: 39px
    right: 20px
    display: flex
    flex-direction: column
    gap: 0.25rem
    width: 222px
</style>