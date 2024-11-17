<script lang="ts" setup>
import {RouteLocationRaw, useRoute, useRouter} from "vue-router";
import {computed, onMounted, ref, watch} from "vue";
import {LktObject} from "lkt-ts-interfaces";
import {openConfirm} from "lkt-modal-confirm";
import {AnchorType} from "../enum/AnchorType";

const props = withDefaults(defineProps<{
    type?: AnchorType
    to?: RouteLocationRaw|string
    class?: string
    isActive?: boolean
    downloadFileName?: string
    disabled?: boolean
    onClick?: Function | undefined
    confirmModal?: string
    confirmModalKey?: string
    confirmData?: LktObject
    imposter?: boolean

    // Legacy props (to be removed):
    target?: string
    href?: string
    route?: string
    download?: boolean
    isBack?: boolean
    isVanilla?: boolean
}>(), {
    type: AnchorType.Legacy,
    to: '',
    class: '',
    isActive: false,
    downloadFileName: '',
    disabled: false,
    onClick: undefined,
    confirmModal: '',
    confirmModalKey: '_',
    confirmData: () => ({}),
    imposter: false,

    // Legacy props (to be removed):
    target: '',
    href: '',
    route: '',
    download: false,
    isBack: false,
    isVanilla: false,
});

const emit = defineEmits(['click', 'active']);

const router = useRouter();

const routeIsActive = ref(props.isActive),
    routeIsActiveParent = ref(false),
    typeValue = ref(props.type);

const checkIfActiveRoute = () => {
    if (![AnchorType.RouterLink, AnchorType.Legacy].includes(typeValue.value)) return;
    let currentRoute = router?.currentRoute;
    if (currentRoute) {
        routeIsActive.value = currentRoute.value.path === props.to || currentRoute.value.path === props.href;
        emit('active', routeIsActive.value);

        let validParentPath = (currentPath: string, ownPath: string) => {
            if (ownPath === '') {
                return currentPath === '';
            }

            if (ownPath === '/') {
                return currentPath === '/';
            }

            return currentPath.startsWith(ownPath);
        }
        routeIsActiveParent.value = validParentPath(currentRoute.value.path, props.to);
    }
}

const route = useRoute();
watch(route, (to) => {
    checkIfActiveRoute();
}, {flush: 'pre', immediate: true, deep: true})

const classes = computed(() => {
        const r = [];

        if (!props.imposter) r.push('lkt-anchor');

        if (props.class) r.push(props.class);
        if (props.disabled) r.push('is-disabled');

        if (props.to) {
            if (routeIsActive.value) r.push('lkt-anchor-active');
            if (routeIsActiveParent.value) r.push('lkt-anchor-active-parent');
        }

        if (props.isActive && !r.includes('lkt-anchor-active')) r.push('lkt-anchor-active');

        return r.join(' ');
    }),
    computedHref = computed(() => {

        let href = '';
        if (typeof props.to === 'string') href = props.to;

        if (AnchorType.Mail === typeValue.value) return `mailto:${href}`;
        if (AnchorType.Tel === typeValue.value) return `tel:${href}`;

        if ([
            AnchorType.Href,
            AnchorType.Mail,
            AnchorType.Tel,
            AnchorType.Tab,
            AnchorType.Download,
        ].includes(typeValue.value)) {
            return href;
        }

        //@todo: href display if router link

        // Legacy mode:
        if (props.href !== '') return props.href;

        if (typeof props.to === 'string' && props.to !== '') return props.to;

        return '';
    });

const internalClickEvent = (e: Event) => {

    if (AnchorType.RouterLinkBack === typeValue.value) {
        e.preventDefault();
        router.back();
        return;
    }

    if (AnchorType.Action === typeValue.value) {
        if (typeof props.onClick === 'function') {
            let clickResponse = props.onClick(e);
            if (!clickResponse) {
                e.preventDefault();
                return clickResponse;
            }
        }
        return;
    }

    if (AnchorType.RouterLink === typeValue.value) {
        if (typeof props.to !== 'undefined') {
            e.preventDefault();
            router.push(props.to);
        }
        return;
    }

    if ([
        AnchorType.Href,
        AnchorType.Mail,
        AnchorType.Tel,
        AnchorType.Tab,
        AnchorType.Download,
    ].includes(typeValue.value)) {
        let href = props.to;
        if (typeof href !== 'string') href = String(href);

        if (href) return;

        if (!href || href === '#') {
            e.preventDefault();
            emit('click', e);
        }
        return;
    }


    // Legacy mode (@todo: remove):
    if (props.isBack) {
        e.preventDefault();
        router.back();
        return;
    }

    if (typeof props.onClick === 'function') {
        let clickResponse = props.onClick(e);
        if (!clickResponse) {
            e.preventDefault();
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
        router.push(props.to);
        return;
    }

    if (!props.isVanilla && typeof props.route !== 'undefined') {
        e.preventDefault();
        router.push(props.to);
        return;
    }

    emit('click', e);
}


const onClick = (e: Event) => {

    if (props.disabled) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }

    if (props.confirmModal) {
        let data = typeof props.confirmData === 'object' ? JSON.parse(JSON.stringify(props.confirmData)) : {};

        if (typeof data.onConfirm === 'function') {
            let externalConfirmAction = data.onConfirm.bind({});
            data.onConfirm = () => {
                externalConfirmAction();
                internalClickEvent(e);
            }
        } else {
            data.onConfirm = () => {
                internalClickEvent(e);
            }
        }
        return openConfirm(props.confirmModal, props.confirmModalKey, data);
    }

    internalClickEvent(e);
}

onMounted(() => {
    if (typeValue.value === AnchorType.RouterLink || typeValue.value === AnchorType.Legacy) {
        checkIfActiveRoute();
    }
})

const computedHasDownload = computed(() => {
    return AnchorType.Download === typeValue.value || props.download;
});

const computedTarget = computed(() => {
    if (AnchorType.Tab === typeValue.value) return '_blank';
    return props.target;
})
</script>

<template>
    <a v-if="computedHasDownload"
       v-bind:class="classes"
       v-bind:href="computedHref"
       v-bind:target="computedTarget"
       v-bind:download="downloadFileName"
       v-on:click="onClick">
        <slot/>
    </a>
    <a v-else
       v-bind:class="classes"
       v-bind:href="computedHref"
       v-bind:target="computedTarget"
       v-on:click="onClick">
        <slot/>
    </a>
</template>