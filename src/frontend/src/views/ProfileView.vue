<template>
  <div>
    <UserData />
    <AddressBlock />
  </div>
</template>
<script>
import UserData from "../modules/profile/UserData";
import AddressBlock from "../modules/address/AddressBlock";

export default {
  name: "ProfileView",
  components: { AddressBlock, UserData },
};
</script>
