import { defineComponent as y, computed as u, openBlock as c, createElementBlock as d, normalizeClass as p, renderSlot as m } from "vue";
import { useRouter as v } from "vue-router";
import C, { openConfirm as g } from "lkt-modal-confirm";
const B = ["href", "target", "download"], D = ["href", "target"], w = /* @__PURE__ */ y({
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
    imposter: { type: Boolean, default: !1 },
    isVanilla: { type: Boolean, default: !1 },
    onClick: { type: Function, default: void 0 },
    confirmModal: { default: "" },
    confirmModalKey: { default: "_" },
    confirmData: { default: () => ({}) }
  },
  emits: ["click"],
  setup(o, { emit: l }) {
    const t = o, h = l, r = v(), f = u(() => {
      const e = [];
      return t.imposter || e.push("lkt-anchor"), t.class && e.push(t.class), t.palette && e.push(`lkt-anchor--${t.palette}`), t.to && r.currentRoute.value.path === t.to && e.push("lkt-anchor-active"), e.join(" ");
    }), i = u(() => t.href !== "" ? t.href : typeof t.to == "string" && t.to !== "" ? t.to : ""), s = (e) => {
      const n = () => {
        if (t.isBack) {
          e.preventDefault(), e.stopPropagation(), r.back();
          return;
        }
        if (typeof t.onClick == "function")
          return e.preventDefault(), e.stopPropagation(), t.onClick();
        if (!t.href) {
          if ((!t.href || t.href === "#") && e.preventDefault(), !t.isVanilla && typeof t.to < "u") {
            e.preventDefault(), e.stopPropagation(), r.push(t.to);
            return;
          }
          if (!t.isVanilla && typeof t.route < "u") {
            e.preventDefault(), e.stopPropagation(), r.push(t.to);
            return;
          }
          h("click", e);
        }
      };
      if (t.confirmModal) {
        let a = typeof t.confirmData == "object" ? JSON.parse(JSON.stringify(t.confirmData)) : {};
        if (typeof a.onConfirm == "function") {
          let k = a.onConfirm.bind({});
          a.onConfirm = () => {
            k(), n();
          };
        } else
          a.onConfirm = () => {
            n();
          };
        return g(t.confirmModal, t.confirmModalKey, a);
      }
      n();
    };
    return (e, n) => e.download ? (c(), d("a", {
      key: 0,
      class: p(f.value),
      href: i.value,
      target: e.target,
      download: e.downloadFileName,
      onClick: s
    }, [
      m(e.$slots, "default")
    ], 10, B)) : (c(), d("a", {
      key: 1,
      class: p(f.value),
      href: i.value,
      target: e.target,
      onClick: s
    }, [
      m(e.$slots, "default")
    ], 10, D));
  }
}), P = {
  install: (o, l) => {
    o.component("lkt-anchor") === void 0 && o.component("lkt-anchor", w), o.component("lkt-modal-confirm") === void 0 && o.use(C);
  }
};
export {
  P as default
};
