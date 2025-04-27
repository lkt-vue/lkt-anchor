import { AnchorConfig, AnchorType } from "lkt-vue-kernel";
declare var __VLS_5: {
    text: any;
    href: string;
}, __VLS_7: {}, __VLS_13: {
    text: any;
    href: string;
}, __VLS_15: {};
type __VLS_Slots = {} & {
    text?: (props: typeof __VLS_5) => any;
} & {
    default?: (props: typeof __VLS_7) => any;
} & {
    text?: (props: typeof __VLS_13) => any;
} & {
    default?: (props: typeof __VLS_15) => any;
};
declare const __VLS_component: import("vue").DefineComponent<AnchorConfig, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    active: (...args: any[]) => void;
    click: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<AnchorConfig> & Readonly<{
    onActive?: ((...args: any[]) => any) | undefined;
    onClick?: ((...args: any[]) => any) | undefined;
}>, {
    type: AnchorType;
    text: string | number;
    disabled: boolean;
    external: boolean;
    class: string;
    to: string | import("vue-router").RouteLocationAsRelativeGeneric | import("vue-router").RouteLocationAsPathGeneric | ((data: import("lkt-vue-kernel").LktObject) => import("vue-router").RouteLocationRaw | string);
    icon: import("lkt-vue-kernel").IconConfig | string;
    onClick: Function;
    isActive: boolean;
    downloadFileName: string;
    confirmModal: string | Function;
    confirmModalKey: string | number | Function;
    confirmData: import("lkt-vue-kernel").ModalConfig;
    imposter: boolean;
    events: import("lkt-vue-kernel").EventsConfig;
    prop: import("lkt-vue-kernel").LktObject;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
