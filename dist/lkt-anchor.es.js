import { isObject as i } from "lkt-tools";
import { openBlock as c, createElementBlock as l, renderSlot as f } from "vue";
const h = {
  name: "LktAnchor",
  emits: ["click"],
  props: {
    to: { type: [String, Object], default: void 0 },
    vanilla: { type: Boolean, default: !1 },
    state: { type: String, default: "" },
    target: { type: String, default: "" }
  },
  computed: {
    href() {
      return i(this.to) && this.to.name ? "" : this.to;
    }
  },
  methods: {
    onClick(t) {
      if (!this.vanilla) {
        t.preventDefault(), t.stopPropagation(), this.$root.$router.push(this.to);
        return;
      }
      this.$emit("click", t);
    }
  }
}, d = (t, e) => {
  const o = t.__vccOpts || t;
  for (const [a, n] of e)
    o[a] = n;
  return o;
}, u = ["href", "data-state", "target"];
function p(t, e, o, a, n, r) {
  return c(), l("a", {
    "data-lkt": "anchor",
    href: r.href,
    "data-state": o.state,
    target: o.target,
    onClick: e[0] || (e[0] = (...s) => r.onClick && r.onClick(...s))
  }, [
    f(t.$slots, "default")
  ], 8, u);
}
const k = /* @__PURE__ */ d(h, [["render", p]]), _ = {
  install: (t, e) => {
    t.component("lkt-anchor", k);
  }
};
export {
  _ as default
};
