import { defineComponent as A, ref as h, watch as D, computed as v, openBlock as k, createElementBlock as y, normalizeClass as C, renderSlot as g } from "vue";
import { useRouter as b, useRoute as M } from "vue-router";
import R, { openConfirm as w } from "lkt-modal-confirm";
const _ = ["href", "target", "download"], N = ["href", "target"], F = /* @__PURE__ */ A({
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
  setup(a, { emit: f }) {
    const e = a, s = f, r = b(), i = h(e.isActive), u = h(!1), c = () => {
      let t = r.currentRoute;
      i.value = t.value.path === e.to || t.value.path === e.href, s("active", i.value);
      let n = (o, l) => l === "" ? o === "" : l === "/" ? o === "/" : o.startsWith(l);
      u.value = n(t.value.path, e.to);
    }, B = M();
    D(B, (t) => {
      c();
    }, { flush: "pre", immediate: !0, deep: !0 });
    const d = v(() => {
      const t = [];
      return e.imposter || t.push("lkt-anchor"), e.class && t.push(e.class), e.disabled && t.push("is-disabled"), e.palette && t.push(`lkt-anchor--${e.palette}`), e.to && (i.value && t.push("lkt-anchor-active"), u.value && t.push("lkt-anchor-active-parent")), e.isActive && !t.includes("lkt-anchor-active") && t.push("lkt-anchor-active"), t.join(" ");
    }), p = v(() => e.href !== "" ? e.href : typeof e.to == "string" && e.to !== "" ? e.to : ""), m = (t) => {
      if (e.disabled)
        return t.preventDefault(), t.stopPropagation(), !1;
      const n = () => {
        if (e.isBack) {
          t.preventDefault(), r.back();
          return;
        }
        if (typeof e.onClick == "function") {
          let o = e.onClick(t);
          if (!o)
            return t.preventDefault(), o;
        }
        if (!e.href) {
          if ((!e.href || e.href === "#") && t.preventDefault(), !e.isVanilla && typeof e.to < "u") {
            t.preventDefault(), r.push(e.to);
            return;
          }
          if (!e.isVanilla && typeof e.route < "u") {
            t.preventDefault(), r.push(e.to);
            return;
          }
          s("click", t);
        }
      };
      if (e.confirmModal) {
        let o = typeof e.confirmData == "object" ? JSON.parse(JSON.stringify(e.confirmData)) : {};
        if (typeof o.onConfirm == "function") {
          let l = o.onConfirm.bind({});
          o.onConfirm = () => {
            l(), n();
          };
        } else
          o.onConfirm = () => {
            n();
          };
        return w(e.confirmModal, e.confirmModalKey, o);
      }
      n();
    };
    return c(), (t, n) => t.download ? (k(), y("a", {
      key: 0,
      class: C(d.value),
      href: p.value,
      target: t.target,
      download: t.downloadFileName,
      onClick: m
    }, [
      g(t.$slots, "default")
    ], 10, _)) : (k(), y("a", {
      key: 1,
      class: C(d.value),
      href: p.value,
      target: t.target,
      onClick: m
    }, [
      g(t.$slots, "default")
    ], 10, N));
  }
}), V = {
  install: (a, f) => {
    a.component("lkt-anchor") === void 0 && a.component("lkt-anchor", F), a.component("lkt-modal-confirm") === void 0 && a.use(R);
  }
};
export {
  V as default
};
