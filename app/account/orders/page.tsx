'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, ArrowLeft, Calendar, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { getUserOrdersAction, Order } from '@/app/actions/orders';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const result = await getUserOrdersAction();
      if (result.success && result.data) {
        setOrders(result.data);
      }
    } catch (error) {
      console.error('Error cargando pedidos:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { text: string; variant: string; color: string }> = {
      pending: { text: 'Pendiente', variant: 'secondary', color: 'bg-yellow-100 text-yellow-800' },
      completed: { text: 'Completado', variant: 'default', color: 'bg-green-100 text-green-800' },
      cancelled: { text: 'Cancelado', variant: 'destructive', color: 'bg-red-100 text-red-800' },
      processing: { text: 'En proceso', variant: 'default', color: 'bg-blue-100 text-blue-800' }
    };

    const statusInfo = statusMap[status.toLowerCase()] || { text: status, variant: 'secondary', color: 'bg-gray-100' };
    
    return (
      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
        {statusInfo.text}
      </span>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/account">
            <Button variant="ghost" size="icon" className="hover:bg-gray-100">
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mis Pedidos</h1>
            <p className="text-gray-600 mt-1">Historial de tus compras</p>
          </div>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-20 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : orders.length === 0 ? (
          <Card>
            <CardContent className="py-16">
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
                    <Package className="h-12 w-12 text-gray-400" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">No tienes pedidos aún</h2>
                <p className="text-gray-600">
                  Cuando realices una compra, aparecerá aquí
                </p>
                <Link href="/products">
                  <Button 
                    size="lg" 
                    className="mt-4 bg-black text-white hover:bg-gray-800 transition-colors"
                  >
                    Comenzar a Comprar
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order._id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Pedido #{order._id.slice(-8).toUpperCase()}
                        </h3>
                        {getStatusBadge(order.status)}
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(order.createdAt)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                      <DollarSign className="h-5 w-5" />
                      <span>{formatPrice(order.total)}</span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {order.products?.slice(0, 2).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4 py-3 border-b last:border-b-0">
                        <div className="relative w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                          {item.product_id?.image_url ? (
                            <Image
                              src={item.product_id.image_url}
                              alt={item.product_id.name}
                              width={64}
                              height={64}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-50">
                              <Package className="h-6 w-6 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 truncate">
                            {item.product_id?.name || 'Producto no disponible'}
                          </h4>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span>{item.quantity} × {formatPrice(item.price)}</span>
                            <span className="text-gray-400">•</span>
                            <span className="font-medium text-gray-900">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {order.products && order.products.length > 2 && (
                      <div className="text-sm text-gray-500 text-center">
                        +{order.products.length - 2} productos más
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}