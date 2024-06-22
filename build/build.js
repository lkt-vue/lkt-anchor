import { defineComponent as h, computed as k, openBlock as s, createElementBlock as u, normalizeClass as c, renderSlot as d } from "vue";
import { useRouter as y } from "vue-router";
import C, { openConfirm as v } from "lkt-modal-confirm";
const g = ["href", "target", "download"], B = ["href", "target"], D = /* @__PURE__ */ h({
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
    const e = o, p = l, r = y(), f = k(() => {
      const t = [];
      return e.imposter || t.push("lkt-anchor"), e.class && t.push(e.class), e.palette && t.push(`lkt-anchor--${e.palette}`), e.to && r.currentRoute.value.path === e.to && t.push("lkt-anchor-active"), t.join(" ");
    }), i = (t) => {
      const n = () => {
        if (e.isBack) {
          t.preventDefault(), t.stopPropagation(), r.back();
          return;
        }
        if (typeof e.onClick == "function")
          return t.preventDefault(), t.stopPropagation(), e.onClick();
        if (!e.href) {
          if ((!e.href || e.href === "#") && t.preventDefault(), !e.isVanilla && typeof e.to < "u") {
            t.preventDefault(), t.stopPropagation(), r.push(e.to);
            return;
          }
          if (!e.isVanilla && typeof e.route < "u") {
            t.preventDefault(), t.stopPropagation(), r.push(e.to);
            return;
          }
          p("click", t);
        }
      };
      if (e.confirmModal) {
        let a = typeof e.confirmData == "object" ? JSON.parse(JSON.stringify(e.confirmData)) : {};
        if (typeof a.onConfirm == "function") {
          let m = a.onConfirm.bind({});
          a.onConfirm = () => {
            m(), n();
          };
        } else
          a.onConfirm = () => {
            n();
          };
        return v(e.confirmModal, e.confirmModalKey, a);
      }
      n();
    };
    return (t, n) => t.download ? (s(), u("a", {
      key: 0,
      class: c(f.value),
      href: t.href,
      target: t.target,
      download: t.downloadFileName,
      onClick: i
    }, [
      d(t.$slots, "default")
    ], 10, g)) : (s(), u("a", {
      key: 1,
      class: c(f.value),
      href: t.href,
      target: t.target,
      onClick: i
    }, [
      d(t.$slots, "default")
    ], 10, B));
  }
}), P = {
  install: (o, l) => {
    o.component("lkt-anchor") === void 0 && o.component("lkt-anchor", D), o.component("lkt-modal-confirm") === void 0 && o.use(C);
  }
};
export {
  P as default
};
