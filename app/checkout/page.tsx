'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCartStore } from '@/lib/store/cart-store';
import { getCurrentUserAction } from '@/app/actions/auth';
import { processCheckoutAction } from '@/app/actions/checkout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import { CreditCard, MapPin, User, Phone, Mail, Lock, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [step, setStep] = useState<'info' | 'payment' | 'success'>('info');
  const [orderNumber, setOrderNumber] = useState('');
  const [finalTotal, setFinalTotal] = useState(0);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    const result = await getCurrentUserAction();
    if (result.success && result.data) {
      setIsAuthenticated(true);
      setShippingInfo({
        fullName: `${result.data.name} ${result.data.lastName}`,
        email: result.data.email,
        phone: result.data.phone,
        address: '',
        city: '',
        zipCode: '',
      });
    } else {
      setIsAuthenticated(false);
    }
    setCheckingAuth(false);
  };

  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
  });

  const [paymentInfo, setPaymentInfo] = useState({
    method: 'bamcolombia' as 'bamcolombia' | 'paypal',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const subtotal = getTotal();
  const shipping = subtotal > 50000 ? 0 : 5000;
  const total = subtotal + shipping;

  if (checkingAuth) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <p className="mt-2 text-gray-500">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center space-y-6">
          <Lock className="h-16 w-16 mx-auto text-gray-400" />
          <h1 className="text-3xl font-bold">Inicia Sesión para Continuar</h1>
          <p className="text-gray-600">
            Debes iniciar sesión para proceder con el pago
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/login">
              <Button size="lg">Iniciar Sesión</Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline">Crear Cuenta</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0 && step !== 'success') {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center space-y-6">
          <h1 className="text-3xl font-bold">Tu carrito está vacío</h1>
          <p className="text-gray-600">
            Agrega productos para proceder con el pago
          </p>
          <Link href="/products">
            <Button size="lg">Explorar Productos</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Mapear productos del carrito con precio final (considerando descuento)
      const products = items.map((item) => {
        const finalPrice = item.product.discount > 0
          ? calculateDiscount(item.product.price, item.product.discount)
          : item.product.price;
        return {
          product_id: item.product._id,
          price: finalPrice,
          quantity: item.quantity,
        };
      });

      const result = await processCheckoutAction({
        shippingInfo,
        paymentInfo,
        products,
        total,
      });

      if (!result.success || !result.data) {
        throw new Error(result.error || 'No pudimos procesar tu compra. Por favor inténtalo nuevamente.');
      }

      // Backend retorna orderId y paymentId
      setOrderNumber(result.data.orderId);
      setFinalTotal(total); // Guardar el total antes de limpiar el carrito
      clearCart();
      setStep('success');
      toast.success('¡Tu pedido ha sido realizado exitosamente!');
    } catch (err: unknown) {
      console.error('Error al procesar el pago:', err);
      toast.error(err instanceof Error ? err.message : 'No pudimos procesar tu pago. Por favor verifica tu información e inténtalo nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  if (step === 'success') {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold">¡Pedido Confirmado!</h1>
          <p className="text-xl text-gray-600">
            Gracias por tu compra. Tu pedido ha sido procesado exitosamente.
          </p>
          
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Número de Orden</p>
                  <p className="text-2xl font-bold text-blue-600">{orderNumber}</p>
                </div>
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-600">Total Pagado</p>
                  <p className="text-3xl font-bold">{formatPrice(finalTotal)}</p>
                </div>
                <div className="border-t pt-4 text-left">
                  <p className="text-sm text-gray-600 mb-2">Información de Envío</p>
                  <p className="font-semibold">{shippingInfo.fullName}</p>
                  <p className="text-gray-600">{shippingInfo.email}</p>
                  <p className="text-gray-600">{shippingInfo.phone}</p>
                  <p className="text-gray-600 mt-2">{shippingInfo.address}</p>
                  <p className="text-gray-600">{shippingInfo.city}, {shippingInfo.zipCode}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <p className="text-gray-600">
            Recibirás un correo de confirmación con los detalles de tu pedido.
          </p>

          <div className="flex gap-4 justify-center">
            <Link href="/products">
              <Button size="lg">Seguir Comprando</Button>
            </Link>
            <Link href="/account/orders">
              <Button size="lg" variant="outline">Ver Mis Pedidos</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Finalizar Compra</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Forms */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Information */}
          {step === 'info' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Información de Envío
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleShippingSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        <User className="inline h-4 w-4 mr-1" />
                        Nombre Completo *
                      </label>
                      <Input
                        required
                        value={shippingInfo.fullName}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, fullName: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        <Mail className="inline h-4 w-4 mr-1" />
                        Email *
                      </label>
                      <Input
                        type="email"
                        required
                        value={shippingInfo.email}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, email: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      <Phone className="inline h-4 w-4 mr-1" />
                      Teléfono *
                    </label>
                    <Input
                      type="tel"
                      required
                      value={shippingInfo.phone}
                      onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, phone: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Dirección *
                    </label>
                    <Input
                      required
                      value={shippingInfo.address}
                      onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, address: e.target.value })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Ciudad *
                      </label>
                      <Input
                        required
                        value={shippingInfo.city}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, city: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Código Postal *
                      </label>
                      <Input
                        required
                        value={shippingInfo.zipCode}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, zipCode: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full text-black border hover:bg-black hover:text-white">
                    Continuar al Pago
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Payment Information */}
          {step === 'payment' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Información de Pago (Simulado)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-blue-800">
                    <Lock className="inline h-4 w-4 mr-1" />
                    Este es un proceso de pago simulado. No se procesará ningún cargo real.
                  </p>
                </div>

                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                  {/* Payment Method Selection */}
                  <div>
                    <label className="text-sm font-medium mb-3 block">
                      Método de Pago *
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setPaymentInfo({ ...paymentInfo, method: 'bamcolombia' })}
                        className={`p-4 border-2 rounded-lg transition-all ${
                          paymentInfo.method === 'bamcolombia'
                            ? 'border-primary-600 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-center">
                          <CreditCard className="h-8 w-8 mx-auto mb-2 text-primary-600" />
                          <p className="font-semibold">Bancolombia</p>
                          <p className="text-xs text-gray-600">Tarjeta de crédito/débito</p>
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentInfo({ ...paymentInfo, method: 'paypal' })}
                        className={`p-4 border-2 rounded-lg transition-all ${
                          paymentInfo.method === 'paypal'
                            ? 'border-primary-600 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-center">
                          <div className="h-8 w-8 mx-auto mb-2 bg-blue-600 rounded flex items-center justify-center">
                            <span className="text-white font-bold text-xs">PP</span>
                          </div>
                          <p className="font-semibold">PayPal</p>
                          <p className="text-xs text-gray-600">Pago seguro</p>
                        </div>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Número de Tarjeta *
                    </label>
                    <Input
                      required
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      value={paymentInfo.cardNumber}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\s/g, '');
                        const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
                        setPaymentInfo({ ...paymentInfo, cardNumber: formatted });
                      }}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Nombre en la Tarjeta *
                    </label>
                    <Input
                      required
                      value={paymentInfo.cardName}
                      onChange={(e) =>
                        setPaymentInfo({ ...paymentInfo, cardName: e.target.value })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Fecha de Expiración *
                      </label>
                      <Input
                        required
                        placeholder="MM/YY"
                        maxLength={5}
                        value={paymentInfo.expiryDate}
                        onChange={(e) => {
                          let value = e.target.value.replace(/\D/g, '');
                          if (value.length >= 2) {
                            value = value.slice(0, 2) + '/' + value.slice(2, 4);
                          }
                          setPaymentInfo({ ...paymentInfo, expiryDate: value });
                        }}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        CVV *
                      </label>
                      <Input
                        required
                        type="password"
                        placeholder="123"
                        maxLength={4}
                        value={paymentInfo.cvv}
                        onChange={(e) =>
                          setPaymentInfo({
                            ...paymentInfo,
                            cvv: e.target.value.replace(/\D/g, ''),
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep('info')}
                      className="flex-1"
                    >
                      Volver
                    </Button>
                    <Button type="submit" size="lg" className="flex-1 text-black border hover:bg-black hover:text-white" disabled={loading}>
                      {loading ? 'Procesando...' : `Pagar ${formatPrice(total)}`}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Resumen del Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Products */}
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {items.map((item) => {
                  const finalPrice = item.product.discount > 0
                    ? calculateDiscount(item.product.price, item.product.discount)
                    : item.product.price;

                  return (
                    <div key={item.product._id} className="flex gap-3">
                      <Image
                        src={item.product.image_url}
                        alt={item.product.name}
                        width={64}
                        height={64}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium line-clamp-2">
                          {item.product.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {item.quantity} x {formatPrice(finalPrice)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Totals */}
              <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Envío</span>
                  <span>{shipping === 0 ? 'Gratis' : formatPrice(shipping)}</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-bold border-t pt-4">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
