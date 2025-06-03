import { defineComponent as P, mergeDefaults as J, ref as K, computed as c, useSlots as U, resolveComponent as W, createElementBlock as a, openBlock as l, normalizeStyle as Q, normalizeClass as k, createElementVNode as _, withModifiers as X, createCommentVNode as i, unref as v, createVNode as Y, normalizeProps as M, guardReactiveProps as Z, withCtx as ee, renderSlot as p, toDisplayString as V, createBlock as S, Fragment as I, renderList as x, mergeProps as L, watch as te, onMounted as oe, createTextVNode as H } from "vue";
import { useRouter as ne, useRoute as le } from "vue-router";
import { ModalController as O, ModalType as ae, ButtonType as ie, getDefaultValues as q, Modal as re, extractPropValue as E, getAnchorHref as ce, AnchorType as u, extractI18nValue as se, Anchor as ue } from "lkt-vue-kernel";
import { AnchorType as Oe } from "lkt-vue-kernel";
const de = (s, f = "_", e = {}) => {
  if (!O.canvas) {
    console.warn("ModalCanvas not defined");
    return;
  }
  O.open({
    modalName: s,
    modalKey: f
  }, e, !0);
}, z = (s, f = "_") => {
  if (!O.canvas) {
    console.warn("ModalCanvas not defined");
    return;
  }
  O.close({
    modalName: s,
    modalKey: f
  });
}, G = (s, f = "_", e = {}) => {
  let d = s;
  typeof d == "string" && d.indexOf("confirm__") === 0 && (d = d.substring(9)), de("confirm__" + d, f, e);
}, fe = (s, f = "_") => {
  let e = s;
  typeof e == "string" && e.indexOf("confirm__") === 0 && (e = e.substring(9)), z("confirm__" + e, f);
}, pe = ["data-modal", "data-key"], me = {
  class: "lkt-modal-inner",
  ref: "inner"
}, ye = { class: "lkt-modal-header" }, ve = {
  key: 0,
  class: "lkt-modal-header-actions"
}, ke = { class: "lkt-modal-header_title-container" }, he = {
  key: 0,
  class: "lkt-modal-header_pre-title"
}, be = ["innerHTML"], Ce = {
  key: 1,
  class: "lkt-modal-header_title"
}, ge = { class: "lkt-modal-button-tray" }, Be = { class: "lkt-modal-content" }, Te = {
  key: 0,
  class: "lkt-modal-footer"
}, Ne = {
  key: 0,
  class: "lkt-modal-footer_main"
}, _e = {
  key: 1,
  class: "lkt-modal-button-tray"
}, Ae = {
  key: 2,
  class: "lkt-modal-button-tray"
};
q(re);
const Me = ["href", "target", "download"], Se = ["href", "target"], we = /* @__PURE__ */ P({
  __name: "LktAnchor",
  props: /* @__PURE__ */ J({
    type: {},
    to: { type: [Object, String, Function] },
    class: {},
    isActive: { type: Boolean },
    downloadFileName: {},
    disabled: { type: Boolean },
    confirmModal: { type: [String, Function] },
    confirmModalKey: { type: [String, Number, Function] },
    confirmData: {},
    imposter: { type: Boolean },
    external: { type: Boolean },
    text: {},
    icon: {},
    events: {},
    prop: {},
    onClick: { type: Function }
  }, q(ue)),
  emits: [
    "click",
    "active"
  ],
  setup(s, { emit: f }) {
    const e = s, d = f, C = U(), h = ne(), g = K(e.isActive), w = K(!1), m = K(e.type), y = c(() => typeof e.to == "function" ? e.to(e.prop) : typeof e.to == "string" ? E(e.to, e.prop) : {
      ...e.to,
      path: E(e.to.path, e.prop)
    }), D = (t) => {
      var n;
      typeof ((n = e.events) == null ? void 0 : n.click) == "function" && e.events.click(t);
    }, F = () => {
      if (![u.RouterLink, u.Legacy].includes(m.value)) return;
      let t = h == null ? void 0 : h.currentRoute;
      if (t) {
        g.value = t.value.path === y.value, d("active", g.value);
        let n = (r, R) => R === "" ? r === "" : R === "/" ? r === "/" : r.startsWith(R);
        w.value = n(t.value.path, y.value);
      }
    }, A = le();
    te(A, (t) => {
      F();
    }, { flush: "pre", immediate: !0, deep: !0 });
    const B = c(() => {
      const t = [];
      return e.imposter || t.push("lkt-anchor"), e.class && t.push(e.class), e.disabled && t.push("is-disabled"), y.value && (g.value && t.push("lkt-anchor-active"), w.value && t.push("lkt-anchor-active-parent")), e.isActive && !t.includes("lkt-anchor-active") && t.push("lkt-anchor-active"), t.join(" ");
    }), T = c(() => ce(e)), b = (t) => {
      if (D(t), u.RouterLinkBack === e.type) {
        t.preventDefault(), h.back();
        return;
      }
      if (u.Action === e.type) {
        t.preventDefault(), d("click", t);
        return;
      }
      if (u.RouterLink === e.type) {
        typeof y.value < "u" && (t.preventDefault(), h.push(y.value));
        return;
      }
      if ([
        u.Href,
        u.Mail,
        u.Tel,
        u.Tab,
        u.Download
      ].includes(e.type)) {
        let n = y.value;
        if (typeof n == "object" && (n = String(n.path)), typeof n != "string" && (n = String(n)), n) return;
        (!n || n === "#") && (t.preventDefault(), d("click", t));
        return;
      }
      d("click", t);
    }, N = (t) => {
      if (e.disabled)
        return t.preventDefault(), t.stopPropagation(), !1;
      if (e.confirmModal) {
        let n = typeof e.confirmData == "object" ? JSON.parse(JSON.stringify(e.confirmData)) : {};
        if (typeof n.onConfirm == "function") {
          let r = n.onConfirm.bind({});
          n.onConfirm = () => {
            r(), b(t);
          };
        } else
          n.onConfirm = () => {
            b(t);
          };
        return G(e.confirmModal, e.confirmModalKey, n);
      }
      b(t);
    };
    oe(() => {
      (e.type === u.RouterLink || e.type === u.Legacy) && F();
    });
    const $ = c(() => u.Download === e.type), j = c(() => u.Tab === e.type ? "_blank" : ""), o = c(() => se(e.text));
    return (t, n) => {
      const r = W("lkt-icon");
      return $.value ? (l(), a("a", {
        key: 0,
        class: k(B.value),
        href: T.value,
        target: j.value,
        download: t.downloadFileName,
        onClick: N
      }, [
        typeof t.icon == "string" && t.icon !== "" ? (l(), a("i", {
          key: 0,
          class: k(t.icon)
        }, null, 2)) : typeof t.icon == "object" && Object.keys(t.icon).length > 0 ? (l(), S(r, M(L({ key: 1 }, t.icon)), null, 16)) : i("", !0),
        v(C).text ? p(t.$slots, "text", {
          key: 2,
          text: o.value,
          href: T.value
        }) : o.value ? (l(), a(I, { key: 3 }, [
          H(V(o.value), 1)
        ], 64)) : i("", !0),
        v(C).default ? p(t.$slots, "default", { key: 4 }) : i("", !0)
      ], 10, Me)) : (l(), a("a", {
        key: 1,
        class: k(B.value),
        href: T.value,
        target: j.value,
        onClick: N
      }, [
        typeof t.icon == "string" && t.icon !== "" ? (l(), a("i", {
          key: 0,
          class: k(t.icon)
        }, null, 2)) : typeof t.icon == "object" && Object.keys(t.icon).length > 0 ? (l(), S(r, M(L({ key: 1 }, t.icon)), null, 16)) : i("", !0),
        v(C).text ? p(t.$slots, "text", {
          key: 2,
          text: o.value,
          href: T.value
        }) : o.value ? (l(), a(I, { key: 3 }, [
          H(V(o.value), 1)
        ], 64)) : i("", !0),
        v(C).default ? p(t.$slots, "default", { key: 4 }) : i("", !0)
      ], 10, Se));
    };
  }
}), Ke = {
  install: (s, f) => {
    s.component("lkt-anchor") === void 0 && s.component("lkt-anchor", we);
  }
};
export {
  Oe as AnchorType,
  Ke as default
};
