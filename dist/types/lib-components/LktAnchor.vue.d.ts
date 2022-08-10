declare const _default: {
    name: string;
    emits: string[];
    props: {
        to: {
            type: (ObjectConstructor | StringConstructor)[];
            default: any;
        };
        vanilla: {
            type: BooleanConstructor;
            default: boolean;
        };
        state: {
            type: StringConstructor;
            default: string;
        };
        target: {
            type: StringConstructor;
            default: string;
        };
    };
    computed: {
        href(): any;
    };
    methods: {
        onClick(e: Event): void;
    };
};
export default _default;
