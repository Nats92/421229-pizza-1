<template>
  <li class="ingredients__item">
    <AppDrag
      :transfer-data="currentIngredient"
      :draggable="currentIngredient.quantity < 3"
    >
      <IngredientName :ingredient="currentIngredient" />
    </AppDrag>
    <IngredientCounter :ingredient="currentIngredient" />
  </li>
</template>
<script>
import IngredientCounter from "@/common/components/IngredientCounter.vue";
import IngredientName from "@/common/components/IngredientName.vue";
import AppDrag from "@/common/components/AppDrag";
import { mapGetters } from "vuex";

export default {
  name: "BuilderIngredient",
  components: { AppDrag, IngredientCounter, IngredientName },
  props: {
    ingredient: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapGetters("Builder", ["activeIngredients"]),
    currentIngredient() {
      return (
        this.activeIngredients.find(
          (activeIngredient) => activeIngredient.id === this.ingredient.id
        ) || this.ingredient
      );
    },
  },
};
</script>
