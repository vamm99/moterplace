import { getProductsAction } from '@/app/actions/products';
import { ProductCard } from '@/components/products/product-card';
import { Sparkles } from 'lucide-react';

export default async function NewArrivalsPage() {
  const result = await getProductsAction(1, 20);
  const products = result.success ? result.data?.data || [] : [];

  // Ordenar por fecha de creación (más recientes primero)
  const sortedProducts = [...products].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 mb-4">
          <Sparkles className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Nuevos Productos
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Descubre las últimas incorporaciones a nuestro catálogo
        </p>
      </div>

      {/* Products Grid */}
      {sortedProducts.length === 0 ? (
        <div className="text-center py-16">
          <Sparkles className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            No hay productos nuevos
          </h2>
          <p className="text-gray-600">
            Vuelve pronto para ver nuestras novedades
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
