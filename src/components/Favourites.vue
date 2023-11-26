<template>
  <div class="component-container">
    <Search
      class="mt-6 ml-12"
      placeholder-value="Поиск публикаций..."
    />
    <div class="main-container my-3 mx-7 br-20 p-6">
      <favourite-card
        v-for="favourite in favourites"
        :favourite-data="favourite"
        :key="favourite.id"
      />
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import iconSearch from '@/assets/images/iconSearch.svg'
import caves from '@/assets/images/cardImages/favourites/caves.jpg'
import sochi from '@/assets/images/cardImages/favourites/sochi.jpg'
import geyser from '@/assets/images/cardImages/favourites/geyser.jpg'
import Search from "@/components/Elements/Search.vue";
import FavouriteCard from "@/components/Cards/FavouriteCard.vue";

export default defineComponent({
  name: "Favourites",
  components: { FavouriteCard, Search },
  data () {
    return {
      iconSearch,
      favourites: [
        {
          id: 0,
          icon: caves,
          title: 'Наименование1',
          location: 'Локация1'
        },
        {
          id: 1,
          icon: sochi,
          title: 'Наименование2',
          location: 'Локация2'
        },
        {
          id: 2,
          icon: geyser,
          title: 'Наименование3',
          location: 'Локация3'
        },
        {
          id: 3,
          icon: sochi,
          title: 'Наименование4',
          location: 'Локация4'
        }
      ]
    }
  }
});
</script>

<style scoped lang="sass">
.main-container
  display: grid
  grid-template-columns: repeat(3, 1fr)
  grid-template-rows: repeat(3, 1fr)
  height: 100%
  grid-gap: 1.5rem
  background: white
  box-shadow: 0 20px 50px 0 rgba(0, 0, 0, 0.05)
</style>