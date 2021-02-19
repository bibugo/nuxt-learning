export const state = () => ({
    leftDrawer: true,
    rightDrawer: false,
    menuItems: [],
})

export const mutations = {
    updateLeftDrawer(state, value) {
        state.leftDrawer = value
    },
    toggleLeftDrawer(state) {
        state.leftDrawer = !state.leftDrawer
    },
    updateRightDrawer(state, value) {
        state.rightDrawer = value
    },
    toggleRightDrawer(state) {
        state.rightDrawer = !state.rightDrawer
    },
    updateMenuItems(state, value) {
        state.menuItems = value
    },
}

export const actions = {
    async loadMeta({ commit }) {
        const meta = await this.$axios.$get("/api/auth/meta");
        commit('updateMenuItems', meta.menuitems)
    },
}