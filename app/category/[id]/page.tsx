'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Product } from '@/lib/types/product';
import { getProductsAction } from '@/app/actions/products';
import { ProductCard } from '@/components/products/product-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function CategoryPage() {
  const params = useParams();
  const categoryId = params?.id as string;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, page]);

  const loadProducts = async () => {
    setLoading(true);
    const result = await getProductsAction(page, 12, { category_id: categoryId });
    
    if (result.success && result.data) {
      setProducts(result.data.data || []);
      setTotalPages(result.data.meta?.totalPages || 1);
    }
    setLoading(false);
  };

  const categoryName = products.length > 0 && typeof products[0].category_id === 'object'
    ? products[0].category_id.name
    : 'Categoría';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/products">
          <Button variant="ghost" className="mb-4 hover:bg-black hover:text-white">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Productos
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">{categoryName}</h1>
        <p className="text-gray-600 mt-2">
          {loading ? 'Cargando...' : `${products.length} productos encontrados`}
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No hay productos en esta categoría</p>
          <Link href="/products">
            <Button className="mt-4">Ver Todos los Productos</Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              <Button
                variant="outline"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              >
                Anterior
              </Button>
              <span className="flex items-center px-4 text-sm">
                Página {page} de {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
              >
                Siguiente
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
