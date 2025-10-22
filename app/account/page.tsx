'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUserAction, logoutAction } from '@/app/actions/auth';
import { User } from '@/lib/types/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User as UserIcon, Mail, Phone, IdCard, LogOut, Package, Heart } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await getCurrentUserAction();
    
    if (result.success && result.data) {
      setUser(result.data);
    } else {
      router.push('/login');
    }
    
    setLoading(false);
  };

  const handleLogout = async () => {
    await logoutAction();
    toast.success('Sesión cerrada');
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p className="mt-2 text-gray-500">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Mi Cuenta</h1>
            <p className="text-gray-600 mt-1">Gestiona tu información y pedidos</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar Sesión
          </Button>
        </div>

        {/* User Info Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserIcon className="h-5 w-5" />
              Información Personal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Nombre Completo</p>
                <p className="font-semibold">{user.name} {user.lastName}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  Email
                </p>
                <p className="font-semibold">{user.email}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  Teléfono
                </p>
                <p className="font-semibold">{user.phone}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                  <IdCard className="h-4 w-4" />
                  Documento
                </p>
                <p className="font-semibold">{user.typeDocument.toUpperCase()} - {user.idNumber}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/account/orders">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600">
                    <Package className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold">Mis Pedidos</h3>
                  <p className="text-sm text-gray-600">Ver historial de compras</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/wishlist">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600">
                    <Heart className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold">Lista de Deseos</h3>
                  <p className="text-sm text-gray-600">Productos guardados</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/cart">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600">
                    <Package className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold">Mi Carrito</h3>
                  <p className="text-sm text-gray-600">Ver carrito de compras</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
