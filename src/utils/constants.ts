export const NAV_ITEMS = [
    { label: 'Home', href: '/' },
    {
        label: 'Products',
        href: '/products',
        megaMenu: [
            {
                title: 'Core AI Agents',
                items: [
                    { name: 'Frosty AI Agent', href: '/products/frosty-ai', desc: 'Advanced conversational AI for customer service.', icon: 'Bot' },
                    { name: 'Voice AI Agent', href: '/products/voice-ai', desc: 'Human-like voice interactions for support and sales.', icon: 'Mic' },
                    { name: 'WhatsApp Agents', href: '/products/whatsapp-agents', desc: 'Automated WhatsApp business communication.', icon: 'MessageSquare' },
                ],
            },
            {
                title: 'Enterprise Tools',
                items: [
                    { name: 'LinkedIn Automation', href: '/products/linkedin-automation', desc: 'Scale your outreach with smart automation.', icon: 'Linkedin' },
                    { name: 'ERPNext AI Modules', href: '/products/erpnext-ai', desc: 'Intelligent add-ons for your ERP system.', icon: 'Database' },
                ],
            },
        ],
    },
    {
        label: 'Solutions',
        href: '/solutions',
        megaMenu: [
            {
                title: 'By Industry',
                items: [
                    { name: 'AI for Sales', href: '/solutions/sales', desc: 'Boost conversion rates with AI sales assistants.', icon: 'TrendingUp' },
                    { name: 'AI for Support', href: '/solutions/support', desc: '24/7 customer support automation.', icon: 'Headset' },
                    { name: 'AI for eCommerce', href: '/solutions/ecommerce', desc: 'Personalized shopping experiences.', icon: 'ShoppingCart' },
                    { name: 'AI for ERP', href: '/solutions/erp', desc: 'Streamline operations with intelligent ERP.', icon: 'Server' },
                ],
            },
        ],
    },
    { label: 'Services', href: '/services' },
    { label: 'Resources', href: '/resources' },
    { label: 'About', href: '/about' },
    { label: 'Experience', href: '/experience' },
];

export const COMPANY_INFO = {
    name: 'Frostrek',
    address: 'India',
    contact: 'contact@frostrek.com',
    socials: {
        linkedin: '#',
        twitter: '#',
        facebook: '#',
    }
};
