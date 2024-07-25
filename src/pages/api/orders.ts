import type { NextApiRequest, NextApiResponse } from 'next';

const orders = [
    {
      id: '1',
      orderDate: '2024-01-01T10:00:00Z',
      customerName: 'John Doe',
      attributedStaffName: 'Jane Smith',
      total: 100,
      commission: 10,
    },
    {
      id: '2',
      orderDate: '2024-01-02T12:30:00Z',
      customerName: 'Alice Johnson',
      attributedStaffName: 'Bob Brown',
      total: 150,
      commission: 15,
    },
    {
      id: '3',
      orderDate: '2024-01-03T15:45:00Z',
      customerName: 'Michael Smith',
      attributedStaffName: 'Sara Davis',
      total: 200,
      commission: 20,
    },
    {
      id: '4',
      orderDate: '2024-01-04T09:20:00Z',
      customerName: 'Laura Wilson',
      attributedStaffName: 'Chris Lee',
      total: 120,
      commission: 12,
    },
    {
      id: '5',
      orderDate: '2024-01-05T17:10:00Z',
      customerName: 'David Martinez',
      attributedStaffName: 'Emma Garcia',
      total: 180,
      commission: 18,
    },
    {
      id: '6',
      orderDate: '2024-01-06T08:50:00Z',
      customerName: 'Sophia Hernandez',
      attributedStaffName: 'Liam Clark',
      total: 160,
      commission: 16,
    },
    {
      id: '7',
      orderDate: '2024-01-07T11:35:00Z',
      customerName: 'James Rodriguez',
      attributedStaffName: 'Olivia Lewis',
      total: 140,
      commission: 14,
    },
    {
      id: '8',
      orderDate: '2024-01-08T14:25:00Z',
      customerName: 'Isabella Walker',
      attributedStaffName: 'Mason Hall',
      total: 190,
      commission: 19,
    },
    {
      id: '9',
      orderDate: '2024-01-09T16:55:00Z',
      customerName: 'Ethan Young',
      attributedStaffName: 'Ava Scott',
      total: 170,
      commission: 17,
    },
    {
      id: '10',
      orderDate: '2024-01-10T13:40:00Z',
      customerName: 'Mia King',
      attributedStaffName: 'Noah Adams',
      total: 130,
      commission: 13,
    },
  ];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(orders);
}