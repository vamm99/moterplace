'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { registerAction } from '@/app/actions/auth';
import { ShoppingCart, Mail, Lock, User, Phone, IdCard } from 'lucide-react';
import { toast } from 'sonner';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    idNumber: '',
    typeDocument: 'cc' as 'cc' | 'ce' | 'ti' | 'nit' | 'passport',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...registerData } = formData;
    const result = await registerAction(registerData);

    if (result.success) {
      toast.success('¡Cuenta creada exitosamente!');
      router.push('/');
      router.refresh();
    } else {
      toast.error(result.error || 'Error al crear la cuenta');
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <ShoppingCart className="h-10 w-10 text-blue-600" />
            <span className="text-3xl font-bold text-gray-900">
              Market<span className="text-blue-600">Place</span>
            </span>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Crear Cuenta</CardTitle>
            <CardDescription>
              Regístrate para comenzar a comprar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    <User className="inline h-4 w-4 mr-1" />
                    Nombre *
                  </label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Apellido *
                  </label>
                  <Input
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  <Mail className="inline h-4 w-4 mr-1" />
                  Email *
                </label>
                <Input
                  type="email"
                  required
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={loading}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  <Phone className="inline h-4 w-4 mr-1" />
                  Teléfono *
                </label>
                <Input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={loading}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    <IdCard className="inline h-4 w-4 mr-1" />
                    Tipo de Documento *
                  </label>
                  <select
                    required
                    value={formData.typeDocument}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        typeDocument: e.target.value as 'cc' | 'ce' | 'ti' | 'nit' | 'passport',
                      })
                    }
                    disabled={loading}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  >
                    <option value="cc">Cédula de Ciudadanía</option>
                    <option value="ce">Cédula de Extranjería</option>
                    <option value="ti">Tarjeta de Identidad</option>
                    <option value="nit">NIT</option>
                    <option value="passport">Pasaporte</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Número de Documento *
                  </label>
                  <Input
                    required
                    value={formData.idNumber}
                    onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    <Lock className="inline h-4 w-4 mr-1" />
                    Contraseña *
                  </label>
                  <Input
                    type="password"
                    required
                    placeholder="••••••••"
                    minLength={6}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Confirmar Contraseña *
                  </label>
                  <Input
                    type="password"
                    required
                    placeholder="••••••••"
                    minLength={6}
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({ ...formData, confirmPassword: e.target.value })
                    }
                    disabled={loading}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full text-black hover:bg-black hover:text-white" size="lg" disabled={loading}>
                {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                ¿Ya tienes una cuenta?{' '}
                <Link href="/login" className="text-blue-600 hover:underline font-semibold">
                  Inicia Sesión
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
