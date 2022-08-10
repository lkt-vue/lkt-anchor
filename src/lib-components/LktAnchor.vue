<template>
    <a data-lkt="anchor"
       v-bind:href="href"
       v-bind:data-state="state"
       v-bind:target="target"
       v-on:click="onClick">
        <slot></slot>
    </a>
</template>

<script lang="ts">
import {isObject} from "lkt-tools";

export default {
    name: "LktAnchor",
    emits: ['click'],
    props: {
        to: {type: [String, Object], default: undefined},
        vanilla: {type: Boolean, default: false},
        state: {type: String, default: ''},
        target: {type: String, default: ''},
        href: {type: String, default: ''},
        route: {type: String, default: ''}
    },
    computed: {
        computedHref() {
            if (isObject(this.to)) {
                if (this.to.name) {
                    return '';
                }
            }
            return this.to;
        }
    },
    methods: {
        onClick(e: Event) {
            if (!this.vanilla) {
                e.preventDefault();
                e.stopPropagation();
                this.$root.$router.push(this.to);
                return;
            }

            this.$emit('click', e);
        }
    }
}
</script>