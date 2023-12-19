import { defineComponent as s, computed as c, openBlock as p, createElementBlock as f, normalizeClass as u, renderSlot as d } from "vue";
import { useRouter as k } from "vue-router";
const h = ["href", "target"], m = { name: "LktAnchor", inheritAttrs: !1 }, g = /* @__PURE__ */ s({
  ...m,
  props: {
    to: { type: [String, Object], default: void 0 },
    target: { type: String, default: "" },
    href: { type: String, default: "" },
    route: { type: String, default: "" },
    palette: { type: String, default: "" },
    isBack: { type: Boolean, default: !1 },
    isVanilla: { type: Boolean, default: !1 },
    onClick: { type: [Function, void 0], default: void 0 }
  },
  emits: ["click"],
  setup(o, { emit: n }) {
    const e = o, r = n, a = k(), l = c(() => {
      const t = ["lkt-anchor"];
      return e.palette && t.push(`lkt-anchor--${e.palette}`), t.join(" ");
    }), i = (t) => {
      if (e.isBack) {
        t.preventDefault(), t.stopPropagation(), a.back();
        return;
      }
      if (typeof e.onClick == "function")
        return t.preventDefault(), t.stopPropagation(), e.onClick();
      if (!e.isVanilla) {
        t.preventDefault(), t.stopPropagation(), a.push(e.to);
        return;
      }
      r("click", t);
    };
    return (t, y) => (p(), f("a", {
      class: u(l.value),
      href: o.href,
      target: o.target,
      onClick: i
    }, [
      d(t.$slots, "default")
    ], 10, h));
  }
}), C = {
  install: (o, n) => {
    o.component("lkt-anchor", g);
  }
};
export {
  C as default
};
