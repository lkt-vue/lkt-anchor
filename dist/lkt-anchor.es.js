import { defineComponent as p, computed as u, openBlock as m, createElementBlock as d, normalizeClass as k, renderSlot as y } from "vue";
import { useRouter as h } from "vue-router";
import { openConfirm as g } from "lkt-modal-confirm";
const C = ["href", "target"], S = { name: "LktAnchor", inheritAttrs: !1 }, v = /* @__PURE__ */ p({
  ...S,
  props: {
    to: { type: [String, Object], default: void 0 },
    target: { type: String, default: "" },
    href: { type: String, default: "" },
    route: { type: String, default: "" },
    palette: { type: String, default: "" },
    isBack: { type: Boolean, default: !1 },
    isVanilla: { type: Boolean, default: !1 },
    onClick: { type: [Function, void 0], default: void 0 },
    confirmModal: { type: String, default: "" },
    confirmModalKey: { type: String, default: "_" },
    confirmData: { type: Object, required: !1, default: () => ({}) }
  },
  emits: ["click"],
  setup(o, { emit: a }) {
    const t = o, l = a, i = h(), f = u(() => {
      const e = ["lkt-anchor"];
      return t.palette && e.push(`lkt-anchor--${t.palette}`), e.join(" ");
    }), c = (e) => {
      const r = () => {
        if (t.isBack) {
          e.preventDefault(), e.stopPropagation(), i.back();
          return;
        }
        if (typeof t.onClick == "function")
          return e.preventDefault(), e.stopPropagation(), t.onClick();
        if (!t.isVanilla) {
          e.preventDefault(), e.stopPropagation(), i.push(t.to);
          return;
        }
        (!t.href || t.href === "#") && e.preventDefault(), l("click", e);
      };
      if (t.confirmModal) {
        let n = typeof t.confirmData == "object" ? JSON.parse(JSON.stringify(t.confirmData)) : {};
        if (typeof n.onConfirm == "function") {
          let s = n.onConfirm.bind({});
          n.onConfirm = () => {
            s(), r();
          };
        } else
          n.onConfirm = () => {
            r();
          };
        return g(t.confirmModal, t.confirmModalKey, n);
      }
      r();
    };
    return (e, r) => (m(), d("a", {
      class: k(f.value),
      href: o.href,
      target: o.target,
      onClick: c
    }, [
      y(e.$slots, "default")
    ], 10, C));
  }
}), b = {
  install: (o, a) => {
    o.component("lkt-anchor", v);
  }
};
export {
  b as default
};
