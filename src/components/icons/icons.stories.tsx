import React, { FC } from 'react';
import ABIcon, { IconSizes, Icons } from '@ab-core/icons';

export const Icon: FC = () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', width: '800px', padding: '40px' }}>
        {Object.keys(Icons)
            .sort((a, b) => (a > b ? 1 : -1))
            .map((elem, i) => (
                <div key={i} style={{ padding: '10px' }}>
                    <div style={{ display: 'flex' }}>
                        <div style={{ padding: '4px' }}>
                            <ABIcon name={elem} />
                        </div>
                        <div style={{ padding: '4px' }}>
                            <ABIcon name={elem} size={IconSizes.Small} />
                        </div>
                        <div style={{ padding: '4px' }}>
                            <ABIcon name={elem} size={IconSizes.Small} color="green" />
                        </div>
                    </div>
                    {elem}
                </div>
            ))}
    </div>
);

export default {
    title: 'Design System/Icon',
    component: Icons
};
