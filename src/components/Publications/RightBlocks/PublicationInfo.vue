<template>
  <div class="content-wrapper flex flex-col">
    <div class="flex flex-row justify-between">
      <div class="flex gap-8 pb-10">
        <img src="@/assets/images/iconUser.svg" alt="" />
        <div class="flex flex-col fs-18 font-medium">
          <span>Имя</span>
          <span>Фамилия</span>
        </div>
      </div>
      <div class="flex flex-row items-center gap-1.5">
        <img src="@/assets/images/cardImages/iconStarBig.svg" alt="рейтинг" />
        <span class="fs-18 font-medium">4.8</span>
      </div>
    </div>
    <span class="fs-16 font-semibold">Наименование</span>
    <span class="fs-12 font-light color-main-gray pb-5">Локация</span>
    <button class="button__edit fs-14 font-semibold">
      Редактировать публикацию
    </button>
    <div class="flex flex-col description-wrapper mt-4">
      <span class="fs-16 font-semibold">Описание</span>
      <div class="description-container mt-2">
        тест тест тест тест тест тест тест тест тест тест тест тест
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
