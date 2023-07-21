export const SITE_NAME = 'Yaazh admin'

export const SIDE_PANEL = [
  {
    label: 'Products',
    path: '/products',
    type: 'single',
  },
  {
    label: 'Categories',
    path: '/categories',
    type: 'single',
  },
  {
    label: 'Templates',
    path: 'templates',
    type: 'multiple',
    subLinks: [
      {
        label: 'Email',
        path: '/templates/email',
      },
      // {
      //     label: 'SMS',
      //     path: '/communications/sms',
      // },
    ],
  },
  {
    label: 'Admins',
    path: '/admins',
    type: 'single',
  },
  {
    label: 'Coupons',
    path: '/coupons',
    type: 'single',
  },
  {
    label: 'Ingredients',
    path: '/ingredients',
    type: 'single',
  },
  {
    label: 'Badges',
    path: '/badges',
    type: 'single',
  },
  {
    label: 'Faqs',
    path: '/faqs',
    type: 'single',
  },
  {
    label: 'Blogs',
    path: '/blogs',
    type: 'single',
  },
  {
    label: 'Settings',
    path: 'settings',
    type: 'multiple',
    subLinks: [
      {
        label: 'Banners',
        path: '/settings/banners',
      },
      {
        label: 'Static pages',
        path: '/settings/static_pages',
      },
      {
        label: 'General setting',
        path: '/settings/general_settings',
      },
    ],
  },
  {
    label: 'Discounts',
    path: '/discounts',
    type: 'single',
  },
  {
    label: 'Dashboard',
    path: '/dashboard',
    type: 'single',
  },
  {
    label: 'Reviews',
    path: '/reviews',
    type: 'single',
  },
  {
    label: 'Users',
    path: 'users',
    type: 'multiple',
    subLinks: [
      {
        label: 'All',
        path: '/users/all',
      },
      {
        label: 'Active',
        path: '/users/active',
      },
      {
        label: 'Unverified',
        path: '/users/unverified',
      },
      {
        label: 'Deactivated',
        path: '/users/deactivate',
      },
    ],
  },

  {
    label: 'Transactions',
    path: 'transactions',
    type: 'multiple',
    subLinks: [
      {
        label: 'Payment',
        path: '/transactions/payment',
      },
      {
        label: 'Refund',
        path: '/transactions/refund',
      },
    ],
  },
  {
    label: 'Invoices',
    path: 'invoices',
    type: 'multiple',
    subLinks: [
      {
        label: 'Unpaid',
        path: '/invoices/unpaid',
      },
      {
        label: 'Paid',
        path: '/invoices/paid',
      },
    ],
  },
  {
    label: 'Change Password',
    path: '/changePassword',
    type: 'single',
    exemptedRoute: true,
  },
]
