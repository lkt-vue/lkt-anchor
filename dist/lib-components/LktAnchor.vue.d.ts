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
    to: string | import("lkt-vue-kernel").RouteConfig | ((data: import("lkt-vue-kernel").LktObject) => import("lkt-vue-kernel").RouteConfig | string);
    icon: import("lkt-vue-kernel").IconConfig | string;
    onClick: Function;
    isActive: boolean;
    prop: import("lkt-vue-kernel").LktObject;
    events: import("lkt-vue-kernel").EventsConfig;
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
