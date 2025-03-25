import { defineComponent as V, mergeDefaults as H, ref as A, computed as u, useSlots as E, resolveComponent as W, createElementBlock as a, openBlock as n, normalizeStyle as q, normalizeClass as T, createElementVNode as _, withModifiers as G, createCommentVNode as c, unref as C, renderSlot as p, toDisplayString as z, createBlock as I, Fragment as F, renderList as R, normalizeProps as $, mergeProps as j, watch as Q, onMounted as U, createTextVNode as O } from "vue";
import { useRouter as X, useRoute as Y } from "vue-router";
import { ModalType as Z, getDefaultValues as J, Modal as ee, getAnchorHref as te, AnchorType as s, extractI18nValue as oe, Anchor as le } from "lkt-vue-kernel";
import { AnchorType as De } from "lkt-vue-kernel";
const ne = (d, m = "_", e = {}) => {
  {
    console.warn("ModalCanvas not defined");
    return;
  }
}, K = (d, m = "_") => {
  {
    console.warn("ModalCanvas not defined");
    return;
  }
}, P = (d, m = "_", e = {}) => {
  let f = d;
  typeof f == "string" && f.indexOf("confirm__") === 0 && (f = f.substring(9)), ne("confirm__" + f, m, e);
}, re = (d, m = "_") => {
  let e = d;
  typeof e == "string" && e.indexOf("confirm__") === 0 && (e = e.substring(9)), K("confirm__" + e, m);
}, ae = {
  class: "lkt-modal-inner",
  ref: "inner"
}, ie = { class: "lkt-modal-header" }, ce = { class: "lkt-modal-header_title-container" }, se = {
  key: 0,
  class: "lkt-modal-header_pre-title"
}, ue = ["innerHTML"], de = {
  key: 1,
  class: "lkt-modal-header_title"
}, fe = { class: "lkt-modal-button-tray" }, me = { class: "lkt-modal-content" }, pe = {
  key: 0,
  class: "lkt-modal-footer"
}, ve = {
  key: 0,
  class: "lkt-modal-footer_main"
}, ke = {
  key: 1,
  class: "lkt-modal-button-tray"
}, ye = {
  key: 2,
  class: "lkt-modal-button-tray"
};
J(ee);
const he = ["href", "target", "download"], Ce = ["href", "target"], be = /* @__PURE__ */ V({
  __name: "LktAnchor",
  props: /* @__PURE__ */ H({
    type: {},
    to: {},
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
    events: {},
    onClick: { type: Function }
  }, J(le)),
  emits: [
    "click",
    "active"
  ],
  setup(d, { emit: m }) {
    const e = d, f = m, b = E(), y = X(), g = A(e.isActive), N = A(!1), v = A(e.type), L = () => {
      var t;
      typeof ((t = e.events) == null ? void 0 : t.click) == "function" && e.events.click();
    }, B = () => {
      if (![s.RouterLink, s.Legacy].includes(v.value)) return;
      let t = y == null ? void 0 : y.currentRoute;
      if (t) {
        g.value = t.value.path === e.to, f("active", g.value);
        let r = (i, w) => w === "" ? i === "" : w === "/" ? i === "/" : i.startsWith(w);
        N.value = r(t.value.path, e.to);
      }
    }, x = Y();
    Q(x, (t) => {
      B();
    }, { flush: "pre", immediate: !0, deep: !0 });
    const D = u(() => {
      const t = [];
      return e.imposter || t.push("lkt-anchor"), e.class && t.push(e.class), e.disabled && t.push("is-disabled"), e.to && (g.value && t.push("lkt-anchor-active"), N.value && t.push("lkt-anchor-active-parent")), e.isActive && !t.includes("lkt-anchor-active") && t.push("lkt-anchor-active"), t.join(" ");
    }), k = u(() => te(e)), h = (t) => {
      var r;
      if (L(), s.RouterLinkBack === e.type) {
        t.preventDefault(), y.back();
        return;
      }
      if (s.Action === e.type) {
        if (typeof ((r = e.events) == null ? void 0 : r.click) == "function") {
          let i = e.events.click(t);
          if (!i)
            return t.preventDefault(), i;
        }
        return;
      }
      if (s.RouterLink === e.type) {
        typeof e.to < "u" && (t.preventDefault(), y.push(e.to));
        return;
      }
      if ([
        s.Href,
        s.Mail,
        s.Tel,
        s.Tab,
        s.Download
      ].includes(e.type)) {
        let i = e.to;
        if (typeof i != "string" && (i = String(i)), i) return;
        (!i || i === "#") && (t.preventDefault(), f("click", t));
        return;
      }
      f("click", t);
    }, M = (t) => {
      if (e.disabled)
        return t.preventDefault(), t.stopPropagation(), !1;
      if (e.confirmModal) {
        let r = typeof e.confirmData == "object" ? JSON.parse(JSON.stringify(e.confirmData)) : {};
        if (typeof r.onConfirm == "function") {
          let i = r.onConfirm.bind({});
          r.onConfirm = () => {
            i(), h(t);
          };
        } else
          r.onConfirm = () => {
            h(t);
          };
        return P(e.confirmModal, e.confirmModalKey, r);
      }
      h(t);
    };
    U(() => {
      (e.type === s.RouterLink || e.type === s.Legacy) && B();
    });
    const S = u(() => s.Download === e.type), o = u(() => s.Tab === e.type ? "_blank" : ""), l = u(() => oe(e.text));
    return (t, r) => S.value ? (n(), a("a", {
      key: 0,
      class: T(D.value),
      href: k.value,
      target: o.value,
      download: t.downloadFileName,
      onClick: M
    }, [
      C(b).text ? p(t.$slots, "text", {
        key: 0,
        text: l.value,
        href: k.value
      }) : l.value ? (n(), a(F, { key: 1 }, [
        O(z(l.value), 1)
      ], 64)) : c("", !0),
      C(b).default ? p(t.$slots, "default", { key: 2 }) : c("", !0)
    ], 10, he)) : (n(), a("a", {
      key: 1,
      class: T(D.value),
      href: k.value,
      target: o.value,
      onClick: M
    }, [
      C(b).text ? p(t.$slots, "text", {
        key: 0,
        text: l.value,
        href: k.value
      }) : l.value ? (n(), a(F, { key: 1 }, [
        O(z(l.value), 1)
      ], 64)) : c("", !0),
      C(b).default ? p(t.$slots, "default", { key: 2 }) : c("", !0)
    ], 10, Ce));
  }
}), Te = {
  install: (d, m) => {
    d.component("lkt-anchor") === void 0 && d.component("lkt-anchor", be);
  }
};
export {
  De as AnchorType,
  Te as default
};
