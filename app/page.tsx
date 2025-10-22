import { getProductsAction, getCategoriesAction } from './actions/products';
import { ProductCard } from '@/components/products/product-card';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, Zap, Shield, Truck, Gift, Package } from 'lucide-react';
import Link from 'next/link';

export default async function Home() {
  const [productsResult, categoriesResult] = await Promise.all([
    getProductsAction(1, 8),
    getCategoriesAction(),
  ]);

  const products = productsResult.success ? productsResult.data?.data || [] : [];
  const categories = categoriesResult.success ? categoriesResult.data?.data || [] : [];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 via-primary-700 to-accent-600 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Bienvenido a MarketPlace
            </h1>
            <p className="text-xl text-gray-100 mb-8">
              Descubre miles de productos de calidad al mejor precio. 
              Compra fácil, rápido y seguro.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-4">
              <Truck className="h-6 w-6 text-primary-700" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Envío Rápido</h3>
            <p className="text-gray-600">
              Recibe tus productos en tiempo récord
            </p>
          </div>
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-4">
              <Shield className="h-6 w-6 text-primary-700" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Compra Segura</h3>
            <p className="text-gray-600">
              Tus datos protegidos en todo momento
            </p>
          </div>
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-100 text-accent-600 mb-4">
              <Gift className="h-6 w-6 text-primary-700" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Envío Gratis</h3>
            <p className="text-gray-600">
              En compras mayores a $50.000
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Categorías Populares</h2>
            <Link href="/categories">
              <Button variant="ghost">
                Ver todas
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.slice(0, 6).map((category) => (
              <Link
                key={category._id}
                href={`/category/${category._id}`}
                className="group p-6 rounded-lg border-2 border-gray-200 hover:border-primary-600 hover:shadow-lg transition-all text-center"
              >
                <p className="font-semibold text-sm text-gray-900">Envío Gratis</p>
                <h3 className="text-xl font-semibold mb-2 text-primary-600 transition-colors">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">ProductosDestacados</h2>
          <Link href="/products">
            <Button variant="ghost">
              Ver todos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xs text-gray-700">En compras mayores a $50.000</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4 text-black">
            ¿Listo para empezar a comprar?
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Únete a miles de clientes satisfechos y descubre la mejor experiencia de compra online
          </p>
          <Link href="/products">
            <Button size="lg" className="text-black hover:bg-black hover:text-white">
              Explorar Productos
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
