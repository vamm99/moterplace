'use client';

import { useWishlistStore } from '@/lib/store/wishlist-store';
import { useCartStore } from '@/lib/store/cart-store';
import { ProductCard } from '@/components/products/product-card';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function WishlistPage() {
  const { items, clearWishlist } = useWishlistStore();
  const addToCart = useCartStore((state) => state.addItem);

  const handleClearWishlist = () => {
    if (confirm('¿Estás seguro de vaciar la lista de deseos?')) {
      clearWishlist();
      toast.success('Lista de deseos vaciada');
    }
  };

  const handleAddAllToCart = () => {
    let added = 0;
    items.forEach((item) => {
      if (item.product.stock > 0) {
        addToCart(item.product, 1);
        added++;
      }
    });
    
    if (added > 0) {
      toast.success(`${added} ${added === 1 ? 'producto agregado' : 'productos agregados'} al carrito`);
    } else {
      toast.error('No hay productos disponibles en stock');
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
              <Heart className="h-12 w-12 text-gray-400" />
            </div>
          </div>
          <h1 className="text-3xl font-bold">Tu lista de deseos está vacía</h1>
          <p className="text-gray-600">
            Guarda tus productos favoritos para comprarlos más tarde
          </p>
          <Link href="/products">
            <Button size="lg">
              Explorar Productos
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Mi Lista de Deseos</h1>
          <p className="text-gray-600 mt-1">
            {items.length} {items.length === 1 ? 'producto guardado' : 'productos guardados'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleAddAllToCart}>
            <ShoppingBag className="mr-2 h-4 w-4" />
            Agregar Todos al Carrito
          </Button>
          <Button variant="outline" onClick={handleClearWishlist}>
            Vaciar Lista
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <ProductCard key={item.product._id} product={item.product} />
        ))}
      </div>
    </div>
  );
}
