"use client"
import React, { useState, useCallback, useEffect } from 'react';
import { Page, Card, IndexTable, Filters, Button, TextField, DatePicker, Range, Text, useIndexResourceState } from '@shopify/polaris';
import axios from 'axios';

interface Order {
  id: string;
  orderDate: string;
  customerName: string;
  attributedStaffName: string;
  total: number;
  commission: number;
  [key: string]: unknown;
}

const OrdersCommissionsTable: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [customerFilter, setCustomerFilter] = useState('');
  const [staffFilter, setStaffFilter] = useState('');
  const [dateRangeFilter, setDateRangeFilter] = useState<Range | undefined>({
    start: new Date(),
    end: new Date(),
  });

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
    setLoading(false);
  };

  const syncOrders = async () => {
    setLoading(true);
    try {
      await axios.post('/api/sync');
      await fetchOrders();  
    } catch (error) {
      console.error('Error syncing orders:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCustomerChange = useCallback((value: string) => setCustomerFilter(value), []);
  const handleStaffChange = useCallback((value: string) => setStaffFilter(value), []);
  const handleDateRangeChange = useCallback((value: Range) => setDateRangeFilter(value), []);

  const resourceName = {
    singular: 'order',
    plural: 'orders',
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } = useIndexResourceState(orders);

  const filteredOrders = orders.filter(order => {
    order.customerName === customerFilter || order.attributedStaffName === staffFilter
    const matchesCustomer = customerFilter === '' || order.customerName.toLowerCase().includes(customerFilter.toLowerCase());
    const matchesStaff = staffFilter === '' || order.attributedStaffName.toLowerCase().includes(staffFilter.toLowerCase());
    const matchesDateRange =
      (!dateRangeFilter?.start || new Date(order.orderDate) >= new Date(dateRangeFilter.start)) &&
      (!dateRangeFilter?.end || new Date(order.orderDate) <= new Date(dateRangeFilter.end));
    return matchesCustomer && matchesStaff && matchesDateRange;
  });
  console.log('filteredOrders', filteredOrders, orders);

 
  const rowMarkup = orders.map(
    ({ id, orderDate, customerName, attributedStaffName, total, commission }, index) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            {id}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{new Date(orderDate).toLocaleString()}</IndexTable.Cell>
        <IndexTable.Cell>{customerName}</IndexTable.Cell>
        <IndexTable.Cell>{attributedStaffName}</IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric>
            {total.toFixed(2)}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric>
            {commission.toFixed(2)}
          </Text>
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <Page
        title="Orders and Commissions"
        primaryAction={<Button onClick={syncOrders}>Sync</Button>}
      >
        <Card>
          <Card>
            <Filters
              queryValue={customerFilter}
              filters={[
                {
                  key: 'customerFilter',
                  label: 'Customer',
                  filter: (
                    <TextField
                      label="Customer"
                      value={customerFilter}
                      onChange={handleCustomerChange}
                      autoComplete="off"
                    />
                  ),
                },
                {
                  key: 'staffFilter',
                  label: 'Attributed Staff',
                  filter: (
                    <TextField
                      label="Attributed Staff"
                      value={staffFilter}
                      onChange={handleStaffChange}
                      autoComplete="off"
                    />
                  ),
                },
                {
                  key: 'dateRangeFilter',
                  label: 'Date Range',
                  filter: (
                    <DatePicker
                      month={new Date().getMonth()}
                      year={new Date().getFullYear()}
                      onChange={handleDateRangeChange}
                      selected={dateRangeFilter}
                    />
                  ),
                },
              ]}
              onQueryChange={setCustomerFilter}
              onQueryClear={() => setCustomerFilter('')}
              onClearAll={() => {
                setCustomerFilter('');
                setStaffFilter('');
                setDateRangeFilter({ start: new Date(), end: new Date() });
              }}
            />
          </Card>
          <Card>
            <div className="mt-6">
              <IndexTable
                resourceName={resourceName}
                itemCount={orders.length}
                selectedItemsCount={
                  allResourcesSelected ? 'All' : selectedResources.length
                }
                onSelectionChange={handleSelectionChange}
                loading={loading}
                headings={[
                  { title: 'Order ID' },
                  { title: 'Order Date' },
                  { title: 'Customer' },
                  { title: 'Attributed Staff' },
                  { title: 'Total', alignment: 'end' },
                  { title: 'Commission', alignment: 'end' },
                ]}
              >
                {rowMarkup}
              </IndexTable>
            </div>
          </Card>
        </Card>
      </Page>
    </div>
  );
};

export default OrdersCommissionsTable;