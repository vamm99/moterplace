'use client';

import Image from 'next/image';
import { useCartStore } from '@/lib/store/cart-store';
import { Button } from '@/components/ui/button';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotal, clearCart } = useCartStore();

  const handleUpdateQuantity = (productId: string, newQuantity: number, maxStock: number) => {
    if (newQuantity > maxStock) {
      toast.error(`Solo hay ${maxStock} ${maxStock === 1 ? 'unidad disponible' : 'unidades disponibles'} de este producto`);
      return;
    }
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId: string, productName: string) => {
    removeItem(productId);
    toast.success(`${productName} ha sido eliminado de tu carrito`);
  };

  const handleClearCart = () => {
    clearCart();
    toast.success('¡Tu carrito ha sido vaciado exitosamente!');
  };

  const subtotal = getTotal();
  const shipping = subtotal > 50000 ? 0 : 5000;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
              <ShoppingBag className="h-12 w-12 text-gray-400" />
            </div>
          </div>
          <h1 className="text-3xl font-bold">Tu carrito está vacío</h1>
          <p className="text-gray-600">
            Agrega productos para comenzar tu compra
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
        <h1 className="text-3xl font-bold">Carrito de Compras</h1>
        <Button variant="outline" onClick={handleClearCart}>
          <Trash2 className="mr-2 h-4 w-4" />
          Vaciar Carrito
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const finalPrice = item.product.discount > 0
              ? calculateDiscount(item.product.price, item.product.discount)
              : item.product.price;

            return (
              <div
                key={item.product._id}
                className="flex gap-4 p-4 bg-white rounded-lg border"
              >
                {/* Image */}
                <Link href={`/product/${item.product._id}`}>
                  <Image
                    src={item.product.image_url}
                    alt={item.product.name}
                    width={96}
                    height={96}
                    className="w-24 h-24 object-cover rounded"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/100';
                    }}
                  />
                </Link>

                {/* Info */}
                <div className="flex-1 space-y-2">
                  <Link href={`/product/${item.product._id}`}>
                    <h3 className="font-semibold text-black">
                      {item.product.name}
                    </h3>
                  </Link>
                  
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-black">
                      {formatPrice(finalPrice)}
                    </span>
                    {item.product.discount > 0 && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(item.product.price)}
                      </span>
                    )}
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border rounded-lg text-black">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          handleUpdateQuantity(
                            item.product._id,
                            item.quantity - 1,
                            item.product.stock
                          )
                        }
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="px-4 py-1 font-semibold">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          handleUpdateQuantity(
                            item.product._id,
                            item.quantity + 1,
                            item.product.stock
                          )
                        }
                        disabled={item.quantity >= item.product.stock}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveItem(item.product._id, item.product.name)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Eliminar
                    </Button>
                  </div>

                  {/* Stock Warning */}
                  {item.quantity >= item.product.stock && (
                    <p className="text-sm text-yellow-600">
                      Cantidad máxima disponible
                    </p>
                  )}
                </div>

                {/* Subtotal */}
                <div className="text-right">
                  <p className="text-lg font-bold text-black">
                    {formatPrice(finalPrice * item.quantity)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border p-6 space-y-4 sticky top-4">
            <h2 className="text-xl font-bold text-black">Resumen del Pedido</h2>

            <div className="space-y-2 border-t pt-4">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal ({items.length} {items.length === 1 ? 'producto' : 'productos'})</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Envío</span>
                <span>{shipping === 0 ? 'Gratis' : formatPrice(shipping)}</span>
              </div>
              {shipping === 0 && (
                <p className="text-sm text-green-600">
                  ¡Envío gratis en compras mayores a $50.000!
                </p>
              )}
            </div>

            <div className="flex justify-between text-xl font-bold border-t pt-4 text-black">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>

            <Link href="/checkout" className="block">
              <Button size="lg" className="w-full text-black border hover:bg-black hover:text-white">
                Proceder al Pago
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            <Link href="/products">
              <Button variant="outline" className="w-full text-black border hover:bg-black hover:text-white">
                Continuar Comprando
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
