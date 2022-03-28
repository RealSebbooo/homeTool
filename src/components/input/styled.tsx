import Text, { TextProps } from '@ab-core/text';
import theme from '@ab-core/variables';
import styled from 'styled-components';
import { InputProps, LabelProps } from './index';

interface CounterInterface extends TextProps {
    disabled?: boolean;
}

export const InputContainer = styled.div`
    position: relative;
`;

export const Label = styled.label<LabelProps>`
    position: absolute;
    top: ${({ small }) => (small ? '9px' : '14px')};
    left: 14px;
    font-size: ${theme.fonts.body16Medium.fontSize};
    line-height: ${theme.fonts.body16Medium.lineHeight};
    letter-spacing: ${theme.fonts.body16Medium.letterSpacing};
    color: ${({ disabled, errormessage }) => (errormessage ? theme.red : disabled ? theme.gray6 : theme.gray4)};
    background: transparent;
    transition: all 0.1s ease-out;
    ${({ disabled }) => disabled && `user-select:none;`}
    pointer-events: none;
    &::before {
        content: '';
        position: absolute;
        left: 0px;
        top: 6px;
        height: 1px;
        width: 100%;
        background: ${theme.white};
    }
`;

export const StyledInput = styled.input<InputProps>`
    box-sizing: border-box;
    padding: ${({ small }) => (small ? '7px 14px' : '13px 14px')};
    border-radius: 2px;
    appearance: none;
    width: 100%;
    font-size: ${theme.fonts.body16Medium.fontSize};
    line-height: ${theme.fonts.body16Medium.lineHeight};
    letter-spacing: ${theme.fonts.body16Medium.letterSpacing};
    color: ${({ disabled, errormessage }) => (errormessage ? theme.red : disabled ? theme.gray6 : theme.gray4)};
    border: 1px solid
        ${({ disabled, errormessage }) => (errormessage ? theme.red : disabled ? theme.gray6 : theme.gray4)};
    background: ${theme.white};
    margin: 0;
    ${({ disabled }) => disabled && `cursor:not-allowed;`}
    &::placeholder {
        opacity: 0;
        user-select: none;
    }
    ${({ disabled, small, errormessage }) => `
        &:placeholder-shown{
            + ${Label} {
                top: ${small ? '8px' : '14px'};
                left: 14px;
                color: ${errormessage ? theme.red : disabled ? theme.gray6 : theme.gray};
            }
            border: 1px solid ${errormessage ? theme.red : disabled ? theme.gray6 : theme.gray3};
            color: ${theme.gray};
        }
        &:active,&:focus{
            ${!disabled && `color: ${theme.gray4}`};
            ${!disabled && `border: 1px solid ${theme.primary}`};
            + ${Label} {
                color: ${disabled ? theme.gray6 : theme.gray4};
            }
        }

        &:active,&:focus,&:not(:placeholder-shown) {
            + ${Label} {
                top: -6px;
                left: 12px;
                font-size: ${theme.fonts.info12Bold.fontSize};
                line-height: ${theme.fonts.info12Bold.lineHeight};
                padding: 0 3px;
            }
        }
        &:focus {
            outline: 0 none;
            border: 1px solid ${theme.primary};
        }
    `}
`;

export const Counter = styled(Text)<CounterInterface>`
    padding-top: 4px;
    padding-right: 13px;
    padding-left: 10px;
    font-size: 0.75rem;
    line-height: 0.75rem;
    display: flex;
    justify-self: end;
    color: ${({ disabled }) => (disabled ? theme.gray6 : theme.gray)};
`;

export const InputFooter = styled.div`
    display: flex;
    justify-content: flex-end;
`;

export const ErrorMessage = styled(Text)`
    width: 100%;
`;
