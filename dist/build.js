import { defineComponent as j, mergeDefaults as V, ref as T, computed as i, useSlots as J, resolveComponent as P, createElementBlock as l, openBlock as n, normalizeStyle as W, normalizeClass as g, createElementVNode as b, withModifiers as K, createCommentVNode as s, unref as F, renderSlot as k, toDisplayString as q, createBlock as L, Fragment as z, renderList as R, normalizeProps as x, mergeProps as O, watch as $, onMounted as G } from "vue";
import { useRouter as Q, useRoute as U } from "vue-router";
import { ModalType as X, getDefaultValues as H, Modal as Y, Anchor as S, AnchorType as r } from "lkt-vue-kernel";
import { AnchorType as Be } from "lkt-vue-kernel";
const Z = (a, u = "_", e = {}) => {
  {
    console.warn("ModalCanvas not defined");
    return;
  }
}, I = (a, u = "_") => {
  {
    console.warn("ModalCanvas not defined");
    return;
  }
}, E = (a, u = "_", e = {}) => {
  let c = a;
  typeof c == "string" && c.indexOf("confirm__") === 0 && (c = c.substring(9)), Z("confirm__" + c, u, e);
}, ee = (a, u = "_") => {
  let e = a;
  typeof e == "string" && e.indexOf("confirm__") === 0 && (e = e.substring(9)), I("confirm__" + e, u);
}, te = {
  class: "lkt-modal-inner",
  ref: "inner"
}, oe = { class: "lkt-modal-header" }, ne = { class: "lkt-modal-header_title-container" }, le = {
  key: 0,
  class: "lkt-modal-header_pre-title"
}, re = ["innerHTML"], ie = {
  key: 1,
  class: "lkt-modal-header_title"
}, ae = { class: "lkt-modal-button-tray" }, ce = { class: "lkt-modal-content" }, se = {
  key: 0,
  class: "lkt-modal-footer"
}, ue = {
  key: 0,
  class: "lkt-modal-footer_main"
}, fe = {
  key: 1,
  class: "lkt-modal-button-tray"
}, de = {
  key: 2,
  class: "lkt-modal-button-tray"
};
H(Y);
const me = ["href", "target", "download"], pe = ["href", "target"], ye = /* @__PURE__ */ j({
  __name: "LktAnchor",
  props: /* @__PURE__ */ V({
    type: {},
    to: {},
    class: {},
    isActive: { type: Boolean },
    downloadFileName: {},
    disabled: { type: Boolean },
    onClick: { type: Function },
    confirmModal: { type: [String, Function] },
    confirmModalKey: { type: [String, Number, Function] },
    confirmData: {},
    imposter: { type: Boolean },
    external: { type: Boolean }
  }, H(S)),
  emits: ["click", "active"],
  setup(a, { emit: u }) {
    const e = a, c = T(new S(e));
    $(e, (t) => c.value = new S(t));
    const B = u, p = Q(), v = T(e.isActive), N = T(!1), m = T(e.type), D = () => {
      if (![r.RouterLink, r.Legacy].includes(m.value)) return;
      let t = p == null ? void 0 : p.currentRoute;
      if (t) {
        v.value = t.value.path === e.to, B("active", v.value);
        let o = (f, d) => d === "" ? f === "" : d === "/" ? f === "/" : f.startsWith(d);
        N.value = o(t.value.path, e.to);
      }
    }, _ = U();
    $(_, (t) => {
      D();
    }, { flush: "pre", immediate: !0, deep: !0 });
    const h = i(() => {
      const t = [];
      return e.imposter || t.push("lkt-anchor"), e.class && t.push(e.class), e.disabled && t.push("is-disabled"), e.to && (v.value && t.push("lkt-anchor-active"), N.value && t.push("lkt-anchor-active-parent")), e.isActive && !t.includes("lkt-anchor-active") && t.push("lkt-anchor-active"), t.join(" ");
    }), M = i(() => c.value.getHref()), y = (t) => {
      if (r.RouterLinkBack === e.type) {
        t.preventDefault(), p.back();
        return;
      }
      if (r.Action === e.type) {
        if (typeof e.onClick == "function") {
          let o = e.onClick(t);
          if (!o)
            return t.preventDefault(), o;
        }
        return;
      }
      if (r.RouterLink === e.type) {
        typeof e.to < "u" && (t.preventDefault(), p.push(e.to));
        return;
      }
      if ([
        r.Href,
        r.Mail,
        r.Tel,
        r.Tab,
        r.Download
      ].includes(e.type)) {
        let o = e.to;
        if (typeof o != "string" && (o = String(o)), o) return;
        (!o || o === "#") && (t.preventDefault(), B("click", t));
        return;
      }
      B("click", t);
    }, C = (t) => {
      if (e.disabled)
        return t.preventDefault(), t.stopPropagation(), !1;
      if (e.confirmModal) {
        let o = typeof e.confirmData == "object" ? JSON.parse(JSON.stringify(e.confirmData)) : {};
        if (typeof o.onConfirm == "function") {
          let f = o.onConfirm.bind({});
          o.onConfirm = () => {
            f(), y(t);
          };
        } else
          o.onConfirm = () => {
            y(t);
          };
        return E(e.confirmModal, e.confirmModalKey, o);
      }
      y(t);
    };
    G(() => {
      (e.type === r.RouterLink || e.type === r.Legacy) && D();
    });
    const A = i(() => r.Download === e.type), w = i(() => r.Tab === e.type ? "_blank" : "");
    return (t, o) => A.value ? (n(), l("a", {
      key: 0,
      class: g(h.value),
      href: M.value,
      target: w.value,
      download: t.downloadFileName,
      onClick: C
    }, [
      k(t.$slots, "default")
    ], 10, me)) : (n(), l("a", {
      key: 1,
      class: g(h.value),
      href: M.value,
      target: w.value,
      onClick: C
    }, [
      k(t.$slots, "default")
    ], 10, pe));
  }
}), Ce = {
  install: (a, u) => {
    a.component("lkt-anchor") === void 0 && a.component("lkt-anchor", ye);
  }
};
export {
  Be as AnchorType,
  Ce as default
};
