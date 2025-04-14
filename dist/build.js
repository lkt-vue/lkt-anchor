import { defineComponent as x, mergeDefaults as H, ref as L, computed as s, useSlots as E, resolveComponent as J, createElementBlock as r, openBlock as n, normalizeStyle as q, normalizeClass as v, createElementVNode as N, withModifiers as G, createCommentVNode as a, unref as C, renderSlot as m, toDisplayString as O, createBlock as D, Fragment as S, renderList as R, normalizeProps as j, mergeProps as w, watch as Q, onMounted as U, createTextVNode as V } from "vue";
import { useRouter as X, useRoute as Y } from "vue-router";
import { ModalType as Z, getDefaultValues as P, Modal as ee, getAnchorHref as te, AnchorType as c, extractI18nValue as oe, Anchor as le } from "lkt-vue-kernel";
import { AnchorType as Me } from "lkt-vue-kernel";
const ne = (d, f = "_", e = {}) => {
  {
    console.warn("ModalCanvas not defined");
    return;
  }
}, $ = (d, f = "_") => {
  {
    console.warn("ModalCanvas not defined");
    return;
  }
}, W = (d, f = "_", e = {}) => {
  let u = d;
  typeof u == "string" && u.indexOf("confirm__") === 0 && (u = u.substring(9)), ne("confirm__" + u, f, e);
}, ie = (d, f = "_") => {
  let e = d;
  typeof e == "string" && e.indexOf("confirm__") === 0 && (e = e.substring(9)), $("confirm__" + e, f);
}, re = {
  class: "lkt-modal-inner",
  ref: "inner"
}, ae = { class: "lkt-modal-header" }, ce = { class: "lkt-modal-header_title-container" }, se = {
  key: 0,
  class: "lkt-modal-header_pre-title"
}, ue = ["innerHTML"], de = {
  key: 1,
  class: "lkt-modal-header_title"
}, fe = { class: "lkt-modal-button-tray" }, me = { class: "lkt-modal-content" }, pe = {
  key: 0,
  class: "lkt-modal-footer"
}, ye = {
  key: 0,
  class: "lkt-modal-footer_main"
}, ke = {
  key: 1,
  class: "lkt-modal-button-tray"
}, ve = {
  key: 2,
  class: "lkt-modal-button-tray"
};
P(ee);
const he = ["href", "target", "download"], be = ["href", "target"], Ce = /* @__PURE__ */ x({
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
    icon: {},
    events: {},
    onClick: { type: Function }
  }, P(le)),
  emits: [
    "click",
    "active"
  ],
  setup(d, { emit: f }) {
    const e = d, u = f, g = E(), h = X(), B = L(e.isActive), M = L(!1), p = L(e.type), I = (t) => {
      var l;
      typeof ((l = e.events) == null ? void 0 : l.click) == "function" && e.events.click(t);
    }, T = () => {
      if (![c.RouterLink, c.Legacy].includes(p.value)) return;
      let t = h == null ? void 0 : h.currentRoute;
      if (t) {
        B.value = t.value.path === e.to, u("active", B.value);
        let l = (k, K) => K === "" ? k === "" : K === "/" ? k === "/" : k.startsWith(K);
        M.value = l(t.value.path, e.to);
      }
    }, _ = Y();
    Q(_, (t) => {
      T();
    }, { flush: "pre", immediate: !0, deep: !0 });
    const A = s(() => {
      const t = [];
      return e.imposter || t.push("lkt-anchor"), e.class && t.push(e.class), e.disabled && t.push("is-disabled"), e.to && (B.value && t.push("lkt-anchor-active"), M.value && t.push("lkt-anchor-active-parent")), e.isActive && !t.includes("lkt-anchor-active") && t.push("lkt-anchor-active"), t.join(" ");
    }), y = s(() => te(e)), b = (t) => {
      if (I(t), c.RouterLinkBack === e.type) {
        t.preventDefault(), h.back();
        return;
      }
      if (c.Action === e.type) {
        t.preventDefault(), u("click", t);
        return;
      }
      if (c.RouterLink === e.type) {
        typeof e.to < "u" && (t.preventDefault(), h.push(e.to));
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
    }, F = (t) => {
      if (e.disabled)
        return t.preventDefault(), t.stopPropagation(), !1;
      if (e.confirmModal) {
        let l = typeof e.confirmData == "object" ? JSON.parse(JSON.stringify(e.confirmData)) : {};
        if (typeof l.onConfirm == "function") {
          let k = l.onConfirm.bind({});
          l.onConfirm = () => {
            k(), b(t);
          };
        } else
          l.onConfirm = () => {
            b(t);
          };
        return W(e.confirmModal, e.confirmModalKey, l);
      }
      b(t);
    };
    U(() => {
      (e.type === c.RouterLink || e.type === c.Legacy) && T();
    });
    const z = s(() => c.Download === e.type), o = s(() => c.Tab === e.type ? "_blank" : ""), i = s(() => oe(e.text));
    return (t, l) => {
      const k = J("lkt-icon");
      return z.value ? (n(), r("a", {
        key: 0,
        class: v(A.value),
        href: y.value,
        target: o.value,
        download: t.downloadFileName,
        onClick: F
      }, [
        typeof t.icon == "string" && t.icon !== "" ? (n(), r("i", {
          key: 0,
          class: v(t.icon)
        }, null, 2)) : typeof t.icon == "object" && Object.keys(t.icon).length > 0 ? (n(), D(k, j(w({ key: 1 }, t.icon)), null, 16)) : a("", !0),
        C(g).text ? m(t.$slots, "text", {
          key: 2,
          text: i.value,
          href: y.value
        }) : i.value ? (n(), r(S, { key: 3 }, [
          V(O(i.value), 1)
        ], 64)) : a("", !0),
        C(g).default ? m(t.$slots, "default", { key: 4 }) : a("", !0)
      ], 10, he)) : (n(), r("a", {
        key: 1,
        class: v(A.value),
        href: y.value,
        target: o.value,
        onClick: F
      }, [
        typeof t.icon == "string" && t.icon !== "" ? (n(), r("i", {
          key: 0,
          class: v(t.icon)
        }, null, 2)) : typeof t.icon == "object" && Object.keys(t.icon).length > 0 ? (n(), D(k, j(w({ key: 1 }, t.icon)), null, 16)) : a("", !0),
        C(g).text ? m(t.$slots, "text", {
          key: 2,
          text: i.value,
          href: y.value
        }) : i.value ? (n(), r(S, { key: 3 }, [
          V(O(i.value), 1)
        ], 64)) : a("", !0),
        C(g).default ? m(t.$slots, "default", { key: 4 }) : a("", !0)
      ], 10, be));
    };
  }
}), Ne = {
  install: (d, f) => {
    d.component("lkt-anchor") === void 0 && d.component("lkt-anchor", Ce);
  }
};
export {
  Me as AnchorType,
  Ne as default
};
