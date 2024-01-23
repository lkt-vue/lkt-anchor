import { defineComponent as d, computed as u, openBlock as m, createElementBlock as p, normalizeClass as k, renderSlot as h } from "vue";
import { useRouter as C } from "vue-router";
import y, { openConfirm as v } from "lkt-modal-confirm";
const g = ["href", "target", "download"], B = /* @__PURE__ */ d({
  __name: "LktAnchor",
  props: {
    to: { default: "" },
    class: { default: "" },
    target: { default: "" },
    href: { default: "" },
    route: { default: "" },
    palette: { default: "" },
    download: { type: Boolean, default: !1 },
    downloadFileName: { default: "" },
    isBack: { type: Boolean, default: !1 },
    isVanilla: { type: Boolean, default: !1 },
    onClick: { type: Function, default: void 0 },
    confirmModal: { default: "" },
    confirmModalKey: { default: "_" },
    confirmData: { default: () => ({}) }
  },
  emits: ["click"],
  setup(e, { emit: l }) {
    const o = e, i = l, r = C(), f = u(() => {
      const t = ["lkt-anchor"];
      return o.class && t.push(o.class), o.palette && t.push(`lkt-anchor--${o.palette}`), t.join(" ");
    }), c = (t) => {
      const a = () => {
        if (o.isBack) {
          t.preventDefault(), t.stopPropagation(), r.back();
          return;
        }
        if (typeof o.onClick == "function")
          return t.preventDefault(), t.stopPropagation(), o.onClick();
        if ((!o.href || o.href === "#") && t.preventDefault(), !o.isVanilla && typeof o.to < "u") {
          t.preventDefault(), t.stopPropagation(), r.push(o.to);
          return;
        }
        i("click", t);
      };
      if (o.confirmModal) {
        let n = typeof o.confirmData == "object" ? JSON.parse(JSON.stringify(o.confirmData)) : {};
        if (typeof n.onConfirm == "function") {
          let s = n.onConfirm.bind({});
          n.onConfirm = () => {
            s(), a();
          };
        } else
          n.onConfirm = () => {
            a();
          };
        return v(o.confirmModal, o.confirmModalKey, n);
      }
      a();
    };
    return (t, a) => (m(), p("a", {
      class: k(f.value),
      href: t.href,
      target: t.target,
      download: t.downloadFileName,
      onClick: c
    }, [
      h(t.$slots, "default")
    ], 10, g));
  }
}), _ = {
  install: (e, l) => {
    e.component("lkt-anchor") === void 0 && e.component("lkt-anchor", B), e.component("lkt-modal-confirm") === void 0 && e.use(y);
  }
};
export {
  _ as default
};
