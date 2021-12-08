import { SET_ENTITY, ADD_ENTITY } from "../mutation-types";

const actions = {
  async login({ dispatch }, credentials) {
    const data = await this.$api.auth.login(credentials);
    this.$jwt.saveToken(data.token);
    this.$api.auth.setAuthHeader();
    dispatch("getMe");
  },

  async logout({ commit }, sendRequest = true) {
    if (sendRequest) {
      await this.$api.auth.logout();
    }
    this.$jwt.destroyToken();
    this.$api.auth.setAuthHeader();
    commit(SET_ENTITY, { entity: "isAuthenticated", value: false });
    commit(SET_ENTITY, { entity: "user", value: null });
  },

  async getMe({ commit, dispatch }) {
    try {
      const data = await this.$api.auth.getMe();
      commit(SET_ENTITY, { entity: "isAuthenticated", value: true });
      commit(SET_ENTITY, { entity: "user", value: data });
      commit(SET_ENTITY, { entity: "phone", value: data.phone });
    } catch {
      dispatch("logout", false);
    }
  },
};

const mutations = {
  [SET_ENTITY](state, { entity, value }) {
    state[entity] = value;
  },
  [ADD_ENTITY](state, { entity, value }) {
    state[entity] = [...state[entity], value];
  },
};

const getters = {
  getUserCartData: ({ phone, user }, getters, { Addresses }) => {
    const data = {
      phone,
      userId: user?.id || null,
    };

    const orderReceiptType = Addresses.orderReceiptType;
    const existAddress = Addresses.addresses.find(
      (address) => +address.id === +orderReceiptType
    );

    if (existAddress || orderReceiptType === "newAddress") {
      data.address = existAddress || Addresses.addressForm;
    }

    return data;
  },
};

export default {
  namespaced: true,
  state: {
    user: null,
    isAuthenticated: false,
    phone: "",
  },
  actions,
  mutations,
  getters,
};
