import { defineComponent as h, computed as k, openBlock as s, createElementBlock as u, normalizeClass as c, renderSlot as d } from "vue";
import { useRouter as y } from "vue-router";
import C, { openConfirm as v } from "lkt-modal-confirm";
const g = ["href", "target", "download"], D = ["href", "target"], B = /* @__PURE__ */ h({
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
    const o = e, p = l, r = y(), f = k(() => {
      const t = ["lkt-anchor"];
      return o.class && t.push(o.class), o.palette && t.push(`lkt-anchor--${o.palette}`), o.to && r.currentRoute.value.path === o.to && t.push("lkt-anchor-active"), t.join(" ");
    }), i = (t) => {
      const n = () => {
        if (o.isBack) {
          t.preventDefault(), t.stopPropagation(), r.back();
          return;
        }
        if (typeof o.onClick == "function")
          return t.preventDefault(), t.stopPropagation(), o.onClick();
        if (!o.href) {
          if ((!o.href || o.href === "#") && t.preventDefault(), !o.isVanilla && typeof o.to < "u") {
            t.preventDefault(), t.stopPropagation(), r.push(o.to);
            return;
          }
          if (!o.isVanilla && typeof o.route < "u") {
            t.preventDefault(), t.stopPropagation(), r.push(o.to);
            return;
          }
          p("click", t);
        }
      };
      if (o.confirmModal) {
        let a = typeof o.confirmData == "object" ? JSON.parse(JSON.stringify(o.confirmData)) : {};
        if (typeof a.onConfirm == "function") {
          let m = a.onConfirm.bind({});
          a.onConfirm = () => {
            m(), n();
          };
        } else
          a.onConfirm = () => {
            n();
          };
        return v(o.confirmModal, o.confirmModalKey, a);
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
    ], 10, D));
  }
}), P = {
  install: (e, l) => {
    e.component("lkt-anchor") === void 0 && e.component("lkt-anchor", B), e.component("lkt-modal-confirm") === void 0 && e.use(C);
  }
};
export {
  P as default
};
