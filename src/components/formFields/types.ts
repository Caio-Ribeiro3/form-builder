import { Configurator } from "../../features/formBuilder/components/types";
import { FieldT } from "../../types";

export type FieldModule<T, k> = {
    Component: (props: FieldT<T, k>) => JSX.Element;
    props: T;
    type: string;
    configurator: { [key in keyof T]: Configurator }
    answerable: boolean;
} 