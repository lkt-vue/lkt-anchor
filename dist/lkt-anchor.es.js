import { defineComponent as c, computed as i, openBlock as p, createElementBlock as f, normalizeClass as u, renderSlot as d } from "vue";
import { useRouter as h } from "vue-router";
const m = ["href", "target"], k = { name: "LktAnchor", inheritAttrs: !1 }, g = /* @__PURE__ */ c({
  ...k,
  props: {
    to: { type: [String, Object], default: void 0 },
    target: { type: String, default: "" },
    href: { type: String, default: "" },
    route: { type: String, default: "" },
    palette: { type: String, default: "" },
    isBack: { type: Boolean, default: !1 },
    isVanilla: { type: Boolean, default: !1 }
  },
  emits: ["click"],
  setup(e, { emit: a }) {
    const o = e, r = a, n = h(), l = i(() => {
      const t = ["lkt-anchor"];
      return o.palette && t.push(`lkt-anchor--${o.palette}`), t.join(" ");
    }), s = (t) => {
      if (o.isBack) {
        t.preventDefault(), t.stopPropagation(), n.back();
        return;
      }
      if (!o.isVanilla) {
        t.preventDefault(), t.stopPropagation(), n.push(o.to);
        return;
      }
      r("click", t);
    };
    return (t, y) => (p(), f("a", {
      class: u(l.value),
      href: e.href,
      target: e.target,
      onClick: s
    }, [
      d(t.$slots, "default")
    ], 10, m));
  }
}), _ = {
  install: (e, a) => {
    e.component("lkt-anchor", g);
  }
};
export {
  _ as default
};
