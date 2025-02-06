import { defineComponent as S, mergeDefaults as T, ref as l, watch as D, computed as c, onMounted as F, createElementBlock as b, openBlock as R, normalizeClass as L, renderSlot as w } from "vue";
import { useRouter as H, useRoute as N } from "vue-router";
import I, { openConfirm as j } from "lkt-modal-confirm";
import { Anchor as d, AnchorType as n, getDefaultValues as E } from "lkt-vue-kernel";
import { AnchorType as P } from "lkt-vue-kernel";
const J = ["href", "target", "download"], K = ["href", "target"], O = /* @__PURE__ */ S({
  __name: "LktAnchor",
  props: /* @__PURE__ */ T({
    type: {},
    to: {},
    class: {},
    isActive: { type: Boolean },
    downloadFileName: {},
    disabled: { type: Boolean },
    onClick: { type: Function },
    confirmModal: { type: [String, Function] },
    confirmModalKey: { type: [String, Function] },
    confirmData: {},
    imposter: { type: Boolean }
  }, E(d)),
  emits: ["click", "active"],
  setup(r, { emit: m }) {
    const t = r, v = l(new d(t));
    D(t, (e) => v.value = new d(e));
    const u = m, i = H(), s = l(t.isActive), k = l(!1), M = l(t.type), y = () => {
      if (![n.RouterLink, n.Legacy].includes(M.value)) return;
      let e = i == null ? void 0 : i.currentRoute;
      if (e) {
        s.value = e.value.path === t.to, u("active", s.value);
        let o = (a, p) => p === "" ? a === "" : p === "/" ? a === "/" : a.startsWith(p);
        k.value = o(e.value.path, t.to);
      }
    }, _ = N();
    D(_, (e) => {
      y();
    }, { flush: "pre", immediate: !0, deep: !0 });
    const h = c(() => {
      const e = [];
      return t.imposter || e.push("lkt-anchor"), t.class && e.push(t.class), t.disabled && e.push("is-disabled"), t.to && (s.value && e.push("lkt-anchor-active"), k.value && e.push("lkt-anchor-active-parent")), t.isActive && !e.includes("lkt-anchor-active") && e.push("lkt-anchor-active"), e.join(" ");
    }), g = c(() => v.value.getHref()), f = (e) => {
      if (n.RouterLinkBack === t.type) {
        e.preventDefault(), i.back();
        return;
      }
      if (n.Action === t.type) {
        if (typeof t.onClick == "function") {
          let o = t.onClick(e);
          if (!o)
            return e.preventDefault(), o;
        }
        return;
      }
      if (n.RouterLink === t.type) {
        typeof t.to < "u" && (e.preventDefault(), i.push(t.to));
        return;
      }
      if ([
        n.Href,
        n.Mail,
        n.Tel,
        n.Tab,
        n.Download
      ].includes(t.type)) {
        let o = t.to;
        if (typeof o != "string" && (o = String(o)), o) return;
        (!o || o === "#") && (e.preventDefault(), u("click", e));
        return;
      }
      u("click", e);
    }, C = (e) => {
      if (t.disabled)
        return e.preventDefault(), e.stopPropagation(), !1;
      if (t.confirmModal) {
        let o = typeof t.confirmData == "object" ? JSON.parse(JSON.stringify(t.confirmData)) : {};
        if (typeof o.onConfirm == "function") {
          let a = o.onConfirm.bind({});
          o.onConfirm = () => {
            a(), f(e);
          };
        } else
          o.onConfirm = () => {
            f(e);
          };
        return j(t.confirmModal, t.confirmModalKey, o);
      }
      f(e);
    };
    F(() => {
      (t.type === n.RouterLink || t.type === n.Legacy) && y();
    });
    const B = c(() => n.Download === t.type), A = c(() => n.Tab === t.type ? "_blank" : "");
    return (e, o) => B.value ? (R(), b("a", {
      key: 0,
      class: L(h.value),
      href: g.value,
      target: A.value,
      download: e.downloadFileName,
      onClick: C
    }, [
      w(e.$slots, "default")
    ], 10, J)) : (R(), b("a", {
      key: 1,
      class: L(h.value),
      href: g.value,
      target: A.value,
      onClick: C
    }, [
      w(e.$slots, "default")
    ], 10, K));
  }
}), W = {
  install: (r, m) => {
    r.component("lkt-anchor") === void 0 && r.component("lkt-anchor", O), r.component("lkt-modal-confirm") === void 0 && r.use(I);
  }
};
export {
  P as AnchorType,
  W as default
};
