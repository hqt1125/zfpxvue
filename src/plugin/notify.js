import modal from './notify.vue'
let notify = {};
notify.install = function (vue, options = { delay: 3000 }) {
    //console.log(vue, options)
    vue.prototype.$notity = function (message, opt = {}) {
        if (notify.el) return
        options = { ...options, ...opt }
        let V = vue.extend(modal);
        let vm = new V;
        let odiv = document.createElement('div');
        vm.$mount(odiv);
        vm.value = message;
        notify.el = vm.$el;
        document.body.appendChild(vm.$el);
        setTimeout(() => {
            document.body.removeChild(vm.$el);
            notify.el = null;
        }, options.delay)
    }
}
export default notify;