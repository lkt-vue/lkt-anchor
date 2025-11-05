import { defineComponent as E, mergeDefaults as P, ref as I, computed as u, useSlots as J, resolveComponent as U, createElementBlock as r, openBlock as a, normalizeStyle as G, normalizeClass as M, createElementVNode as A, withModifiers as Q, createCommentVNode as c, unref as v, createVNode as X, normalizeProps as b, guardReactiveProps as Y, withCtx as Z, renderSlot as p, toDisplayString as R, createBlock as g, Fragment as V, renderList as _, mergeProps as S, watch as ee, onMounted as te, createTextVNode as oe } from "vue";
import { useRouter as ne, useRoute as le } from "vue-router";
import { ModalController as L, ModalType as ae, ButtonType as ie, getDefaultValues as W, Modal as re, extractPropValue as H, getAnchorHref as ce, AnchorType as s, extractI18nValue as ue, Anchor as se } from "lkt-vue-kernel";
import { AnchorType as $e } from "lkt-vue-kernel";
const de = (l, f = "_", e = {}) => {
  if (!L.canvas) {
    console.warn("ModalCanvas not defined");
    return;
  }
  L.open({
    modalName: l,
    modalKey: f
  }, e, !0);
}, z = (l, f = "_") => {
  if (!L.canvas) {
    console.warn("ModalCanvas not defined");
    return;
  }
  L.close({
    modalName: l,
    modalKey: f
  });
}, q = (l, f = "_", e = {}) => {
  let d = l;
  typeof d == "string" && d.indexOf("confirm__") === 0 && (d = d.substring(9)), de("confirm__" + d, f, e);
}, fe = (l, f = "_") => {
  let e = l;
  typeof e == "string" && e.indexOf("confirm__") === 0 && (e = e.substring(9)), z("confirm__" + e, f);
}, me = ["data-modal", "data-key"], pe = {
  class: "lkt-modal-inner",
  ref: "inner"
}, ye = { class: "lkt-modal-header" }, ve = {
  key: 0,
  class: "lkt-modal-header-actions"
}, ke = { class: "lkt-modal-header_title-container" }, he = {
  key: 0,
  class: "lkt-modal-header_pre-title"
}, be = ["innerHTML"], ge = {
  key: 1,
  class: "lkt-modal-header_title"
}, Ce = { class: "lkt-modal-button-tray" }, Be = { class: "lkt-modal-content" }, Te = {
  key: 0,
  class: "lkt-modal-footer"
}, xe = {
  key: 0,
  class: "lkt-modal-footer_main"
}, Ne = {
  key: 1,
  class: "lkt-modal-button-tray"
}, Ae = {
  key: 2,
  class: "lkt-modal-button-tray"
};
W(re);
const Me = ["href", "target", "download"], Se = ["href", "target"], je = {
  key: 3,
  class: "lkt-anchor--label"
}, we = /* @__PURE__ */ E({
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
  }, W(se)),
  emits: [
    "click",
    "active"
  ],
  setup(l, { emit: f }) {
    const e = l, d = f, C = J(), k = ne(), B = I(e.isActive), w = I(!1), y = I(e.type), m = u(() => {
      if (typeof e.to == "function") return e.to(e.prop);
      if (typeof e.to == "string") return H(e.to, e.prop);
      let t = e.to.path;
      if (!t && e.to.name) {
        let n = k.getRoutes().find((i) => i.name === e.to.name);
        n && (t = n.path);
      }
      return {
        ...e.to,
        path: H(t, e.prop)
      };
    }), D = (t) => {
      var n;
      typeof ((n = e.events) == null ? void 0 : n.click) == "function" && e.events.click(t);
    }, F = () => {
      if (![s.RouterLink, s.Legacy].includes(y.value)) return;
      let t = k == null ? void 0 : k.currentRoute;
      if (t) {
        B.value = typeof m.value == "object" ? t.value.path === m.value.path : t.value.path === m.value, d("active", B.value);
        let n = (i, $) => $ === "" ? i === "" : $ === "/" ? i === "/" : i.startsWith($);
        w.value = n(t.value.path, m.value);
      }
    }, j = le();
    ee(j, (t) => {
      F();
    }, { flush: "pre", immediate: !0, deep: !0 });
    const T = u(() => {
      const t = [];
      return e.imposter || t.push("lkt-anchor"), e.class && t.push(e.class), e.disabled && t.push("is-disabled"), m.value && (B.value && t.push("lkt-anchor-active"), w.value && t.push("lkt-anchor-active-parent")), e.isActive && !t.includes("lkt-anchor-active") && t.push("lkt-anchor-active"), t.join(" ");
    }), x = u(() => ce(e)), h = (t) => {
      if (D(t), s.RouterLinkBack === e.type) {
        t.preventDefault(), k.back();
        return;
      }
      if (s.Action === e.type) {
        t.preventDefault(), d("click", t);
        return;
      }
      if (s.RouterLink === e.type) {
        typeof m.value < "u" && (t.preventDefault(), k.push(m.value));
        return;
      }
      if ([
        s.Href,
        s.Mail,
        s.Tel,
        s.Tab,
        s.Download
      ].includes(e.type)) {
        let n = m.value;
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
          let i = n.onConfirm.bind({});
          n.onConfirm = () => {
            i(), h(t);
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
      (e.type === s.RouterLink || e.type === s.Legacy) && F();
    });
    const O = u(() => s.Download === e.type), K = u(() => s.Tab === e.type ? "_blank" : ""), o = u(() => ue(e.text));
    return (t, n) => {
      const i = U("lkt-icon");
      return O.value ? (a(), r("a", {
        key: 0,
        class: M(T.value),
        href: x.value,
        target: K.value,
        download: l.downloadFileName,
        onClick: N
      }, [
        typeof l.icon == "string" && l.icon !== "" ? (a(), g(i, b(S({ key: 0 }, { icon: l.icon })), null, 16)) : typeof l.icon == "object" && Object.keys(l.icon).length > 0 ? (a(), g(i, b(S({ key: 1 }, l.icon)), null, 16)) : c("", !0),
        v(C).text ? p(t.$slots, "text", {
          key: 2,
          text: o.value,
          href: x.value
        }) : o.value ? (a(), r(V, { key: 3 }, [
          oe(R(o.value), 1)
        ], 64)) : c("", !0),
        v(C).default ? p(t.$slots, "default", { key: 4 }) : c("", !0)
      ], 10, Me)) : (a(), r("a", {
        key: 1,
        class: M(T.value),
        href: x.value,
        target: K.value,
        onClick: N
      }, [
        typeof l.icon == "string" && l.icon !== "" ? (a(), g(i, b(S({ key: 0 }, { icon: l.icon })), null, 16)) : typeof l.icon == "object" && Object.keys(l.icon).length > 0 ? (a(), g(i, b(S({ key: 1 }, l.icon)), null, 16)) : c("", !0),
        v(C).text ? p(t.$slots, "text", {
          key: 2,
          text: o.value,
          href: x.value
        }) : o.value ? (a(), r("span", je, R(o.value), 1)) : c("", !0),
        v(C).default ? p(t.$slots, "default", { key: 4 }) : c("", !0)
      ], 10, Se));
    };
  }
}), Ie = {
  install: (l, f) => {
    l.component("lkt-anchor") === void 0 && l.component("lkt-anchor", we);
  }
};
export {
  $e as AnchorType,
  Ie as default
};
