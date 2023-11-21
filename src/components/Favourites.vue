<template>
  <div class="component-container m-12 br-25">
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
import favourite1 from '@/assets/images/cardImages/favourites/favourite1.svg'
import favourite2 from '@/assets/images/cardImages/favourites/favourite2.svg'
import favourite3 from '@/assets/images/cardImages/favourites/favourite3.svg'
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
          icon: favourite1,
          title: 'Наименование1',
          location: 'Локация1'
        },
        {
          id: 1,
          icon: favourite2,
          title: 'Наименование2',
          location: 'Локация2'
        },
        {
          id: 2,
          icon: favourite3,
          title: 'Наименование3',
          location: 'Локация3'
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
  grid-gap: 1.5rem
  background: white
  box-shadow: 0 20px 50px 0 rgba(0, 0, 0, 0.05)
</style>