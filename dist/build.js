import { defineComponent as V, mergeDefaults as H, ref as A, computed as s, useSlots as E, resolveComponent as W, createElementBlock as a, openBlock as r, normalizeStyle as q, normalizeClass as _, createElementVNode as B, withModifiers as G, createCommentVNode as i, unref as h, renderSlot as m, toDisplayString as z, createBlock as I, Fragment as F, renderList as $, normalizeProps as R, mergeProps as j, watch as Q, onMounted as U, createTextVNode as O } from "vue";
import { useRouter as X, useRoute as Y } from "vue-router";
import { ModalType as Z, getDefaultValues as J, Modal as ee, getAnchorHref as te, AnchorType as c, extractI18nValue as oe, Anchor as le } from "lkt-vue-kernel";
import { AnchorType as De } from "lkt-vue-kernel";
const ne = (d, f = "_", e = {}) => {
  {
    console.warn("ModalCanvas not defined");
    return;
  }
}, K = (d, f = "_") => {
  {
    console.warn("ModalCanvas not defined");
    return;
  }
}, P = (d, f = "_", e = {}) => {
  let u = d;
  typeof u == "string" && u.indexOf("confirm__") === 0 && (u = u.substring(9)), ne("confirm__" + u, f, e);
}, re = (d, f = "_") => {
  let e = d;
  typeof e == "string" && e.indexOf("confirm__") === 0 && (e = e.substring(9)), K("confirm__" + e, f);
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
}, ye = {
  key: 1,
  class: "lkt-modal-button-tray"
}, ke = {
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
  setup(d, { emit: f }) {
    const e = d, u = f, C = E(), y = X(), b = A(e.isActive), N = A(!1), p = A(e.type), L = (t) => {
      var l;
      typeof ((l = e.events) == null ? void 0 : l.click) == "function" && e.events.click(t);
    }, g = () => {
      if (![c.RouterLink, c.Legacy].includes(p.value)) return;
      let t = y == null ? void 0 : y.currentRoute;
      if (t) {
        b.value = t.value.path === e.to, u("active", b.value);
        let l = (x, w) => w === "" ? x === "" : w === "/" ? x === "/" : x.startsWith(w);
        N.value = l(t.value.path, e.to);
      }
    }, T = Y();
    Q(T, (t) => {
      g();
    }, { flush: "pre", immediate: !0, deep: !0 });
    const D = s(() => {
      const t = [];
      return e.imposter || t.push("lkt-anchor"), e.class && t.push(e.class), e.disabled && t.push("is-disabled"), e.to && (b.value && t.push("lkt-anchor-active"), N.value && t.push("lkt-anchor-active-parent")), e.isActive && !t.includes("lkt-anchor-active") && t.push("lkt-anchor-active"), t.join(" ");
    }), v = s(() => te(e)), k = (t) => {
      if (L(t), c.RouterLinkBack === e.type) {
        t.preventDefault(), y.back();
        return;
      }
      if (c.Action === e.type) {
        t.preventDefault(), u("click", t);
        return;
      }
      if (c.RouterLink === e.type) {
        typeof e.to < "u" && (t.preventDefault(), y.push(e.to));
        return;
      }
      if ([
        c.Href,
        c.Mail,
        c.Tel,
        c.Tab,
        c.Download
      ].includes(e.type)) {
        let l = e.to;
        if (typeof l != "string" && (l = String(l)), l) return;
        (!l || l === "#") && (t.preventDefault(), u("click", t));
        return;
      }
      u("click", t);
    }, M = (t) => {
      if (e.disabled)
        return t.preventDefault(), t.stopPropagation(), !1;
      if (e.confirmModal) {
        let l = typeof e.confirmData == "object" ? JSON.parse(JSON.stringify(e.confirmData)) : {};
        if (typeof l.onConfirm == "function") {
          let x = l.onConfirm.bind({});
          l.onConfirm = () => {
            x(), k(t);
          };
        } else
          l.onConfirm = () => {
            k(t);
          };
        return P(e.confirmModal, e.confirmModalKey, l);
      }
      k(t);
    };
    U(() => {
      (e.type === c.RouterLink || e.type === c.Legacy) && g();
    });
    const S = s(() => c.Download === e.type), o = s(() => c.Tab === e.type ? "_blank" : ""), n = s(() => oe(e.text));
    return (t, l) => S.value ? (r(), a("a", {
      key: 0,
      class: _(D.value),
      href: v.value,
      target: o.value,
      download: t.downloadFileName,
      onClick: M
    }, [
      h(C).text ? m(t.$slots, "text", {
        key: 0,
        text: n.value,
        href: v.value
      }) : n.value ? (r(), a(F, { key: 1 }, [
        O(z(n.value), 1)
      ], 64)) : i("", !0),
      h(C).default ? m(t.$slots, "default", { key: 2 }) : i("", !0)
    ], 10, he)) : (r(), a("a", {
      key: 1,
      class: _(D.value),
      href: v.value,
      target: o.value,
      onClick: M
    }, [
      h(C).text ? m(t.$slots, "text", {
        key: 0,
        text: n.value,
        href: v.value
      }) : n.value ? (r(), a(F, { key: 1 }, [
        O(z(n.value), 1)
      ], 64)) : i("", !0),
      h(C).default ? m(t.$slots, "default", { key: 2 }) : i("", !0)
    ], 10, Ce));
  }
}), Te = {
  install: (d, f) => {
    d.component("lkt-anchor") === void 0 && d.component("lkt-anchor", be);
  }
};
export {
  De as AnchorType,
  Te as default
};
