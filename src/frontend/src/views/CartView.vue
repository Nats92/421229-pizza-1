<template>
  <main class="content cart">
    <div class="container">
      <div class="cart__title">
        <h1 class="title title--big">Корзина</h1>
      </div>
      <CartContent v-if="pizzas.length" />
      <CartEmpty v-else />
    </div>
  </main>
</template>
<script>
import CartContent from "@/modules/cart/CartContent";
import CartEmpty from "@/modules/cart/CartEmpty";
import { mapState } from "vuex";

export default {
  name: "CartView",
  components: { CartContent, CartEmpty },
  computed: mapState("Cart", ["pizzas"]),
};
</script>
<style lang="scss">
@import "~@/assets/scss/layout/container";
@import "~@/assets/scss/blocks/cart";
@import "~@/assets/scss/blocks/title";
</style>
