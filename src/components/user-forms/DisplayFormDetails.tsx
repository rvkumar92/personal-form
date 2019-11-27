import * as React from 'react';


export interface IFieldProps {
    id: string;
    type?: string;
    label?: string;
    inputType?: InputType;
    options?: string[] | object[];
    value?: any;
    validation?: IValidation;
}

export const DisplayFormDetails: React.SFC = () => ();