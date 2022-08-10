/* eslint-disable import/prefer-default-export */
import {default as anchor} from "./lib-components/LktAnchor.vue";
import {App} from "vue";

const LktAnchor = {
    install: (app: App, options: any) => {
        app.component('lkt-anchor', anchor);
    },
};

export default LktAnchor;