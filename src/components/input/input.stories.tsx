import React, { FC } from 'react';
import ABInput from '@ab-core/input';

export const Input: FC = () => (
    <div
        style={{
            width: '800px',
            padding: '40px',
            display: 'flex',
            background: '#F8F8F8',
            justifyContent: 'space-evenly'
        }}
    >
        <div style={{ width: '300px' }}>
            <ABInput label="Label" />
            <br />
            <ABInput label="Label" value="Value set" />
            <br />
            <ABInput label="Small" small />
            <br />
            <ABInput label="Disabled" disabled />
            <br />
            <ABInput label="Label" value="Disabled and value set" disabled />
            <br />
            <ABInput label="Max Length" maxLength={5} />
        </div>
        <div style={{ width: '300px' }}>
            <ABInput
                label="Error Message Placeholder"
                errormessage="Lorem ipsum dolor sit amet, consetetur sadipscing elitr sed diam"
            />
            <br />
            <ABInput
                label="Error Message Label"
                value="Lorem Ipsum"
                errormessage="Lorem ipsum dolor sit amet, consetetur sadipscing elitr sed diam"
            />
            <br />
            <ABInput
                label="Error Message and Max Length"
                value="Lorem Ipsum"
                maxLength={20}
                errormessage="Lorem ipsum dolor sit amet, consetetur sadipscing elitr."
            />
        </div>
    </div>
);
export default {
    title: 'Design System/Forms/Input',
    component: Input
};
