<script lang="ts">
export default {name: "LktAnchor", inheritAttrs: false}
</script>

<script lang="ts" setup>
import {useRouter} from "vue-router";
import {computed} from "vue";
import {openConfirm} from "lkt-modal-confirm";

const props = defineProps({
    to: {type: [String, Object], default: undefined},
    target: {type: String, default: ''},
    href: {type: String, default: ''},
    route: {type: String, default: ''},
    palette: {type: String, default: ''},
    isBack: {type: Boolean, default: false},
    isVanilla: {type: Boolean, default: false},
    onClick: {type: [Function, undefined], default: undefined},
    confirmModal: {type: String, default: ''},
    confirmModalKey: {type: String, default: '_'},
    confirmData: {type: Object, required: false, default: () => ({})},
});

const emit = defineEmits(['click']);

const router = useRouter();

const classes = computed(() => {
        const r = ['lkt-anchor'];

        if (props.palette) r.push(`lkt-anchor--${props.palette}`);

        return r.join(' ');
    });


const onClick = (e: Event) => {

    const internalClickEvent = () => {
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

        if (!props.href || props.href === '#') {
            e.preventDefault();
        }

        emit('click', e);
    }

    if (props.confirmModal) {
        let data = typeof props.confirmData === 'object' ? JSON.parse(JSON.stringify(props.confirmData)) : {};

        if (typeof data.onConfirm === 'function') {
            let externalConfirmAction = data.onConfirm.bind({});
            data.onConfirm = () => {
                externalConfirmAction();
                internalClickEvent();
            }
        } else {
            data.onConfirm = () => {
                internalClickEvent();
            }
        }
        return openConfirm(props.confirmModal, props.confirmModalKey, data);
    }

    internalClickEvent();

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