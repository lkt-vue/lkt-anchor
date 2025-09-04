<script lang="ts" setup>
import {useRoute, useRouter} from "vue-router";
import {computed, onMounted, ref, useSlots, watch} from "vue";
import {openConfirm} from "lkt-modal";
import {
    Anchor,
    AnchorConfig,
    AnchorType,
    extractI18nValue,
    extractPropValue,
    getAnchorHref,
    getDefaultValues, IconConfig
} from "lkt-vue-kernel";

const props = withDefaults(defineProps<AnchorConfig>(), getDefaultValues(Anchor));

const emit = defineEmits([
    'click',
    'active'
]);

const slots = useSlots();

const router = useRouter();

const routeIsActive = ref(props.isActive),
    routeIsActiveParent = ref(false),
    typeValue = ref(props.type);

const computedTo = computed(() => {
    if (typeof props.to === 'function') return props.to(props.prop);
    if (typeof props.to === 'string') return extractPropValue(props.to, props.prop);
    return {
        ...props.to,
        path: extractPropValue(props.to.path, props.prop),
    }
})

const doConfigClick = (e: Event) => {
    if (typeof props.events?.click === 'function') props.events.click(e);
}

const checkIfActiveRoute = () => {
    if (![AnchorType.RouterLink, AnchorType.Legacy].includes(typeValue.value)) return;
    let currentRoute = router?.currentRoute;
    if (currentRoute) {
        routeIsActive.value = currentRoute.value.path === computedTo.value;
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
        routeIsActiveParent.value = validParentPath(currentRoute.value.path, computedTo.value);
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

        if (computedTo.value) {
            if (routeIsActive.value) r.push('lkt-anchor-active');
            if (routeIsActiveParent.value) r.push('lkt-anchor-active-parent');
        }

        if (props.isActive && !r.includes('lkt-anchor-active')) r.push('lkt-anchor-active');

        return r.join(' ');
    }),
    computedHref = computed(() => {
        return getAnchorHref(props);
    });

const internalClickEvent = (e: Event) => {

    doConfigClick(e);

    if (AnchorType.RouterLinkBack === props.type) {
        e.preventDefault();
        router.back();
        return;
    }

    if (AnchorType.Action === props.type) {
        e.preventDefault();
        emit('click', e);
        return;
    }

    if (AnchorType.RouterLink === props.type) {
        if (typeof computedTo.value !== 'undefined') {
            e.preventDefault();
            router.push(computedTo.value);
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
        let href = computedTo.value;
        if (typeof href === 'object') href = String(href.path);
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
    }),
    computedTarget = computed(() => {
        if (AnchorType.Tab === props.type) return '_blank';
        return '';
    }),
    computedText = computed(() => {
        return extractI18nValue(props.text);
    });
</script>

<template>
    <a v-if="computedHasDownload"
       :class="classes"
       :href="computedHref"
       :target="computedTarget"
       :download="downloadFileName"
       @click="doClick">
        <lkt-icon v-if="typeof icon === 'string' && icon !== ''" v-bind="<IconConfig>{icon: icon}"/>
        <lkt-icon v-else-if="typeof icon === 'object' && Object.keys(icon).length > 0" v-bind="icon"/>

        <template v-if="slots.text">
            <slot
                name="text"
                :text="computedText"
                :href="computedHref"
            />
        </template>
        <template v-else-if="computedText">
            {{ computedText }}
        </template>

        <template v-if="slots.default">
            <slot/>
        </template>
    </a>
    <a v-else
       :class="classes"
       :href="computedHref"
       :target="computedTarget"
       @click="doClick">
        <lkt-icon v-if="typeof icon === 'string' && icon !== ''" v-bind="<IconConfig>{icon: icon}"/>
        <lkt-icon v-else-if="typeof icon === 'object' && Object.keys(icon).length > 0" v-bind="icon"/>

        <template v-if="slots.text">
            <slot
                name="text"
                :text="computedText"
                :href="computedHref"
            />
        </template>
        <span v-else-if="computedText" class="lkt-anchor--label">
            {{ computedText }}
        </span>

        <template v-if="slots.default">
            <slot/>
        </template>
    </a>
</template>