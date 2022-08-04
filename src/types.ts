export interface Option {
    label: string;
    value: string;
}

export interface FieldT<T, K> {
    styleProps: {};
    formProps: {
        value: K;
        onChange: (value: K) => void;
        error?: string;
    };
    baseProps: T
}