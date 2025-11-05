import { AnchorConfig, AnchorType, IconConfig } from "lkt-vue-kernel";
declare var __VLS_9: {
    text: any;
    href: string;
}, __VLS_11: {}, __VLS_21: {
    text: any;
    href: string;
}, __VLS_23: {};
type __VLS_Slots = {} & {
    text?: (props: typeof __VLS_9) => any;
} & {
    default?: (props: typeof __VLS_11) => any;
} & {
    text?: (props: typeof __VLS_21) => any;
} & {
    default?: (props: typeof __VLS_23) => any;
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
    to: string | import("lkt-vue-kernel").RouteConfig | ((data: import("lkt-vue-kernel").LktObject) => import("lkt-vue-kernel").RouteConfig | string);
    icon: IconConfig | string;
    onClick: Function;
    isActive: boolean;
    prop: import("lkt-vue-kernel").LktObject;
    events: import("lkt-vue-kernel").AnchorEvents;
    downloadFileName: string;
    confirmModal: string | Function;
    confirmModalKey: string | number | Function;
    confirmData: import("lkt-vue-kernel").ModalConfig;
    imposter: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
