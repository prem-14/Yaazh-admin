export const LOGO = '/assets/images/yaazhLogo.jpg'

export const BRAND_LOGO = '/assets/images/yaazhLogo.jpg'

export const SITE_NAME = 'Yaazh admin'

export const SIDE_PANEL = [
    {
        label: 'Dashboard',
        path: '/dashboard',
        type: 'single',
    },
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
        label: 'Reviews',
        path: '/reviews',
        type: 'single',
    },
    {
        label: 'User',
        path: 'users',
        type: 'multiple',
        subLinks: [
            {
                label: 'All ',
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
        label: 'Templates',
        path: 'template',
        type: 'multiple',
        subLinks: [
            {
                label: 'Email Template',
                path: '/template/email',
            },
            // {
            //     label: 'SMS Template',
            //     path: '/communications/sms',
            // },
        ],
    },
    {
        label: 'Employees',
        path: '/employees',
        type: 'single',
    },
    {
        label: 'Transactions',
        path: 'transaction',
        type: 'multiple',
        subLinks: [
            {
                label: 'Payment',
                path: '/transaction/payment',
            },
            {
                label: 'Refund',
                path: '/transaction/refund',
            },
        ],
    },
    {
        label: 'Invoice',
        path: 'invoice',
        type: 'multiple',
        subLinks: [
            {
                label: 'Unpaid',
                path: '/invoice/unpaid',
            },
            {
                label: 'Paid',
                path: '/invoice/paid',
            },
        ],
    },
    {
        label: 'Product Info',
        type: 'multiple',
        path: 'productInfo',
        subLinks: [
            {
                label: 'Coupons',
                path: '/productInfo/coupons',
            },
            {
                label: 'Ingredients',
                path: '/productInfo/ingredients',
            },
            {
                label: 'Badges',
                path: '/productInfo/badges',
            },
            {
                label: 'Faqs',
                path: '/productInfo/faqs',
            },
        ],
    },
    {
        label: 'Change Password',
        path: '/changePassword',
        type: 'single',
    },
]

export const ALL_PAGINATION = [
    {
        value: '20',
        show: '20 Results per page',
    },
    {
        value: '40',
        show: '40 Results per page',
    },
    {
        value: '60',
        show: '60 Results per page',
    },
]
