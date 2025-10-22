import { getProductsAction } from '@/app/actions/products';
import { ProductCard } from '@/components/products/product-card';
import { TrendingUp, Star } from 'lucide-react';

export default async function BestsellersPage() {
  const result = await getProductsAction(1, 20);
  const products = result.success ? result.data?.data || [] : [];

  // Filtrar productos con descuento (simulando "más vendidos")
  const bestsellers = [...products]
    .filter(p => p.discount > 0 || p.stock < 50)
    .sort((a, b) => b.discount - a.discount);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 mb-4">
          <TrendingUp className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Productos Más Vendidos
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Los productos favoritos de nuestros clientes
        </p>
      </div>

      {/* Featured Badge */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full border-2 border-amber-300">
          <Star className="h-5 w-5 text-amber-600 fill-amber-600" />
          <span className="font-semibold text-amber-900">
            {bestsellers.length} Productos Destacados
          </span>
        </div>
      </div>

      {/* Products Grid */}
      {bestsellers.length === 0 ? (
        <div className="text-center py-16">
          <TrendingUp className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            No hay productos destacados
          </h2>
          <p className="text-gray-600">
            Vuelve pronto para ver nuestros más vendidos
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
