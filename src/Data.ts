import { Department } from './types.ts';

export const departments: Department[] = [
  {
    id: 1,
    name: 'customer_service',
    subDepartments: [
      { id: 1, name: 'support' },
      { id: 2, name: 'customer_success' },
    ],
  },
  {
    id: 2,
    name: 'design',
    subDepartments: [
      { id: 3, name: 'graphic_design' },
      { id: 4, name: 'product_design' },
      { id: 5, name: 'web_design' },

    ],
  },
];
