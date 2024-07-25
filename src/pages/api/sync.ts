import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

interface Order {
  id: string;
  orderDate: string;
  customerName: string;
  attributedStaffName: string;
  total: number;
  commission: number;
}

let orders: Order[] = [];

const fetchOrdersFromShopify = async () => {
  try {
    const response = await axios.get('https://mock-api.com/orders');
    orders = response.data.map((order: any) => ({
      ...order,
      commission: calculateCommission(order),
    }));
  } catch (error) {
    console.error('Error fetching orders from Shopify:', error);
  }
};

const calculateCommission = (order: any): number => {
  const orderDate = new Date(order.orderDate);
  const total = order.total;

  if (orderDate.getDay() === 5 || orderDate.getDay() === 6) {
    const productCount = order.products.length;
    const commission = productCount * 10;
    return commission > 50 ? total * 0.03 : commission;
  }

  if (orderDate.getHours() >= 20) {
    const firstHundred = Math.min(total, 100) * 0.03;
    const remaining = Math.max(total - 100, 0) * 0.05;
    return firstHundred + remaining;
  }

  return total * 0.03;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await fetchOrdersFromShopify();
    res.status(200).send('Data synced successfully');
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}