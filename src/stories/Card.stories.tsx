import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Card from '../components/Card';
import data from './assets/data';

export default {
  title: 'Card',
  component: Card,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  /*
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  */
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const PL = Template.bind({});
PL.args = {
  edges: data,
  tab: 'pl',
};

export const BS = Template.bind({});
BS.args = {
  edges: data,
  tab: 'bs',
};

export const Revenue = Template.bind({});
Revenue.args = {
  edges: data,
  tab: 'revenue',
};

export const Expense = Template.bind({});
Expense.args = {
  edges: data,
  tab: 'expense',
};

export const Attd = Template.bind({});
Attd.args = {
  edges: data,
  tab: 'attd',
};
