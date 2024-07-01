import { defineComponent as C, ref as B, watch as D, computed as p, openBlock as m, createElementBlock as h, normalizeClass as v, renderSlot as k } from "vue";
import { useRouter as A, useRoute as b } from "vue-router";
import w, { openConfirm as M } from "lkt-modal-confirm";
const R = ["href", "target", "download"], P = ["href", "target"], _ = /* @__PURE__ */ C({
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
  emits: ["click", "active"],
  setup(a, { emit: i }) {
    const e = a, f = i, n = A(), r = B(e.isActive), s = () => {
      let t = n.currentRoute;
      r.value = t.value.path === e.to || t.value.path === e.href, f("active", r.value);
    }, y = b();
    D(y, (t) => {
      s();
    }, { flush: "pre", immediate: !0, deep: !0 });
    const u = p(() => {
      const t = [];
      return e.imposter || t.push("lkt-anchor"), e.class && t.push(e.class), e.disabled && t.push("is-disabled"), e.palette && t.push(`lkt-anchor--${e.palette}`), e.to && r.value && t.push("lkt-anchor-active"), e.isActive && !t.includes("lkt-anchor-active") && t.push("lkt-anchor-active"), t.join(" ");
    }), c = p(() => e.href !== "" ? e.href : typeof e.to == "string" && e.to !== "" ? e.to : ""), d = (t) => {
      if (e.disabled)
        return t.preventDefault(), t.stopPropagation(), !1;
      const l = () => {
        if (e.isBack) {
          t.preventDefault(), t.stopPropagation(), n.back();
          return;
        }
        if (typeof e.onClick == "function") {
          let o = e.onClick(t);
          if (!o)
            return t.preventDefault(), t.stopPropagation(), o;
        }
        if (!e.href) {
          if ((!e.href || e.href === "#") && t.preventDefault(), !e.isVanilla && typeof e.to < "u") {
            t.preventDefault(), t.stopPropagation(), n.push(e.to);
            return;
          }
          if (!e.isVanilla && typeof e.route < "u") {
            t.preventDefault(), t.stopPropagation(), n.push(e.to);
            return;
          }
          f("click", t);
        }
      };
      if (e.confirmModal) {
        let o = typeof e.confirmData == "object" ? JSON.parse(JSON.stringify(e.confirmData)) : {};
        if (typeof o.onConfirm == "function") {
          let g = o.onConfirm.bind({});
          o.onConfirm = () => {
            g(), l();
          };
        } else
          o.onConfirm = () => {
            l();
          };
        return M(e.confirmModal, e.confirmModalKey, o);
      }
      l();
    };
    return s(), (t, l) => t.download ? (m(), h("a", {
      key: 0,
      class: v(u.value),
      href: c.value,
      target: t.target,
      download: t.downloadFileName,
      onClick: d
    }, [
      k(t.$slots, "default")
    ], 10, R)) : (m(), h("a", {
      key: 1,
      class: v(u.value),
      href: c.value,
      target: t.target,
      onClick: d
    }, [
      k(t.$slots, "default")
    ], 10, P));
  }
}), S = {
  install: (a, i) => {
    a.component("lkt-anchor") === void 0 && a.component("lkt-anchor", _), a.component("lkt-modal-confirm") === void 0 && a.use(w);
  }
};
export {
  S as default
};
