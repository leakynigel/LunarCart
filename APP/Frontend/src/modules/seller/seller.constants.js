/**
 * Mock data for Seller Dashboard
 * Contains all static data for the dashboard sections:
 * - Stats (sales, orders, visitors)
 * - Revenue trends
 * - Chart data for analytics
 * - Category breakdown
 * - Monthly target progress
 * - Recent orders
 * - Top customers
 * - Active users and Conversion rates
 * - Traffic sources
 */

export const MOCK_DATA = {
  // Section A: Metric Stats
  stats: {
    totalSales: 983410, // Ksh 983,410
    totalOrders: 58375,
    totalVisitors: 237782,
  },

  // Trend indicators for stats
  trends: {
    sales: {
      value: 3.34,
      direction: 'up', // 'up' or 'down'
    },
    orders: {
      value: 2.89,
      direction: 'down',
    },
    visitors: {
      value: 8.02,
      direction: 'up',
    },
  },

  // Section B: Revenue Analytics - Line Chart Data
  revenueData: [
    { date: 'Mon', revenue: 8000, orders: 4000 },
    { date: 'Tue', revenue: 9500, orders: 5000 },
    { date: 'Wed', revenue: 7000, orders: 3500 },
    { date: 'Thu', revenue: 11000, orders: 6000 },
    { date: 'Fri', revenue: 14521, orders: 8000 },
    { date: 'Sat', revenue: 12000, orders: 7000 },
    { date: 'Sun', revenue: 13500, orders: 7500 },
  ],

  // Section: Top Categories - Donut Chart Data
  categoryBreakdown: [
    { name: 'Electronics', value: 1190000, fill: '#FF6600' },
    { name: 'Fashion', value: 952000, fill: '#FFB84D' },
    { name: 'Home & Kitchen', value: 1258000, fill: '#FFC680' },
  ],
  categoryTotal: 3400000,

  // Section: Monthly Target Progress
  monthlyTarget: {
    current: 850000,
    goal: 1000000,
    percentage: 85,
  },

  // Section: Active Users
  activeUserData: [
    { time: '00:00', users: 400 },
    { time: '08:00', users: 900 },
    { time: '12:00', users: 1200 },
    { time: '16:00', users: 1500 },
    { time: '20:00', users: 1100 },
  ],

  // Section: Conversion Rate
  conversionData: [
    { date: 'Aug 13', rate: 2.1 },
    { date: 'Aug 15', rate: 2.3 },
    { date: 'Aug 17', rate: 2.8 },
    { date: 'Aug 19', rate: 3.4 },
  ],

  // Section: Traffic Sources
  trafficSources: [
    { name: 'Direct', value: 45 },
    { name: 'Social', value: 25 },
    { name: 'Search', value: 20 },
    { name: 'Referral', value: 10 },
  ],

  // Section D: Recent Orders Table
  recentOrders: [
    {
      id: '#8441573',
      product: 'Samsung Galaxy S24',
      customer: 'Peterson Jack',
      date: '2024-08-19',
      status: 'Shipped',
    },
    {
      id: '#8441572',
      product: 'iPhone 15 Pro Max',
      customer: 'Maria Rodriguez',
      date: '2024-08-19',
      status: 'Pending',
    },
    {
      id: '#8441571',
      product: 'AirPods Pro (2nd Gen)',
      customer: 'Ahmed Hassan',
      date: '2024-08-18',
      status: 'Shipped',
    },
    {
      id: '#8441570',
      product: 'iPad Pro 12.9"',
      customer: 'Sarah Chen',
      date: '2024-08-18',
      status: 'Canceled',
    },
    {
      id: '#8441569',
      product: 'Sony WH-1000XM5 Headphones',
      customer: 'James Wilson',
      date: '2024-08-17',
      status: 'Shipped',
    },
  ],

  // Section D (alt): Top Customers List
  topCustomers: [
    {
      id: 1,
      name: 'Peterson Jack',
      orderCount: 24,
      avatar: 'PJ',
      avatarBg: 'bg-blue-500',
    },
    {
      id: 2,
      name: 'Maria Rodriguez',
      orderCount: 19,
      avatar: 'MR',
      avatarBg: 'bg-purple-500',
    },
    {
      id: 3,
      name: 'Ahmed Hassan',
      orderCount: 31,
      avatar: 'AH',
      avatarBg: 'bg-green-500',
    },
    {
      id: 4,
      name: 'Sarah Chen',
      orderCount: 15,
      avatar: 'SC',
      avatarBg: 'bg-pink-500',
    },
    {
      id: 5,
      name: 'James Wilson',
      orderCount: 27,
      avatar: 'JW',
      avatarBg: 'bg-yellow-500',
    },
  ],
};

/**
 * Format value as Kenyan Shilling (KSH)
 * @param {number} value - The numeric value to format
 * @returns {string} Formatted string with KSH prefix
 * Example: formatKsh(983410) => "Ksh 983,410"
 */
export const formatKsh = (value) => {
  if (typeof value !== 'number') return 'Ksh 0';
  return 'Ksh ' + new Intl.NumberFormat('en-KE').format(value);
};

/**
 * Get trend color based on direction and value
 * @param {string} direction - 'up' or 'down'
 * @returns {object} Object with textColor and bgColor classes
 */
export const getTrendColor = (direction) => {
  if (direction === 'up') {
    return {
      textColor: 'text-green-600',
      bgColor: 'bg-green-100',
      icon: 'TrendingUp',
    };
  }
  return {
    textColor: 'text-red-600',
    bgColor: 'bg-red-100',
    icon: 'TrendingDown',
  };
};
