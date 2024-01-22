import { defineComponent as s, computed as u, openBlock as p, createElementBlock as m, normalizeClass as k, renderSlot as y } from "vue";
import { useRouter as h } from "vue-router";
import g, { openConfirm as C } from "lkt-modal-confirm";
const v = ["href", "target", "download"], S = { name: "LktAnchor", inheritAttrs: !1 }, B = /* @__PURE__ */ s({
  ...S,
  props: {
    to: { type: [String, Object], default: void 0 },
    target: { type: String, default: "" },
    href: { type: String, default: "" },
    route: { type: String, default: "" },
    palette: { type: String, default: "" },
    download: { type: Boolean, default: !1 },
    downloadFileName: { type: String, default: "" },
    isBack: { type: Boolean, default: !1 },
    isVanilla: { type: Boolean, default: !1 },
    onClick: { type: [Function, void 0], default: void 0 },
    confirmModal: { type: String, default: "" },
    confirmModalKey: { type: String, default: "_" },
    confirmData: { type: Object, required: !1, default: () => ({}) }
  },
  emits: ["click"],
  setup(o, { emit: r }) {
    const t = o, l = r, i = h(), f = u(() => {
      const e = ["lkt-anchor"];
      return t.palette && e.push(`lkt-anchor--${t.palette}`), e.join(" ");
    }), c = (e) => {
      const a = () => {
        if (t.isBack) {
          e.preventDefault(), e.stopPropagation(), i.back();
          return;
        }
        if (typeof t.onClick == "function")
          return e.preventDefault(), e.stopPropagation(), t.onClick();
        if ((!t.href || t.href === "#") && e.preventDefault(), !t.isVanilla && typeof t.to < "u") {
          e.preventDefault(), e.stopPropagation(), i.push(t.to);
          return;
        }
        l("click", e);
      };
      if (t.confirmModal) {
        let n = typeof t.confirmData == "object" ? JSON.parse(JSON.stringify(t.confirmData)) : {};
        if (typeof n.onConfirm == "function") {
          let d = n.onConfirm.bind({});
          n.onConfirm = () => {
            d(), a();
          };
        } else
          n.onConfirm = () => {
            a();
          };
        return C(t.confirmModal, t.confirmModalKey, n);
      }
      a();
    };
    return (e, a) => (p(), m("a", {
      class: k(f.value),
      href: o.href,
      target: o.target,
      download: o.downloadFileName,
      onClick: c
    }, [
      y(e.$slots, "default")
    ], 10, v));
  }
}), w = {
  install: (o, r) => {
    o.component("lkt-anchor") === void 0 && o.component("lkt-anchor", B), o.component("lkt-modal-confirm") === void 0 && o.use(g);
  }
};
export {
  w as default
};
