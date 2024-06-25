<script lang="ts" setup>
import {RouteLocationRaw, useRouter} from "vue-router";
import {computed} from "vue";
import {LktObject} from "lkt-ts-interfaces";
import {openConfirm} from "lkt-modal-confirm";

const props = withDefaults(defineProps<{
    to?: RouteLocationRaw
    class?: string
    target?: string
    href?: string
    route?: string
    palette?: string
    isActive?: boolean
    download?: boolean
    downloadFileName?: string
    isBack?: boolean
    imposter?: boolean
    isVanilla?: boolean
    disabled?: boolean
    onClick?: Function | undefined
    confirmModal?: string
    confirmModalKey?: string
    confirmData?: LktObject
}>(), {
    to: '',
    class: '',
    target: '',
    href: '',
    route: '',
    palette: '',
    isActive: false,
    download: false,
    downloadFileName: '',
    isBack: false,
    imposter: false,
    isVanilla: false,
    disabled: false,
    onClick: undefined,
    confirmModal: '',
    confirmModalKey: '_',
    confirmData: () => ({}),
});

const emit = defineEmits(['click']);

const router = useRouter();

const classes = computed(() => {
        const r = [];

        if (!props.imposter) r.push('lkt-anchor');

        if (props.class) r.push(props.class);
        if (props.disabled) r.push('is-disabled');
        if (props.palette) r.push(`lkt-anchor--${props.palette}`);

        if (props.to) {
            let currentRoute = router.currentRoute;
            if (currentRoute.value.path === props.to) {
                r.push('lkt-anchor-active');
            }
        }

        if (props.isActive && !r.includes('lkt-anchor-active')) r.push('lkt-anchor-active');

        return r.join(' ');
    }),
    computedHref = computed(() => {
        if (props.href !== '') return props.href;

        if (typeof props.to === 'string' && props.to !== '') return props.to;

        return '';
    });


const onClick = (e: Event) => {

    if (props.disabled) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }

    const internalClickEvent = () => {
        if (props.isBack) {
            e.preventDefault();
            e.stopPropagation();
            router.back();
            return;
        }

        if (typeof props.onClick === 'function') {
            let clickResponse = props.onClick(e);
            if (!clickResponse) {
                e.preventDefault();
                e.stopPropagation();
                return clickResponse;
            }
        }

        if (props.href) {
            return;
        }

        if (!props.href || props.href === '#') {
            e.preventDefault();
        }

        if (!props.isVanilla && typeof props.to !== 'undefined') {
            e.preventDefault();
            e.stopPropagation();
            router.push(props.to);
            return;
        }

        if (!props.isVanilla && typeof props.route !== 'undefined') {
            e.preventDefault();
            e.stopPropagation();
            router.push(props.to);
            return;
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
    <a v-if="download"
       v-bind:class="classes"
       v-bind:href="computedHref"
       v-bind:target="target"
       v-bind:download="downloadFileName"
       v-on:click="onClick">
        <slot></slot>
    </a>
    <a v-else
       v-bind:class="classes"
       v-bind:href="computedHref"
       v-bind:target="target"
       v-on:click="onClick">
        <slot></slot>
    </a>
</template>