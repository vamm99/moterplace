'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '@/lib/types/product';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import { useCartStore } from '@/lib/store/cart-store';
import { useWishlistStore } from '@/lib/store/wishlist-store';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [mounted, setMounted] = useState(false);
  const addToCart = useCartStore((state) => state.addItem);
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
  const inWishlist = isInWishlist(product._id);

  useEffect(() => {
    setMounted(true);
  }, []);

  const finalPrice = product.discount > 0 
    ? calculateDiscount(product.price, product.discount)
    : product.price;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (product.stock === 0) {
      toast.error('Lo sentimos, este producto está agotado');
      return;
    }

    // Verificar cuántos ya hay en el carrito
    const cartItem = useCartStore.getState().getItem(product._id);
    const currentQuantityInCart = cartItem ? cartItem.quantity : 0;
    
    if (currentQuantityInCart >= product.stock) {
      toast.error(`Ya tienes la cantidad máxima disponible (${product.stock}) en tu carrito`);
      return;
    }

    addToCart(product, 1);
    toast.success('¡Producto agregado al carrito exitosamente!');
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (inWishlist) {
      removeFromWishlist(product._id);
      toast.success('Producto eliminado de tu lista de deseos');
    } else {
      addToWishlist(product);
      toast.success('¡Producto agregado a tu lista de deseos!');
    }
  };

  return (
    <Link href={`/product/${product._id}`}>
      <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:shadow-lg">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={product.image_url}
            alt={product.name}
            width={400}
            height={400}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/400?text=Sin+Imagen';
            }}
          />
          
          {/* Discount Badge */}
          {product.discount > 0 && (
            <Badge className="absolute top-2 left-2 bg-red-600 text-white">
              -{product.discount}%
            </Badge>
          )}

          {/* Stock Badge */}
          {product.stock === 0 && (
            <Badge className="absolute top-2 right-2 bg-gray-900 text-white">
              Agotado
            </Badge>
          )}
          {product.stock > 0 && product.stock < 10 && (
            <Badge className="absolute top-2 right-2 bg-yellow-600 text-white">
              ¡Últimas unidades!
            </Badge>
          )}

          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-2 right-2 bg-white/90 hover:bg-white ${
              mounted && inWishlist ? 'text-red-600' : 'text-gray-600'
            }`}
            onClick={handleToggleWishlist}
          >
            <Heart className={`h-5 w-5 ${mounted && inWishlist ? 'fill-current' : ''}`} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          {/* Title */}
          <h3 className="font-semibold text-lg text-gray-950 line-clamp-2 mb-2">
            {product.name}
          </h3>
          <p className="text-sm text-gray-700 line-clamp-2 mb-3">
            {product.description}
          </p>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-950">
              {formatPrice(finalPrice)}
            </span>
            {product.discount > 0 && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button
            className="w-full text-black hover:bg-black hover:text-white"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {product.stock === 0 ? 'Agotado' : 'Agregar al Carrito'}
          </Button>
        </div>
      </div>
    </Link>
  );
}
