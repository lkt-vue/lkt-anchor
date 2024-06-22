import { RouteLocationRaw } from "vue-router";
import { LktObject } from "lkt-ts-interfaces";
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    to?: RouteLocationRaw | undefined;
    class?: string | undefined;
    target?: string | undefined;
    href?: string | undefined;
    route?: string | undefined;
    palette?: string | undefined;
    download?: boolean | undefined;
    downloadFileName?: string | undefined;
    isBack?: boolean | undefined;
    imposter?: boolean | undefined;
    isVanilla?: boolean | undefined;
    onClick?: Function | undefined;
    confirmModal?: string | undefined;
    confirmModalKey?: string | undefined;
    confirmData?: LktObject | undefined;
}>, {
    to: string;
    class: string;
    target: string;
    href: string;
    route: string;
    palette: string;
    download: boolean;
    downloadFileName: string;
    isBack: boolean;
    imposter: boolean;
    isVanilla: boolean;
    onClick: undefined;
    confirmModal: string;
    confirmModalKey: string;
    confirmData: () => {};
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    click: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    to?: RouteLocationRaw | undefined;
    class?: string | undefined;
    target?: string | undefined;
    href?: string | undefined;
    route?: string | undefined;
    palette?: string | undefined;
    download?: boolean | undefined;
    downloadFileName?: string | undefined;
    isBack?: boolean | undefined;
    imposter?: boolean | undefined;
    isVanilla?: boolean | undefined;
    onClick?: Function | undefined;
    confirmModal?: string | undefined;
    confirmModalKey?: string | undefined;
    confirmData?: LktObject | undefined;
}>, {
    to: string;
    class: string;
    target: string;
    href: string;
    route: string;
    palette: string;
    download: boolean;
    downloadFileName: string;
    isBack: boolean;
    imposter: boolean;
    isVanilla: boolean;
    onClick: undefined;
    confirmModal: string;
    confirmModalKey: string;
    confirmData: () => {};
}>>> & {
    onClick?: ((...args: any[]) => any) | undefined;
}, {
    target: string;
    class: string;
    onClick: Function;
    download: boolean;
    href: string;
    to: RouteLocationRaw;
    route: string;
    palette: string;
    downloadFileName: string;
    isBack: boolean;
    imposter: boolean;
    isVanilla: boolean;
    confirmModal: string;
    confirmModalKey: string;
    confirmData: LktObject;
}, {}>, {
    default?(_: {}): any;
}>;
export default _default;
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
type __VLS_WithDefaults<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_Prettify<P[K] & {
        default: D[K];
    }> : P[K];
};
type __VLS_Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
