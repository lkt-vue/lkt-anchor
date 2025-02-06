/* eslint-disable import/prefer-default-export */
import {default as anchor} from "./lib-components/LktAnchor.vue";
import {App, Plugin} from "vue";
import LktModalConfirm from "lkt-modal-confirm";
import "../styles.css";
export {AnchorType} from "lkt-vue-kernel";

const LktAnchor: Plugin = {
    install: (app: App, options: any) => {
        // Register plugin components
        if (app.component('lkt-anchor') === undefined) app.component('lkt-anchor', anchor);

        // Register additional components
        if (app.component('lkt-modal-confirm') === undefined)  app.use(LktModalConfirm);
    },
};

export default LktAnchor;