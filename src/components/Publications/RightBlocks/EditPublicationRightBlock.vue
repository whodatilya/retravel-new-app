<template>
  <div class="content-wrapper basis-5/12 flex flex-col">
    <div class="flex flex-row justify-between items-center">
      <div class="fs-18 font-semibold">Мои публикации</div>
      <div class="filter-button flex flex-row p-1.5 br-8 gap-0.5">
        <img src="@/assets/images/iconFilter.svg" alt="" />
        <div class="color-main-gray fs-12">Фильтр</div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="sass" scoped>
.content-wrapper
  border-radius: 20px
  background: white
  padding: 1.5rem
  .button__edit
    color: white
    background: #4E944F
    border-radius: 8px
    padding: 0.5rem 0
  .description
    &-container
      padding: 0.75rem
      height: 100%
      border-radius: 8px
      border: 1px solid rgba(208, 208, 208, 0.50)
      background: rgba(250, 250, 250, 0.70)
    &-wrapper
      flex: 1 0 auto
</style>
