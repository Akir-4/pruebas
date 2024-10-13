const orders = [
    { id: 1, producto: 'Camiseta Americana', cliente: 'Juan Pérez', estado: 'Enviado' },
    { id: 2, producto: 'Pantalones Vaqueros', cliente: 'Ana Gómez', estado: 'Procesando' },
    { id: 3, producto: 'Chaqueta de Cuero', cliente: 'Luis Martínez', estado: 'Entregado' },
  ];
  
  const OrderList = () => {
    return (
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-bold">Orden #{order.id}</h2>
            <p>Producto: {order.producto}</p>
            <p>Cliente: {order.cliente}</p>
            <p>Estado: {order.estado}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default OrderList;
  