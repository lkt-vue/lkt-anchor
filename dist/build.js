import { defineComponent as P, mergeDefaults as E, ref as K, computed as s, useSlots as J, resolveComponent as W, createElementBlock as l, openBlock as n, normalizeStyle as Q, normalizeClass as b, createElementVNode as A, withModifiers as U, createCommentVNode as i, unref as v, createVNode as X, normalizeProps as D, guardReactiveProps as Y, withCtx as Z, renderSlot as m, toDisplayString as V, createBlock as F, Fragment as L, renderList as x, mergeProps as j, watch as ee, onMounted as te, createTextVNode as H } from "vue";
import { useRouter as oe, useRoute as ne } from "vue-router";
import { ModalController as $, ModalType as le, ButtonType as ae, getDefaultValues as q, Modal as re, extractPropValue as ie, getAnchorHref as ce, AnchorType as d, extractI18nValue as se, Anchor as ue } from "lkt-vue-kernel";
import { AnchorType as $e } from "lkt-vue-kernel";
const de = (u, p = "_", e = {}) => {
  if (!$.canvas) {
    console.warn("ModalCanvas not defined");
    return;
  }
  $.open({
    modalName: u,
    modalKey: p
  }, e, !0);
}, z = (u, p = "_") => {
  if (!$.canvas) {
    console.warn("ModalCanvas not defined");
    return;
  }
  $.close({
    modalName: u,
    modalKey: p
  });
}, G = (u, p = "_", e = {}) => {
  let f = u;
  typeof f == "string" && f.indexOf("confirm__") === 0 && (f = f.substring(9)), de("confirm__" + f, p, e);
}, fe = (u, p = "_") => {
  let e = u;
  typeof e == "string" && e.indexOf("confirm__") === 0 && (e = e.substring(9)), z("confirm__" + e, p);
}, pe = ["data-modal", "data-key"], me = {
  class: "lkt-modal-inner",
  ref: "inner"
}, ye = { class: "lkt-modal-header" }, ve = {
  key: 0,
  class: "lkt-modal-header-actions"
}, ke = { class: "lkt-modal-header_title-container" }, he = {
  key: 0,
  class: "lkt-modal-header_pre-title"
}, Ce = ["innerHTML"], be = {
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
const Me = ["href", "target", "download"], Se = ["href", "target"], De = /* @__PURE__ */ P({
  __name: "LktAnchor",
  props: /* @__PURE__ */ E({
    type: {},
    to: { type: [String, Function] },
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
  setup(u, { emit: p }) {
    const e = u, f = p, B = J(), g = oe(), T = K(e.isActive), w = K(!1), y = K(e.type), k = s(() => typeof e.to == "function" ? e.to(e.prop) : typeof e.to == "string" ? ie(e.to, e.prop) : e.to), M = (t) => {
      var r;
      typeof ((r = e.events) == null ? void 0 : r.click) == "function" && e.events.click(t);
    }, N = () => {
      if (![d.RouterLink, d.Legacy].includes(y.value)) return;
      let t = g == null ? void 0 : g.currentRoute;
      if (t) {
        T.value = t.value.path === k.value, f("active", T.value);
        let r = (C, R) => R === "" ? C === "" : R === "/" ? C === "/" : C.startsWith(R);
        w.value = r(t.value.path, k.value);
      }
    }, O = ne();
    ee(O, (t) => {
      N();
    }, { flush: "pre", immediate: !0, deep: !0 });
    const _ = s(() => {
      const t = [];
      return e.imposter || t.push("lkt-anchor"), e.class && t.push(e.class), e.disabled && t.push("is-disabled"), k.value && (T.value && t.push("lkt-anchor-active"), w.value && t.push("lkt-anchor-active-parent")), e.isActive && !t.includes("lkt-anchor-active") && t.push("lkt-anchor-active"), t.join(" ");
    }), h = s(() => ce(e)), S = (t) => {
      if (M(t), d.RouterLinkBack === e.type) {
        t.preventDefault(), g.back();
        return;
      }
      if (d.Action === e.type) {
        t.preventDefault(), f("click", t);
        return;
      }
      if (d.RouterLink === e.type) {
        typeof k.value < "u" && (t.preventDefault(), g.push(k.value));
        return;
      }
      if ([
        d.Href,
        d.Mail,
        d.Tel,
        d.Tab,
        d.Download
      ].includes(e.type)) {
        let r = k.value;
        if (typeof r != "string" && (r = String(r)), r) return;
        (!r || r === "#") && (t.preventDefault(), f("click", t));
        return;
      }
      f("click", t);
    }, I = (t) => {
      if (e.disabled)
        return t.preventDefault(), t.stopPropagation(), !1;
      if (e.confirmModal) {
        let r = typeof e.confirmData == "object" ? JSON.parse(JSON.stringify(e.confirmData)) : {};
        if (typeof r.onConfirm == "function") {
          let C = r.onConfirm.bind({});
          r.onConfirm = () => {
            C(), S(t);
          };
        } else
          r.onConfirm = () => {
            S(t);
          };
        return G(e.confirmModal, e.confirmModalKey, r);
      }
      S(t);
    };
    te(() => {
      (e.type === d.RouterLink || e.type === d.Legacy) && N();
    });
    const o = s(() => d.Download === e.type), a = s(() => d.Tab === e.type ? "_blank" : ""), c = s(() => se(e.text));
    return (t, r) => {
      const C = W("lkt-icon");
      return o.value ? (n(), l("a", {
        key: 0,
        class: b(_.value),
        href: h.value,
        target: a.value,
        download: t.downloadFileName,
        onClick: I
      }, [
        typeof t.icon == "string" && t.icon !== "" ? (n(), l("i", {
          key: 0,
          class: b(t.icon)
        }, null, 2)) : typeof t.icon == "object" && Object.keys(t.icon).length > 0 ? (n(), F(C, D(j({ key: 1 }, t.icon)), null, 16)) : i("", !0),
        v(B).text ? m(t.$slots, "text", {
          key: 2,
          text: c.value,
          href: h.value
        }) : c.value ? (n(), l(L, { key: 3 }, [
          H(V(c.value), 1)
        ], 64)) : i("", !0),
        v(B).default ? m(t.$slots, "default", { key: 4 }) : i("", !0)
      ], 10, Me)) : (n(), l("a", {
        key: 1,
        class: b(_.value),
        href: h.value,
        target: a.value,
        onClick: I
      }, [
        typeof t.icon == "string" && t.icon !== "" ? (n(), l("i", {
          key: 0,
          class: b(t.icon)
        }, null, 2)) : typeof t.icon == "object" && Object.keys(t.icon).length > 0 ? (n(), F(C, D(j({ key: 1 }, t.icon)), null, 16)) : i("", !0),
        v(B).text ? m(t.$slots, "text", {
          key: 2,
          text: c.value,
          href: h.value
        }) : c.value ? (n(), l(L, { key: 3 }, [
          H(V(c.value), 1)
        ], 64)) : i("", !0),
        v(B).default ? m(t.$slots, "default", { key: 4 }) : i("", !0)
      ], 10, Se));
    };
  }
}), Ke = {
  install: (u, p) => {
    u.component("lkt-anchor") === void 0 && u.component("lkt-anchor", De);
  }
};
export {
  $e as AnchorType,
  Ke as default
};
