import ProductList from '../components/ProductList';

const ManageProducts = () => {
  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Gestionar Productos</h1>
      <ProductList />
    </div>
  );
};

export default ManageProducts;
