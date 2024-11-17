import { defineComponent as M, ref as p, watch as _, computed as f, onMounted as H, openBlock as C, createElementBlock as b, normalizeClass as L, renderSlot as R } from "vue";
import { useRouter as N, useRoute as S } from "vue-router";
import V, { openConfirm as $ } from "lkt-modal-confirm";
var o = /* @__PURE__ */ ((l) => (l.Href = "href", l.RouterLink = "router-link", l.RouterLinkBack = "router-link-back", l.Mail = "mail", l.Tel = "tel", l.Tab = "tab", l.Download = "download", l.Action = "action", l.Legacy = "", l))(o || {});
const A = ["href", "target", "download"], F = ["href", "target"], I = /* @__PURE__ */ M({
  __name: "LktAnchor",
  props: {
    type: { default: o.Legacy },
    to: { default: "" },
    class: { default: "" },
    isActive: { type: Boolean, default: !1 },
    downloadFileName: { default: "" },
    disabled: { type: Boolean, default: !1 },
    onClick: { type: Function, default: void 0 },
    confirmModal: { default: "" },
    confirmModalKey: { default: "_" },
    confirmData: { default: () => ({}) },
    imposter: { type: Boolean, default: !1 },
    target: { default: "" },
    href: { default: "" },
    route: { default: "" },
    download: { type: Boolean, default: !1 },
    isBack: { type: Boolean, default: !1 },
    isVanilla: { type: Boolean, default: !1 }
  },
  emits: ["click", "active"],
  setup(l, { emit: v }) {
    const e = l, u = v, i = N(), s = p(e.isActive), m = p(!1), n = p(e.type), k = () => {
      if (![o.RouterLink, o.Legacy].includes(n.value)) return;
      let t = i == null ? void 0 : i.currentRoute;
      if (t) {
        s.value = t.value.path === e.to || t.value.path === e.href, u("active", s.value);
        let a = (r, d) => d === "" ? r === "" : d === "/" ? r === "/" : r.startsWith(d);
        m.value = a(t.value.path, e.to);
      }
    }, B = S();
    _(B, (t) => {
      k();
    }, { flush: "pre", immediate: !0, deep: !0 });
    const h = f(() => {
      const t = [];
      return e.imposter || t.push("lkt-anchor"), e.class && t.push(e.class), e.disabled && t.push("is-disabled"), e.to && (s.value && t.push("lkt-anchor-active"), m.value && t.push("lkt-anchor-active-parent")), e.isActive && !t.includes("lkt-anchor-active") && t.push("lkt-anchor-active"), t.join(" ");
    }), y = f(() => {
      let t = "";
      return typeof e.to == "string" && (t = e.to), o.Mail === n.value ? `mailto:${t}` : o.Tel === n.value ? `tel:${t}` : [
        o.Href,
        o.Mail,
        o.Tel,
        o.Tab,
        o.Download
      ].includes(n.value) ? t : e.href !== "" ? e.href : typeof e.to == "string" && e.to !== "" ? e.to : "";
    }), c = (t) => {
      if (o.RouterLinkBack === n.value) {
        t.preventDefault(), i.back();
        return;
      }
      if (o.Action === n.value) {
        if (typeof e.onClick == "function") {
          let a = e.onClick(t);
          if (!a)
            return t.preventDefault(), a;
        }
        return;
      }
      if (o.RouterLink === n.value) {
        typeof e.to < "u" && (t.preventDefault(), i.push(e.to));
        return;
      }
      if ([
        o.Href,
        o.Mail,
        o.Tel,
        o.Tab,
        o.Download
      ].includes(n.value)) {
        let a = e.to;
        if (typeof a != "string" && (a = String(a)), a) return;
        (!a || a === "#") && (t.preventDefault(), u("click", t));
        return;
      }
      if (e.isBack) {
        t.preventDefault(), i.back();
        return;
      }
      if (typeof e.onClick == "function") {
        let a = e.onClick(t);
        if (!a)
          return t.preventDefault(), a;
      }
      if (!e.href) {
        if ((!e.href || e.href === "#") && t.preventDefault(), !e.isVanilla && typeof e.to < "u") {
          t.preventDefault(), i.push(e.to);
          return;
        }
        if (!e.isVanilla && typeof e.route < "u") {
          t.preventDefault(), i.push(e.to);
          return;
        }
        u("click", t);
      }
    }, D = (t) => {
      if (e.disabled)
        return t.preventDefault(), t.stopPropagation(), !1;
      if (e.confirmModal) {
        let a = typeof e.confirmData == "object" ? JSON.parse(JSON.stringify(e.confirmData)) : {};
        if (typeof a.onConfirm == "function") {
          let r = a.onConfirm.bind({});
          a.onConfirm = () => {
            r(), c(t);
          };
        } else
          a.onConfirm = () => {
            c(t);
          };
        return $(e.confirmModal, e.confirmModalKey, a);
      }
      c(t);
    };
    H(() => {
      (n.value === o.RouterLink || n.value === o.Legacy) && k();
    });
    const w = f(() => o.Download === n.value || e.download), g = f(() => o.Tab === n.value ? "_blank" : e.target);
    return (t, a) => w.value ? (C(), b("a", {
      key: 0,
      class: L(h.value),
      href: y.value,
      target: g.value,
      download: t.downloadFileName,
      onClick: D
    }, [
      R(t.$slots, "default")
    ], 10, A)) : (C(), b("a", {
      key: 1,
      class: L(h.value),
      href: y.value,
      target: g.value,
      onClick: D
    }, [
      R(t.$slots, "default")
    ], 10, F));
  }
}), K = {
  install: (l, v) => {
    l.component("lkt-anchor") === void 0 && l.component("lkt-anchor", I), l.component("lkt-modal-confirm") === void 0 && l.use(V);
  }
};
export {
  o as AnchorType,
  K as default
};
