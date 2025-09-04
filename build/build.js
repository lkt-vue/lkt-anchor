import { defineComponent as E, mergeDefaults as P, ref as I, computed as c, useSlots as J, resolveComponent as U, createElementBlock as a, openBlock as l, normalizeStyle as G, normalizeClass as M, createElementVNode as A, withModifiers as Q, createCommentVNode as i, unref as v, createVNode as X, normalizeProps as b, guardReactiveProps as Y, withCtx as Z, renderSlot as p, toDisplayString as R, createBlock as C, Fragment as V, renderList as x, mergeProps as S, watch as ee, onMounted as te, createTextVNode as oe } from "vue";
import { useRouter as ne, useRoute as le } from "vue-router";
import { ModalController as L, ModalType as ae, ButtonType as ie, getDefaultValues as W, Modal as re, extractPropValue as H, getAnchorHref as ce, AnchorType as u, extractI18nValue as se, Anchor as ue } from "lkt-vue-kernel";
import { AnchorType as $e } from "lkt-vue-kernel";
const de = (s, f = "_", e = {}) => {
  if (!L.canvas) {
    console.warn("ModalCanvas not defined");
    return;
  }
  L.open({
    modalName: s,
    modalKey: f
  }, e, !0);
}, z = (s, f = "_") => {
  if (!L.canvas) {
    console.warn("ModalCanvas not defined");
    return;
  }
  L.close({
    modalName: s,
    modalKey: f
  });
}, q = (s, f = "_", e = {}) => {
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
W(re);
const Me = ["href", "target", "download"], Se = ["href", "target"], we = {
  key: 3,
  class: "lkt-anchor--label"
}, De = /* @__PURE__ */ E({
  __name: "LktAnchor",
  props: /* @__PURE__ */ P({
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
  }, W(ue)),
  emits: [
    "click",
    "active"
  ],
  setup(s, { emit: f }) {
    const e = s, d = f, g = J(), k = ne(), B = I(e.isActive), D = I(!1), m = I(e.type), y = c(() => typeof e.to == "function" ? e.to(e.prop) : typeof e.to == "string" ? H(e.to, e.prop) : {
      ...e.to,
      path: H(e.to.path, e.prop)
    }), F = (t) => {
      var n;
      typeof ((n = e.events) == null ? void 0 : n.click) == "function" && e.events.click(t);
    }, j = () => {
      if (![u.RouterLink, u.Legacy].includes(m.value)) return;
      let t = k == null ? void 0 : k.currentRoute;
      if (t) {
        B.value = t.value.path === y.value, d("active", B.value);
        let n = (r, $) => $ === "" ? r === "" : $ === "/" ? r === "/" : r.startsWith($);
        D.value = n(t.value.path, y.value);
      }
    }, w = le();
    ee(w, (t) => {
      j();
    }, { flush: "pre", immediate: !0, deep: !0 });
    const T = c(() => {
      const t = [];
      return e.imposter || t.push("lkt-anchor"), e.class && t.push(e.class), e.disabled && t.push("is-disabled"), y.value && (B.value && t.push("lkt-anchor-active"), D.value && t.push("lkt-anchor-active-parent")), e.isActive && !t.includes("lkt-anchor-active") && t.push("lkt-anchor-active"), t.join(" ");
    }), N = c(() => ce(e)), h = (t) => {
      if (F(t), u.RouterLinkBack === e.type) {
        t.preventDefault(), k.back();
        return;
      }
      if (u.Action === e.type) {
        t.preventDefault(), d("click", t);
        return;
      }
      if (u.RouterLink === e.type) {
        typeof y.value < "u" && (t.preventDefault(), k.push(y.value));
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
    }, _ = (t) => {
      if (e.disabled)
        return t.preventDefault(), t.stopPropagation(), !1;
      if (e.confirmModal) {
        let n = typeof e.confirmData == "object" ? JSON.parse(JSON.stringify(e.confirmData)) : {};
        if (typeof n.onConfirm == "function") {
          let r = n.onConfirm.bind({});
          n.onConfirm = () => {
            r(), h(t);
          };
        } else
          n.onConfirm = () => {
            h(t);
          };
        return q(e.confirmModal, e.confirmModalKey, n);
      }
      h(t);
    };
    te(() => {
      (e.type === u.RouterLink || e.type === u.Legacy) && j();
    });
    const O = c(() => u.Download === e.type), K = c(() => u.Tab === e.type ? "_blank" : ""), o = c(() => se(e.text));
    return (t, n) => {
      const r = U("lkt-icon");
      return O.value ? (l(), a("a", {
        key: 0,
        class: M(T.value),
        href: N.value,
        target: K.value,
        download: t.downloadFileName,
        onClick: _
      }, [
        typeof t.icon == "string" && t.icon !== "" ? (l(), C(r, b(S({ key: 0 }, { icon: t.icon })), null, 16)) : typeof t.icon == "object" && Object.keys(t.icon).length > 0 ? (l(), C(r, b(S({ key: 1 }, t.icon)), null, 16)) : i("", !0),
        v(g).text ? p(t.$slots, "text", {
          key: 2,
          text: o.value,
          href: N.value
        }) : o.value ? (l(), a(V, { key: 3 }, [
          oe(R(o.value), 1)
        ], 64)) : i("", !0),
        v(g).default ? p(t.$slots, "default", { key: 4 }) : i("", !0)
      ], 10, Me)) : (l(), a("a", {
        key: 1,
        class: M(T.value),
        href: N.value,
        target: K.value,
        onClick: _
      }, [
        typeof t.icon == "string" && t.icon !== "" ? (l(), C(r, b(S({ key: 0 }, { icon: t.icon })), null, 16)) : typeof t.icon == "object" && Object.keys(t.icon).length > 0 ? (l(), C(r, b(S({ key: 1 }, t.icon)), null, 16)) : i("", !0),
        v(g).text ? p(t.$slots, "text", {
          key: 2,
          text: o.value,
          href: N.value
        }) : o.value ? (l(), a("span", we, R(o.value), 1)) : i("", !0),
        v(g).default ? p(t.$slots, "default", { key: 4 }) : i("", !0)
      ], 10, Se));
    };
  }
}), Ie = {
  install: (s, f) => {
    s.component("lkt-anchor") === void 0 && s.component("lkt-anchor", De);
  }
};
export {
  $e as AnchorType,
  Ie as default
};
