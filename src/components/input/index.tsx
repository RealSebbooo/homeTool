import { FontTypes } from '@ab-core/text';
import React, { FC, useState } from 'react';
import { Counter, ErrorMessage, InputContainer, InputFooter, Label, StyledInput } from './styled';

export enum InputTypes {
    Text = 'text',
    Number = 'number',
    Password = 'password',
    Date = 'date',
    Tel = 'tel',
    File = 'file',
    Button = 'button',
    Email = 'email',
    Time = 'time'
}

export type InputProps = {
    name?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string | (readonly string[] & string);
    label?: string;
    className?: string;
    small?: boolean;
    disabled?: boolean;
    type?: InputTypes;
    dataId?: string;
    inputMode?: React.HTMLAttributes<HTMLLIElement>['inputMode'];
    maxLength?: number;
    errormessage?: string;
    required?: boolean;
};

export type LabelProps = {
    value?: string | null;
    disabled?: boolean;
    small?: boolean;
    errormessage?: string;
};

const Input: FC<InputProps> = ({
    inputMode = 'text',
    name,
    type,
    className,
    onChange,
    onBlur,
    value,
    label,
    small = false,
    disabled = false,
    dataId,
    maxLength,
    errormessage,
    required = false
}) => {
    const [uncontrolledValue, setUncontrolledValue] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (maxLength && e.currentTarget.value.length > maxLength) {
            return;
        }
        if (onChange) {
            onChange(e);
        } else {
            setUncontrolledValue(e.currentTarget.value);
        }
    };
    return (
        <InputContainer className={className}>
            <StyledInput
                type={type || InputTypes.Text}
                placeholder={label}
                name={name}
                value={value}
                onChange={handleChange}
                onBlur={onBlur}
                small={small}
                disabled={disabled}
                data-id={dataId}
                inputMode={inputMode}
                maxLength={maxLength}
                errormessage={errormessage}
                required={required}
            />
            <Label disabled={disabled} small={small} errormessage={errormessage}>
                <span style={{ position: 'relative' }}>{label}</span>
            </Label>
            <InputFooter>
                {errormessage && <ErrorMessage type={FontTypes.Info12Bold} color="red" content={errormessage} />}
                {maxLength && (
                    <Counter type={FontTypes.Info12Bold} disabled={disabled} className="counter">
                        {onChange ? value?.length : uncontrolledValue.length}/{maxLength}
                    </Counter>
                )}
            </InputFooter>
        </InputContainer>
    );
};
export default Input;
