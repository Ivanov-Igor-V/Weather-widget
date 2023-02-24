import { defineStore } from "pinia";
export const useLoading = defineStore({
  id: "loading",
  state: () => ({ isLoading: false }),
  getters: {
    getLoading: (state) => state.isLoading,
  },
  actions: {
    switchLoading() {
      this.isLoading = !this.isLoading;
    },
  },
});
