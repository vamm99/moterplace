import { Cookie, Settings, Eye, BarChart, Shield, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function CookiesPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-red-600 mb-4">
          <Cookie className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Política de Cookies
        </h1>
        <p className="text-gray-600">
          Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Content */}
      <div className="space-y-8">
        {/* What are Cookies */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5 text-orange-600" />
              ¿Qué son las Cookies?
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-700 leading-relaxed">
            <p className="mb-4">
              Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. 
              Se utilizan ampliamente para hacer que los sitios web funcionen de manera más eficiente y proporcionen 
              información a los propietarios del sitio.
            </p>
            <p>
              En MonterPlace, utilizamos cookies para mejorar tu experiencia de navegación, recordar tus preferencias 
              y analizar cómo utilizas nuestro sitio.
            </p>
          </CardContent>
        </Card>

        {/* Types of Cookies */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-orange-600" />
              Tipos de Cookies que Utilizamos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Essential Cookies */}
            <div className="border-l-4 border-orange-500 pl-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-orange-100 text-orange-800">Esenciales</Badge>
                <span className="text-sm text-gray-600">Siempre activas</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Cookies Esenciales</h3>
              <p className="text-gray-700 mb-2">
                Estas cookies son necesarias para el funcionamiento básico del sitio web y no se pueden desactivar.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Autenticación de usuario</li>
                <li>Seguridad del sitio</li>
                <li>Carrito de compras</li>
                <li>Preferencias de idioma</li>
              </ul>
            </div>

            {/* Functional Cookies */}
            <div className="border-l-4 border-blue-500 pl-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-blue-100 text-blue-800">Funcionales</Badge>
                <span className="text-sm text-gray-600">Opcionales</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Cookies Funcionales</h3>
              <p className="text-gray-700 mb-2">
                Estas cookies permiten que el sitio web recuerde las elecciones que haces para proporcionar 
                funcionalidad mejorada y personalización.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Recordar tus preferencias de visualización</li>
                <li>Guardar productos en tu lista de deseos</li>
                <li>Recordar información de inicio de sesión</li>
              </ul>
            </div>

            {/* Analytics Cookies */}
            <div className="border-l-4 border-green-500 pl-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-green-100 text-green-800">Analíticas</Badge>
                <span className="text-sm text-gray-600">Opcionales</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Cookies Analíticas</h3>
              <p className="text-gray-700 mb-2">
                Estas cookies nos ayudan a entender cómo los visitantes interactúan con el sitio web, 
                recopilando y reportando información de forma anónima.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Número de visitantes</li>
                <li>Páginas más visitadas</li>
                <li>Tiempo de permanencia en el sitio</li>
                <li>Fuentes de tráfico</li>
              </ul>
            </div>

            {/* Marketing Cookies */}
            <div className="border-l-4 border-purple-500 pl-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-purple-100 text-purple-800">Marketing</Badge>
                <span className="text-sm text-gray-600">Opcionales</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Cookies de Marketing</h3>
              <p className="text-gray-700 mb-2">
                Estas cookies se utilizan para rastrear a los visitantes en los sitios web con el fin de 
                mostrar anuncios relevantes y atractivos.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Personalización de anuncios</li>
                <li>Seguimiento de campañas publicitarias</li>
                <li>Remarketing</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Third Party Cookies */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-orange-600" />
              Cookies de Terceros
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-700 leading-relaxed">
            <p className="mb-4">
              Algunos de nuestros socios pueden establecer cookies en tu dispositivo cuando visitas MonterPlace. 
              Estas cookies de terceros incluyen:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-1">•</span>
                <div>
                  <strong>Google Analytics:</strong> Para análisis de tráfico y comportamiento del usuario
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-1">•</span>
                <div>
                  <strong>Procesadores de Pago:</strong> Para procesar transacciones de forma segura
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-1">•</span>
                <div>
                  <strong>Redes Sociales:</strong> Para compartir contenido en plataformas sociales
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Managing Cookies */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-orange-600" />
              Gestión de Cookies
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Control de Cookies</h3>
              <p className="mb-2">
                Puedes controlar y/o eliminar las cookies como desees. Puedes eliminar todas las cookies que ya 
                están en tu dispositivo y puedes configurar la mayoría de los navegadores para evitar que se coloquen.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Configuración del Navegador</h3>
              <p className="mb-2">La mayoría de los navegadores te permiten:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Ver qué cookies tienes y eliminarlas de forma individual</li>
                <li>Bloquear cookies de terceros</li>
                <li>Bloquear cookies de sitios específicos</li>
                <li>Bloquear todas las cookies</li>
                <li>Eliminar todas las cookies al cerrar el navegador</li>
              </ul>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-amber-900">
                <strong>Nota:</strong> Si eliminas o bloqueas las cookies, algunas funciones de MonterPlace 
                pueden no funcionar correctamente.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Updates */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-orange-600" />
              Actualizaciones de esta Política
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-700 leading-relaxed">
            <p>
              Podemos actualizar esta Política de Cookies de vez en cuando para reflejar cambios en las cookies 
              que utilizamos o por otras razones operativas, legales o regulatorias. Te recomendamos que revises 
              esta página periódicamente para estar informado sobre nuestro uso de cookies.
            </p>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-orange-600" />
              Más Información
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-700">
            <p className="mb-2">
              Si tienes preguntas sobre nuestra Política de Cookies, contáctanos:
            </p>
            <ul className="space-y-1">
              <li><strong>Email:</strong> cookies@monterplace.com</li>
              <li><strong>Teléfono:</strong> +57 300 123 4567</li>
              <li><strong>Dirección:</strong> Montería, Córdoba, Colombia</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
