'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/lib/types/product';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Heart, Minus, Plus, Package, Truck, Shield } from 'lucide-react';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import { useCartStore } from '@/lib/store/cart-store';
import { useWishlistStore } from '@/lib/store/wishlist-store';
import { ProductReviews } from '@/components/products/product-reviews';
import { toast } from 'sonner';
import Link from 'next/link';

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
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

  const handleAddToCart = () => {
    if (product.stock === 0) {
      toast.error('Lo sentimos, este producto está agotado');
      return;
    }

    if (quantity > product.stock) {
      toast.error(`Solo hay ${product.stock} ${product.stock === 1 ? 'unidad disponible' : 'unidades disponibles'}`);
      return;
    }

    addToCart(product, quantity);
    toast.success(`¡${quantity} ${quantity === 1 ? 'producto agregado' : 'productos agregados'} al carrito exitosamente!`);
  };

  const handleToggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product._id);
      toast.success('Producto eliminado de tu lista de deseos');
    } else {
      addToWishlist(product);
      toast.success('¡Producto agregado a tu lista de deseos!');
    }
  };

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const categoryName = typeof product.category_id === 'object' 
    ? product.category_id.name 
    : 'Sin categoría';

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-white">
        <Link href="/" className="hover:text-blue-600">Inicio</Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-blue-600">Productos</Link>
        <span className="mx-2">/</span>
        <span className="text-white">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border bg-gray-100">
            <img
              src={product.image_url}
              alt={product.name}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/600?text=Sin+Imagen';
              }}
            />
            {product.discount > 0 && (
              <Badge className="absolute top-4 left-4 bg-red-600 text-white text-lg px-4 py-2">
                -{product.discount}% OFF
              </Badge>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Category */}
          <div>
            <Badge variant="secondary">{categoryName}</Badge>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-white">{product.name}</h1>

          {/* Price */}
          <div className="space-y-2">
            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-bold text-white">
                {formatPrice(finalPrice)}
              </span>
              {product.discount > 0 && (
                <span className="text-2xl text-gray-500 line-through">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
            {product.discount > 0 && (
              <p className="text-green-600 font-semibold">
                Ahorras {formatPrice(product.price - finalPrice)}
              </p>
            )}
          </div>

          {/* Stock Status */}
          <div>
            {product.stock === 0 ? (
              <Badge variant="destructive" className="text-base px-4 py-2">
                Agotado
              </Badge>
            ) : product.stock < 10 ? (
              <Badge className="bg-yellow-600 text-white text-base px-4 py-2">
                ¡Solo quedan {product.stock} unidades!
              </Badge>
            ) : (
              <Badge className="bg-green-600 text-white text-base px-4 py-2">
                En Stock ({product.stock} disponibles)
              </Badge>
            )}
          </div>

          {/* Description */}
          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-3">Descripción</h2>
            <p className="text-white leading-relaxed">{product.description}</p>
          </div>

          {/* Quantity Selector */}
          {product.stock > 0 && (
            <div className="border-t pt-6">
              <label className="text-sm font-medium mb-2 block">Cantidad</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-6 py-2 font-semibold">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={incrementQuantity}
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-sm text-white">
                  {product.stock} disponibles
                </span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 border-t pt-6">
            <Button
              size="lg"
              className="flex-1"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {product.stock === 0 ? 'Agotado' : 'Agregar al Carrito'}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleToggleWishlist}
              className={mounted && inWishlist ? 'text-red-600 border-red-600' : ''}
            >
              <Heart className={`h-5 w-5 ${mounted && inWishlist ? 'fill-current' : ''}`} />
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t pt-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600">
                <Truck className="h-6 w-6" />
              </div>
              <div>
                <p className="font-semibold text-sm">Envío Gratis</p>
                <p className="text-xs text-gray-600">En compras +$50.000</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <p className="font-semibold text-sm">Compra Segura</p>
                <p className="text-xs text-gray-600">Pago protegido</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 text-orange-600">
                <Package className="h-6 w-6" />
              </div>
              <div>
                <p className="font-semibold text-sm">Devoluciones</p>
                <p className="text-xs text-gray-600">30 días gratis</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <ProductReviews productId={product._id} />
      </div>
    </div>
  );
}
