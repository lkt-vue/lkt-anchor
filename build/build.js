import { defineComponent as h, computed as k, openBlock as s, createElementBlock as c, normalizeClass as d, renderSlot as u } from "vue";
import { useRouter as C } from "vue-router";
import y, { openConfirm as g } from "lkt-modal-confirm";
const v = ["href", "target", "download"], B = ["href", "target"], D = /* @__PURE__ */ h({
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
    const t = e, m = l, r = C(), f = k(() => {
      const o = ["lkt-anchor"];
      return t.class && o.push(t.class), t.palette && o.push(`lkt-anchor--${t.palette}`), o.join(" ");
    }), i = (o) => {
      const a = () => {
        if (t.isBack) {
          o.preventDefault(), o.stopPropagation(), r.back();
          return;
        }
        if (typeof t.onClick == "function")
          return o.preventDefault(), o.stopPropagation(), t.onClick();
        if (!t.href) {
          if ((!t.href || t.href === "#") && o.preventDefault(), !t.isVanilla && typeof t.to < "u") {
            o.preventDefault(), o.stopPropagation(), r.push(t.to);
            return;
          }
          m("click", o);
        }
      };
      if (t.confirmModal) {
        let n = typeof t.confirmData == "object" ? JSON.parse(JSON.stringify(t.confirmData)) : {};
        if (typeof n.onConfirm == "function") {
          let p = n.onConfirm.bind({});
          n.onConfirm = () => {
            p(), a();
          };
        } else
          n.onConfirm = () => {
            a();
          };
        return g(t.confirmModal, t.confirmModalKey, n);
      }
      a();
    };
    return (o, a) => o.download ? (s(), c("a", {
      key: 0,
      class: d(f.value),
      href: o.href,
      target: o.target,
      download: o.downloadFileName,
      onClick: i
    }, [
      u(o.$slots, "default")
    ], 10, v)) : (s(), c("a", {
      key: 1,
      class: d(f.value),
      href: o.href,
      target: o.target,
      onClick: i
    }, [
      u(o.$slots, "default")
    ], 10, B));
  }
}), b = {
  install: (e, l) => {
    e.component("lkt-anchor") === void 0 && e.component("lkt-anchor", D), e.component("lkt-modal-confirm") === void 0 && e.use(y);
  }
};
export {
  b as default
};
