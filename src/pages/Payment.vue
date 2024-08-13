<template>
  <div class="h-[100vh] flex flex-col justify-center items-center">
    <form
      class="payform-tinkoff"
      name="payform-tinkoff"
      onsubmit="pay(this); return false;"
    >
      <input
        class="payform-tinkoff-row"
        type="hidden"
        name="terminalkey"
        value="1722867888655DEMO"
      />
      <input
        class="payform-tinkoff-row"
        type="hidden"
        name="frame"
        value="false"
      />
      <input
        class="payform-tinkoff-row"
        type="hidden"
        name="language"
        value="ru"
      />
      <label for="price">Сумма заказа: </label>
      <input
        class="payform-tinkoff-row"
        type="text"
        placeholder="Сумма заказа"
        :value="parsedData?.price"
        name="amount"
        required
      />
      <input
        class="payform-tinkoff-row"
        type="hidden"
        placeholder="Номер заказа"
        name="order"
      />
      <label for="price">Описание заказа: </label>
      <input
        class="payform-tinkoff-row"
        type="text"
        :value="parsedData?.description"
        placeholder="Описание заказа"
        name="description"
      />
      <label for="price">ФИО: </label>
      <input
        class="payform-tinkoff-row"
        type="text"
        :value="parsedData?.name"
        placeholder="ФИО плательщика"
        name="name"
      />
      <label for="price">Email: </label>
      <input
        class="payform-tinkoff-row"
        type="email"
        :value="parsedData?.email"
        placeholder="E-mail"
        name="email"
      />
      <label for="price">Контактный телефон: </label>
      <input
        class="payform-tinkoff-row"
        type="tel"
        :value="parsedData?.phone"
        placeholder="Контактный телефон"
        name="phone"
      />
      <input
        class="payform-tinkoff-row payform-tinkoff-btn"
        type="submit"
        value="Оплатить"
      />
    </form>
  </div>
</template>
<script setup>
import { computed, onMounted, watch } from 'vue'

// eslint-disable-next-line no-undef
const props = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

const parsedData = computed(() => JSON.parse(props.data))

onMounted(async () => {
  //   // Dynamically load the Tinkoff script
  const script = document.createElement('script')
  script.src = 'https://securepay.tinkoff.ru/html/payForm/js/tinkoff_v2.js'
  script.async = true
  document.head.appendChild(script)
})
</script>

<style scoped>
.payform-tinkoff {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin: 2px auto;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  max-width: 400px;
}
.payform-tinkoff-row {
  width: 300px;
  margin: 2px;
  border-radius: 4px;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  -webkit-transition: 0.3s;
  -o-transition: 0.3s;
  transition: 0.3s;
  border: 1px solid #dfe3f3;
  padding: 15px;
  outline: none;
  background-color: #dfe3f3;
  font-size: 15px;
}

.payform-tinkoff-row_disabled {
  background-color: #c0c2d1;
}

.payform-tinkoff-row:focus {
  background-color: #ffffff;
  border: 1px solid #616871;
  border-radius: 4px;
}
.payform-tinkoff-btn {
  background-color: #fbc520;
  border: 1px solid #fbc520;
  color: #3c2c0b;
}
.payform-tinkoff-btn:hover {
  background-color: #fab619;
  border: 1px solid #fab619;
}
</style>
