<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>

        <select
          name="orderReceiptType"
          class="select"
          @change="setReceiptType($event.target.value)"
        >
          <option
            value="pickup"
            :selected="orderReceiptType === 'pickup'"
          >
            Заберу сам
          </option>
          <option
            value="newAddress"
            :selected="orderReceiptType === 'newAddress'"
          >
            Новый адрес
          </option>
          <option
            v-for="address in addresses"
            :key="address.id"
            :value="address.id"
            :selected="orderReceiptType === address.id"
          >
            {{ address.name }}
          </option>
        </select>
      </label>

      <label class="input input--big-label">
        <span>Контактный телефон:</span>
        <input
          type="text"
          name="tel"
          placeholder="+7 999-999-99-99"
          :value="userPhone"
          @change="
            setEntity({
              entity: 'phone',
              module: 'User',
              value: $event.target.value,
            })
          "
        />
      </label>

      <div
        v-show="orderReceiptType !== 'pickup'"
        class="cart-form__address"
      >
        <span class="cart-form__label">
          {{ addressForm.name }}
        </span>

        <div class="cart-form__input">
          <label class="input">
            <span>Улица*</span>
            <input
              type="text"
              name="street"
              :readonly="addressForm.id"
              :value="addressForm.street"
              @change="
                updateField({ field: 'street', value: $event.target.value })
              "
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Дом*</span>
            <input
              type="text"
              name="house"
              :value="addressForm.building"
              :readonly="addressForm.id"
              @change="
                updateField({ field: 'building', value: $event.target.value })
              "
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Квартира</span>
            <input
              type="text"
              name="apartment"
              :value="addressForm.flat"
              :readonly="addressForm.id"
              @change="
                updateField({ field: 'flat', value: $event.target.value })
              "
            />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { SET_ENTITY, UPDATE_ADDRESS_FIELD } from "../../store/mutation-types";

export default {
  name: "CartForm",
  computed: {
    ...mapState("User", ["phone"]),
    ...mapState("Addresses", ["addresses", "addressForm", "orderReceiptType"]),
    userPhone() {
      return this.phone || "";
    },
  },

  created() {
    this.$store.dispatch("Addresses/fetchAddresses");
  },

  methods: {
    ...mapActions("Addresses", ["setReceiptType"]),
    ...mapMutations("Addresses", { updateField: UPDATE_ADDRESS_FIELD }),
    ...mapMutations({ setEntity: SET_ENTITY }),
  },
};
</script>
<style lang="scss">
@import "~@/assets/scss/blocks/cart-form";
@import "~@/assets/scss/blocks/input";
@import "~@/assets/scss/blocks/select";
</style>
