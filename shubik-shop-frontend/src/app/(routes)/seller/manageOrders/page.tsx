"use client";
import OrderList from '../components/OrderList';

const ManageOrders = () => {
  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Gestionar Órdenes</h1>
      <OrderList />
    </div>
  );
};

export default ManageOrders;
