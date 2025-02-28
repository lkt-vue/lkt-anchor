<script lang="ts" setup>
import {useRoute, useRouter} from "vue-router";
import {computed, onMounted, ref, watch} from "vue";
import {openConfirm} from "lkt-modal";
import {Anchor, AnchorConfig, AnchorType, getDefaultValues} from "lkt-vue-kernel";

const props = withDefaults(defineProps<AnchorConfig>(), getDefaultValues(Anchor));

const instance = ref(new Anchor(props));
watch(props, (v) => instance.value = new Anchor(v));

const emit = defineEmits(['click', 'active']);

const router = useRouter();

const routeIsActive = ref(props.isActive),
    routeIsActiveParent = ref(false),
    typeValue = ref(props.type);

const checkIfActiveRoute = () => {
    if (![AnchorType.RouterLink, AnchorType.Legacy].includes(typeValue.value)) return;
    let currentRoute = router?.currentRoute;
    if (currentRoute) {
        routeIsActive.value = currentRoute.value.path === props.to;
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
        //@ts-ignore
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
        return instance.value.getHref();
    });

const internalClickEvent = (e: Event) => {

    if (AnchorType.RouterLinkBack === props.type) {
        e.preventDefault();
        router.back();
        return;
    }

    if (AnchorType.Action === props.type) {
        if (typeof props.events?.click === 'function') {
            let clickResponse = props.events.click(e);
            if (!clickResponse) {
                e.preventDefault();
                return clickResponse;
            }
        }
        return;
    }

    if (AnchorType.RouterLink === props.type) {
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
    ].includes(props.type)) {
        let href = props.to;
        if (typeof href !== 'string') href = String(href);

        if (href) return;

        if (!href || href === '#') {
            e.preventDefault();
            emit('click', e);
        }
        return;
    }

    emit('click', e);
}


const doClick = (e: Event) => {

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
    if (props.type === AnchorType.RouterLink || props.type === AnchorType.Legacy) {
        checkIfActiveRoute();
    }
})

const computedHasDownload = computed(() => {
    return AnchorType.Download === props.type;
});

const computedTarget = computed(() => {
    if (AnchorType.Tab === props.type) return '_blank';
    return '';
})
</script>

<template>
    <a v-if="computedHasDownload"
       :class="classes"
       :href="computedHref"
       :target="computedTarget"
       :download="downloadFileName"
       @click="doClick">
        <slot/>
    </a>
    <a v-else
       :class="classes"
       :href="computedHref"
       :target="computedTarget"
       @click="doClick">
        <slot/>
    </a>
</template>