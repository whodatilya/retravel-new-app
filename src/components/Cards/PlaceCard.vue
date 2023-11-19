<template>
  <div class="card__wrapper">
    todo
  </div>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PlaceCard"
});
</script>

<style scoped lang="sass">
.card
  &__wrapper
    // переделать
    background-image: url("@/assets/images/cardImages/image1.svg")
    width: 100px
    height: 100px
    background-size: cover
</style>