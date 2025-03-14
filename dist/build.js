import { defineComponent as V, mergeDefaults as $, ref as A, computed as s, useSlots as H, resolveComponent as P, createElementBlock as a, openBlock as r, normalizeStyle as W, normalizeClass as g, createElementVNode as C, withModifiers as q, createCommentVNode as i, unref as B, renderSlot as y, toDisplayString as I, createBlock as w, Fragment as F, renderList as K, normalizeProps as R, mergeProps as j, watch as G, onMounted as Q, createTextVNode as O } from "vue";
import { useRouter as U, useRoute as X } from "vue-router";
import { ModalType as Y, getDefaultValues as E, Modal as Z, getAnchorHref as ee, AnchorType as c, extractI18nValue as te, Anchor as oe } from "lkt-vue-kernel";
import { AnchorType as De } from "lkt-vue-kernel";
const le = (u, f = "_", e = {}) => {
  {
    console.warn("ModalCanvas not defined");
    return;
  }
}, z = (u, f = "_") => {
  {
    console.warn("ModalCanvas not defined");
    return;
  }
}, J = (u, f = "_", e = {}) => {
  let d = u;
  typeof d == "string" && d.indexOf("confirm__") === 0 && (d = d.substring(9)), le("confirm__" + d, f, e);
}, ne = (u, f = "_") => {
  let e = u;
  typeof e == "string" && e.indexOf("confirm__") === 0 && (e = e.substring(9)), z("confirm__" + e, f);
}, re = {
  class: "lkt-modal-inner",
  ref: "inner"
}, ae = { class: "lkt-modal-header" }, ie = { class: "lkt-modal-header_title-container" }, ce = {
  key: 0,
  class: "lkt-modal-header_pre-title"
}, se = ["innerHTML"], ue = {
  key: 1,
  class: "lkt-modal-header_title"
}, de = { class: "lkt-modal-button-tray" }, fe = { class: "lkt-modal-content" }, me = {
  key: 0,
  class: "lkt-modal-footer"
}, pe = {
  key: 0,
  class: "lkt-modal-footer_main"
}, ve = {
  key: 1,
  class: "lkt-modal-button-tray"
}, ye = {
  key: 2,
  class: "lkt-modal-button-tray"
};
E(Z);
const ke = ["href", "target", "download"], he = ["href", "target"], be = /* @__PURE__ */ V({
  __name: "LktAnchor",
  props: /* @__PURE__ */ $({
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
  }, E(oe)),
  emits: [
    "click",
    "active"
  ],
  setup(u, { emit: f }) {
    const e = u, d = f, T = H(), p = U(), k = A(e.isActive), N = A(!1), m = A(e.type), D = () => {
      if (![c.RouterLink, c.Legacy].includes(m.value)) return;
      let t = p == null ? void 0 : p.currentRoute;
      if (t) {
        k.value = t.value.path === e.to, d("active", k.value);
        let l = (n, S) => S === "" ? n === "" : S === "/" ? n === "/" : n.startsWith(S);
        N.value = l(t.value.path, e.to);
      }
    }, _ = X();
    G(_, (t) => {
      D();
    }, { flush: "pre", immediate: !0, deep: !0 });
    const h = s(() => {
      const t = [];
      return e.imposter || t.push("lkt-anchor"), e.class && t.push(e.class), e.disabled && t.push("is-disabled"), e.to && (k.value && t.push("lkt-anchor-active"), N.value && t.push("lkt-anchor-active-parent")), e.isActive && !t.includes("lkt-anchor-active") && t.push("lkt-anchor-active"), t.join(" ");
    }), M = s(() => ee(e)), v = (t) => {
      var l;
      if (c.RouterLinkBack === e.type) {
        t.preventDefault(), p.back();
        return;
      }
      if (c.Action === e.type) {
        if (typeof ((l = e.events) == null ? void 0 : l.click) == "function") {
          let n = e.events.click(t);
          if (!n)
            return t.preventDefault(), n;
        }
        return;
      }
      if (c.RouterLink === e.type) {
        typeof e.to < "u" && (t.preventDefault(), p.push(e.to));
        return;
      }
      if ([
        c.Href,
        c.Mail,
        c.Tel,
        c.Tab,
        c.Download
      ].includes(e.type)) {
        let n = e.to;
        if (typeof n != "string" && (n = String(n)), n) return;
        (!n || n === "#") && (t.preventDefault(), d("click", t));
        return;
      }
      d("click", t);
    }, b = (t) => {
      if (e.disabled)
        return t.preventDefault(), t.stopPropagation(), !1;
      if (e.confirmModal) {
        let l = typeof e.confirmData == "object" ? JSON.parse(JSON.stringify(e.confirmData)) : {};
        if (typeof l.onConfirm == "function") {
          let n = l.onConfirm.bind({});
          l.onConfirm = () => {
            n(), v(t);
          };
        } else
          l.onConfirm = () => {
            v(t);
          };
        return J(e.confirmModal, e.confirmModalKey, l);
      }
      v(t);
    };
    Q(() => {
      (e.type === c.RouterLink || e.type === c.Legacy) && D();
    });
    const L = s(() => c.Download === e.type), x = s(() => c.Tab === e.type ? "_blank" : ""), o = s(() => te(e.text));
    return (t, l) => L.value ? (r(), a("a", {
      key: 0,
      class: g(h.value),
      href: M.value,
      target: x.value,
      download: t.downloadFileName,
      onClick: b
    }, [
      o.value ? (r(), a(F, { key: 0 }, [
        O(I(o.value), 1)
      ], 64)) : i("", !0),
      B(T).default ? y(t.$slots, "default", { key: 1 }) : i("", !0)
    ], 10, ke)) : (r(), a("a", {
      key: 1,
      class: g(h.value),
      href: M.value,
      target: x.value,
      onClick: b
    }, [
      o.value ? (r(), a(F, { key: 0 }, [
        O(I(o.value), 1)
      ], 64)) : i("", !0),
      B(T).default ? y(t.$slots, "default", { key: 1 }) : i("", !0)
    ], 10, he));
  }
}), Be = {
  install: (u, f) => {
    u.component("lkt-anchor") === void 0 && u.component("lkt-anchor", be);
  }
};
export {
  De as AnchorType,
  Be as default
};
