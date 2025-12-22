import { defineComponent as G, mergeDefaults as Q, ref as O, computed as r, useSlots as X, resolveComponent as Y, createElementBlock as c, openBlock as n, normalizeStyle as te, normalizeClass as D, createElementVNode as j, withModifiers as oe, createCommentVNode as a, unref as b, createVNode as ne, normalizeProps as _, guardReactiveProps as le, withCtx as ae, renderSlot as k, toDisplayString as P, createBlock as T, Fragment as J, renderList as q, mergeProps as S, watch as re, onMounted as ie, createTextVNode as ue } from "vue";
import { useRouter as ce, useRoute as se } from "vue-router";
import { ModalController as R, ModalType as de, ButtonType as fe, getDefaultValues as Z, Modal as pe, extractPropValue as E, IconPosition as H, getAnchorHref as me, AnchorType as d, extractI18nValue as ve, Anchor as ye } from "lkt-vue-kernel";
import { AnchorType as He } from "lkt-vue-kernel";
const ke = (s, p = "_", e = {}) => {
  if (!R.canvas) {
    console.warn("ModalCanvas not defined");
    return;
  }
  R.open({
    modalName: s,
    modalKey: p
  }, e, !0);
}, U = (s, p = "_") => {
  if (!R.canvas) {
    console.warn("ModalCanvas not defined");
    return;
  }
  R.close({
    modalName: s,
    modalKey: p
  });
}, ee = (s, p = "_", e = {}) => {
  let f = s;
  typeof f == "string" && f.indexOf("confirm__") === 0 && (f = f.substring(9)), ke("confirm__" + f, p, e);
}, he = (s, p = "_") => {
  let e = s;
  typeof e == "string" && e.indexOf("confirm__") === 0 && (e = e.substring(9)), U("confirm__" + e, p);
}, be = ["data-modal", "data-key"], ge = {
  class: "lkt-modal-inner",
  ref: "inner"
}, Ce = { class: "lkt-modal-header" }, Be = {
  key: 0,
  class: "lkt-modal-header-actions"
}, _e = { class: "lkt-modal-header_title-container" }, Te = {
  key: 0,
  class: "lkt-modal-header_pre-title"
}, xe = ["innerHTML"], Ne = {
  key: 1,
  class: "lkt-modal-header_title"
}, Ie = { class: "lkt-modal-button-tray" }, Ae = { class: "lkt-modal-content" }, Me = {
  key: 0,
  class: "lkt-modal-footer"
}, je = {
  key: 0,
  class: "lkt-modal-footer_main"
}, De = {
  key: 1,
  class: "lkt-modal-button-tray"
}, Se = {
  key: 2,
  class: "lkt-modal-button-tray"
};
Z(pe);
const we = ["href", "target", "download"], Fe = ["href", "target"], Ke = {
  key: 2,
  class: "lkt-anchor--label"
}, Le = /* @__PURE__ */ G({
  __name: "LktAnchor",
  props: /* @__PURE__ */ Q({
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
  }, Z(ye)),
  emits: [
    "click",
    "active"
  ],
  setup(s, { emit: p }) {
    const e = s, f = p, x = X(), g = ce(), N = O(e.isActive), K = O(!1), h = O(e.type), v = r(() => {
      if (typeof e.to == "function") return e.to(e.prop);
      if (typeof e.to == "string") return E(e.to, e.prop);
      let o = e.to.path;
      if (!o && e.to.name) {
        let l = g.getRoutes().find((m) => m.name === e.to.name);
        l && (o = l.path);
      }
      return {
        ...e.to,
        path: E(o, e.prop)
      };
    }), u = r(() => {
      let o = e.icon;
      return E(o, e.prop);
    }), y = r(() => {
      if (typeof u.value == "object" && u.value.position === H.End)
        return u.value;
    }), w = r(() => typeof u.value.dot == "boolean" ? "" : u.value.dot), I = r(() => typeof u.value == "string" ? {
      icon: u.value,
      dot: w.value
    } : typeof u.value == "object" && u.value.position !== H.End ? u.value : {}), L = r(() => typeof y.value == "string" && y.value !== "" ? {
      icon: y.value,
      class: "lkt-anchor-icon-end"
    } : typeof y.value == "object" && Object.keys(y.value).length > 0 ? {
      ...y.value,
      class: "lkt-anchor-icon-end"
    } : typeof u.value == "object" && u.value.position === H.End ? {
      ...u.value,
      class: "lkt-anchor-icon-end"
    } : {}), F = (o) => {
      var l;
      typeof ((l = e.events) == null ? void 0 : l.click) == "function" && e.events.click(o);
    }, A = () => {
      if (![d.RouterLink, d.Legacy].includes(h.value)) return;
      let o = g == null ? void 0 : g.currentRoute;
      if (o) {
        N.value = typeof v.value == "object" ? o.value.path === v.value.path : o.value.path === v.value, f("active", N.value);
        let l = (m, z) => z === "" ? m === "" : z === "/" ? m === "/" : m.startsWith(z);
        K.value = l(o.value.path, v.value);
      }
    }, V = se();
    re(V, (o) => {
      A();
    }, { flush: "pre", immediate: !0, deep: !0 });
    const $ = r(() => {
      const o = [];
      return e.imposter || o.push("lkt-anchor"), e.class && o.push(e.class), e.disabled && o.push("is-disabled"), v.value && (N.value && o.push("lkt-anchor-active"), K.value && o.push("lkt-anchor-active-parent")), e.isActive && !o.includes("lkt-anchor-active") && o.push("lkt-anchor-active"), o.join(" ");
    }), t = r(() => me(e)), i = (o) => {
      if (F(o), d.RouterLinkBack === e.type) {
        o.preventDefault(), g.back();
        return;
      }
      if (d.Action === e.type) {
        o.preventDefault(), f("click", o);
        return;
      }
      if (d.RouterLink === e.type) {
        typeof v.value < "u" && (o.preventDefault(), g.push(v.value));
        return;
      }
      if ([
        d.Href,
        d.Mail,
        d.Tel,
        d.Tab,
        d.Download
      ].includes(e.type)) {
        let l = v.value;
        if (typeof l == "object" && (l = String(l.path)), typeof l != "string" && (l = String(l)), l) return;
        (!l || l === "#") && (o.preventDefault(), f("click", o));
        return;
      }
      f("click", o);
    }, B = (o) => {
      if (e.disabled)
        return o.preventDefault(), o.stopPropagation(), !1;
      if (e.confirmModal) {
        let l = typeof e.confirmData == "object" ? JSON.parse(JSON.stringify(e.confirmData)) : {};
        if (typeof l.onConfirm == "function") {
          let m = l.onConfirm.bind({});
          l.onConfirm = () => {
            m(), i(o);
          };
        } else
          l.onConfirm = () => {
            i(o);
          };
        return ee(e.confirmModal, e.confirmModalKey, l);
      }
      i(o);
    };
    ie(() => {
      (e.type === d.RouterLink || e.type === d.Legacy) && A();
    });
    const C = r(() => d.Download === e.type), W = r(() => d.Tab === e.type ? "_blank" : ""), M = r(() => ve(e.text));
    return (o, l) => {
      const m = Y("lkt-icon");
      return C.value ? (n(), c("a", {
        key: 0,
        class: D($.value),
        href: t.value,
        target: W.value,
        download: s.downloadFileName,
        onClick: B
      }, [
        u.value ? (n(), T(m, _(S({ key: 0 }, I.value)), null, 16)) : a("", !0),
        b(x).text ? k(o.$slots, "text", {
          key: 1,
          text: M.value,
          href: t.value
        }) : M.value ? (n(), c(J, { key: 2 }, [
          ue(P(M.value), 1)
        ], 64)) : a("", !0),
        b(x).default ? k(o.$slots, "default", { key: 3 }) : a("", !0),
        y.value ? (n(), T(m, _(S({ key: 4 }, L.value)), null, 16)) : a("", !0)
      ], 10, we)) : (n(), c("a", {
        key: 1,
        class: D($.value),
        href: t.value,
        target: W.value,
        onClick: B
      }, [
        u.value ? (n(), T(m, _(S({ key: 0 }, I.value)), null, 16)) : a("", !0),
        b(x).text ? k(o.$slots, "text", {
          key: 1,
          text: M.value,
          href: t.value
        }) : M.value ? (n(), c("span", Ke, P(M.value), 1)) : a("", !0),
        b(x).default ? k(o.$slots, "default", { key: 3 }) : a("", !0),
        y.value ? (n(), T(m, _(S({ key: 4 }, L.value)), null, 16)) : a("", !0)
      ], 10, Fe));
    };
  }
}), Ve = {
  install: (s, p) => {
    s.component("lkt-anchor") === void 0 && s.component("lkt-anchor", Le);
  }
};
export {
  He as AnchorType,
  Ve as default
};
