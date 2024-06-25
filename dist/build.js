import { defineComponent as v, computed as u, openBlock as c, createElementBlock as d, normalizeClass as p, renderSlot as m } from "vue";
import { useRouter as y } from "vue-router";
import g, { openConfirm as C } from "lkt-modal-confirm";
const B = ["href", "target", "download"], D = ["href", "target"], b = /* @__PURE__ */ v({
  __name: "LktAnchor",
  props: {
    to: { default: "" },
    class: { default: "" },
    target: { default: "" },
    href: { default: "" },
    route: { default: "" },
    palette: { default: "" },
    isActive: { type: Boolean, default: !1 },
    download: { type: Boolean, default: !1 },
    downloadFileName: { default: "" },
    isBack: { type: Boolean, default: !1 },
    imposter: { type: Boolean, default: !1 },
    isVanilla: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    onClick: { type: Function, default: void 0 },
    confirmModal: { default: "" },
    confirmModalKey: { default: "_" },
    confirmData: { default: () => ({}) }
  },
  emits: ["click"],
  setup(a, { emit: r }) {
    const t = a, h = r, l = y(), i = u(() => {
      const e = [];
      return t.imposter || e.push("lkt-anchor"), t.class && e.push(t.class), t.disabled && e.push("is-disabled"), t.palette && e.push(`lkt-anchor--${t.palette}`), t.to && l.currentRoute.value.path === t.to && e.push("lkt-anchor-active"), t.isActive && !e.includes("lkt-anchor-active") && e.push("lkt-anchor-active"), e.join(" ");
    }), f = u(() => t.href !== "" ? t.href : typeof t.to == "string" && t.to !== "" ? t.to : ""), s = (e) => {
      if (t.disabled)
        return e.preventDefault(), e.stopPropagation(), !1;
      const n = () => {
        if (t.isBack) {
          e.preventDefault(), e.stopPropagation(), l.back();
          return;
        }
        if (typeof t.onClick == "function") {
          let o = t.onClick(e);
          if (!o)
            return e.preventDefault(), e.stopPropagation(), o;
        }
        if (!t.href) {
          if ((!t.href || t.href === "#") && e.preventDefault(), !t.isVanilla && typeof t.to < "u") {
            e.preventDefault(), e.stopPropagation(), l.push(t.to);
            return;
          }
          if (!t.isVanilla && typeof t.route < "u") {
            e.preventDefault(), e.stopPropagation(), l.push(t.to);
            return;
          }
          h("click", e);
        }
      };
      if (t.confirmModal) {
        let o = typeof t.confirmData == "object" ? JSON.parse(JSON.stringify(t.confirmData)) : {};
        if (typeof o.onConfirm == "function") {
          let k = o.onConfirm.bind({});
          o.onConfirm = () => {
            k(), n();
          };
        } else
          o.onConfirm = () => {
            n();
          };
        return C(t.confirmModal, t.confirmModalKey, o);
      }
      n();
    };
    return (e, n) => e.download ? (c(), d("a", {
      key: 0,
      class: p(i.value),
      href: f.value,
      target: e.target,
      download: e.downloadFileName,
      onClick: s
    }, [
      m(e.$slots, "default")
    ], 10, B)) : (c(), d("a", {
      key: 1,
      class: p(i.value),
      href: f.value,
      target: e.target,
      onClick: s
    }, [
      m(e.$slots, "default")
    ], 10, D));
  }
}), P = {
  install: (a, r) => {
    a.component("lkt-anchor") === void 0 && a.component("lkt-anchor", b), a.component("lkt-modal-confirm") === void 0 && a.use(g);
  }
};
export {
  P as default
};
