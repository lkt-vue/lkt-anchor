import { defineComponent as j, mergeDefaults as V, ref as T, computed as a, useSlots as J, resolveComponent as P, createElementBlock as r, openBlock as l, normalizeStyle as W, normalizeClass as g, createElementVNode as b, withModifiers as K, createCommentVNode as u, unref as F, renderSlot as y, toDisplayString as q, createBlock as L, Fragment as z, renderList as R, normalizeProps as x, mergeProps as O, watch as $, onMounted as G } from "vue";
import { useRouter as Q, useRoute as U } from "vue-router";
import { ModalType as X, getDefaultValues as H, Modal as Y, Anchor as S, AnchorType as i } from "lkt-vue-kernel";
import { AnchorType as _e } from "lkt-vue-kernel";
const Z = (c, f = "_", e = {}) => {
  {
    console.warn("ModalCanvas not defined");
    return;
  }
}, I = (c, f = "_") => {
  {
    console.warn("ModalCanvas not defined");
    return;
  }
}, E = (c, f = "_", e = {}) => {
  let s = c;
  typeof s == "string" && s.indexOf("confirm__") === 0 && (s = s.substring(9)), Z("confirm__" + s, f, e);
}, ee = (c, f = "_") => {
  let e = c;
  typeof e == "string" && e.indexOf("confirm__") === 0 && (e = e.substring(9)), I("confirm__" + e, f);
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
const me = ["href", "target", "download"], pe = ["href", "target"], ke = /* @__PURE__ */ j({
  __name: "LktAnchor",
  props: /* @__PURE__ */ V({
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
    events: {},
    onClick: { type: Function }
  }, H(S)),
  emits: ["click", "active"],
  setup(c, { emit: f }) {
    const e = c, s = T(new S(e));
    $(e, (t) => s.value = new S(t));
    const _ = f, p = Q(), v = T(e.isActive), N = T(!1), m = T(e.type), D = () => {
      if (![i.RouterLink, i.Legacy].includes(m.value)) return;
      let t = p == null ? void 0 : p.currentRoute;
      if (t) {
        v.value = t.value.path === e.to, _("active", v.value);
        let n = (o, d) => d === "" ? o === "" : d === "/" ? o === "/" : o.startsWith(d);
        N.value = n(t.value.path, e.to);
      }
    }, B = U();
    $(B, (t) => {
      D();
    }, { flush: "pre", immediate: !0, deep: !0 });
    const h = a(() => {
      const t = [];
      return e.imposter || t.push("lkt-anchor"), e.class && t.push(e.class), e.disabled && t.push("is-disabled"), e.to && (v.value && t.push("lkt-anchor-active"), N.value && t.push("lkt-anchor-active-parent")), e.isActive && !t.includes("lkt-anchor-active") && t.push("lkt-anchor-active"), t.join(" ");
    }), M = a(() => s.value.getHref()), k = (t) => {
      var n;
      if (i.RouterLinkBack === e.type) {
        t.preventDefault(), p.back();
        return;
      }
      if (i.Action === e.type) {
        if (typeof ((n = e.events) == null ? void 0 : n.click) == "function") {
          let o = e.events.click(t);
          if (!o)
            return t.preventDefault(), o;
        }
        return;
      }
      if (i.RouterLink === e.type) {
        typeof e.to < "u" && (t.preventDefault(), p.push(e.to));
        return;
      }
      if ([
        i.Href,
        i.Mail,
        i.Tel,
        i.Tab,
        i.Download
      ].includes(e.type)) {
        let o = e.to;
        if (typeof o != "string" && (o = String(o)), o) return;
        (!o || o === "#") && (t.preventDefault(), _("click", t));
        return;
      }
      _("click", t);
    }, C = (t) => {
      if (e.disabled)
        return t.preventDefault(), t.stopPropagation(), !1;
      if (e.confirmModal) {
        let n = typeof e.confirmData == "object" ? JSON.parse(JSON.stringify(e.confirmData)) : {};
        if (typeof n.onConfirm == "function") {
          let o = n.onConfirm.bind({});
          n.onConfirm = () => {
            o(), k(t);
          };
        } else
          n.onConfirm = () => {
            k(t);
          };
        return E(e.confirmModal, e.confirmModalKey, n);
      }
      k(t);
    };
    G(() => {
      (e.type === i.RouterLink || e.type === i.Legacy) && D();
    });
    const A = a(() => i.Download === e.type), w = a(() => i.Tab === e.type ? "_blank" : "");
    return (t, n) => A.value ? (l(), r("a", {
      key: 0,
      class: g(h.value),
      href: M.value,
      target: w.value,
      download: t.downloadFileName,
      onClick: C
    }, [
      y(t.$slots, "default")
    ], 10, me)) : (l(), r("a", {
      key: 1,
      class: g(h.value),
      href: M.value,
      target: w.value,
      onClick: C
    }, [
      y(t.$slots, "default")
    ], 10, pe));
  }
}), Ce = {
  install: (c, f) => {
    c.component("lkt-anchor") === void 0 && c.component("lkt-anchor", ke);
  }
};
export {
  _e as AnchorType,
  Ce as default
};
