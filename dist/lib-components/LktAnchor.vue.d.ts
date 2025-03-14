import { AnchorConfig, AnchorType } from "lkt-vue-kernel";
declare const slots: Readonly<{
    [name: string]: import("vue").Slot<any> | undefined;
}>;
declare const classes: import("vue").ComputedRef<string>, computedHref: import("vue").ComputedRef<string>;
declare const doClick: (e: Event) => false | void;
declare const computedHasDownload: import("vue").ComputedRef<boolean>, computedTarget: import("vue").ComputedRef<"" | "_blank">, computedText: import("vue").ComputedRef<any>;
declare const __VLS_ctx: InstanceType<__VLS_PickNotAny<typeof __VLS_self, new () => {}>>;
declare var __VLS_1: {}, __VLS_3: {};
type __VLS_Slots = __VLS_PrettifyGlobal<__VLS_OmitStringIndex<typeof __VLS_ctx.$slots> & {
    default?: (props: typeof __VLS_1) => any;
} & {
    default?: (props: typeof __VLS_3) => any;
}>;
declare const __VLS_self: import("vue").DefineComponent<AnchorConfig, {
    slots: typeof slots;
    classes: typeof classes;
    computedHref: typeof computedHref;
    doClick: typeof doClick;
    computedHasDownload: typeof computedHasDownload;
    computedTarget: typeof computedTarget;
    computedText: typeof computedText;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
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
    to: import("vue-router").RouteLocationRaw | string;
    onClick: Function;
    isActive: boolean;
    downloadFileName: string;
    confirmModal: string | Function;
    confirmModalKey: string | number | Function;
    confirmData: import("lkt-vue-kernel").ModalConfig;
    imposter: boolean;
    events: import("lkt-vue-kernel").EventsConfig;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
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
    to: import("vue-router").RouteLocationRaw | string;
    onClick: Function;
    isActive: boolean;
    downloadFileName: string;
    confirmModal: string | Function;
    confirmModalKey: string | number | Function;
    confirmData: import("lkt-vue-kernel").ModalConfig;
    imposter: boolean;
    events: import("lkt-vue-kernel").EventsConfig;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
