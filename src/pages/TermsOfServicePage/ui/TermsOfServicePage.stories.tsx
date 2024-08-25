import type { Meta, StoryObj } from '@storybook/react';
import TermsOfServicePage from './TermsOfServicePage';

const meta = {
    title: 'pages/TermsOfServicePage',
    component: TermsOfServicePage,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
} satisfies Meta<typeof TermsOfServicePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
