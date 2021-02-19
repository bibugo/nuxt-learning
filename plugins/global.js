export default ({ app, store }, inject) => {
    // Inject $hello(msg) in Vue, context and store.
    inject('global', {
        snackIt: (snack) => {
            store.commit("snackit/snackIt", snack);
        },

    })
};
