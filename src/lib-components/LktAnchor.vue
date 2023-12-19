<script lang="ts">
export default {name: "LktAnchor", inheritAttrs: false}
</script>

<script lang="ts" setup>
import {useRouter} from "vue-router";
import {computed} from "vue";

const props = defineProps({
    to: {type: [String, Object], default: undefined},
    target: {type: String, default: ''},
    href: {type: String, default: ''},
    route: {type: String, default: ''},
    palette: {type: String, default: ''},
    isBack: {type: Boolean, default: false},
    isVanilla: {type: Boolean, default: false},
    onClick: {type: [Function, undefined], default: undefined},
});

const emit = defineEmits(['click']);

const router = useRouter();

const classes = computed(() => {
        const r = ['lkt-anchor'];

        if (props.palette) r.push(`lkt-anchor--${props.palette}`);

        return r.join(' ');
    });


const onClick = (e: Event) => {

    if (props.isBack) {
        e.preventDefault();
        e.stopPropagation();
        router.back();
        return;
    }

    if (typeof props.onClick === 'function') {
        e.preventDefault();
        e.stopPropagation();
        return props.onClick();
    }

    if (!props.isVanilla) {
        e.preventDefault();
        e.stopPropagation();
        router.push(props.to);
        return;
    }

    emit('click', e);
}
</script>

<template>
    <a v-bind:class="classes"
       v-bind:href="href"
       v-bind:target="target"
       v-on:click="onClick">
        <slot></slot>
    </a>
</template>