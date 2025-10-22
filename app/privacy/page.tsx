import { Shield, Lock, Eye, Database, UserCheck, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 mb-4">
          <Shield className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Política de Privacidad
        </h1>
        <p className="text-gray-600">
          Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Content */}
      <div className="space-y-8">
        {/* Introduction */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-indigo-600" />
              Introducción
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed">
              En MonterPlace, nos comprometemos a proteger tu privacidad y garantizar la seguridad de tu información personal. 
              Esta Política de Privacidad describe cómo recopilamos, usamos, compartimos y protegemos tu información cuando 
              utilizas nuestros servicios.
            </p>
          </CardContent>
        </Card>

        {/* Information Collection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-indigo-600" />
              Información que Recopilamos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Información Personal</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Nombre completo y apellidos</li>
                <li>Dirección de correo electrónico</li>
                <li>Número de teléfono</li>
                <li>Dirección de envío y facturación</li>
                <li>Información de pago (procesada de forma segura)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Información de Uso</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Historial de navegación en nuestro sitio</li>
                <li>Productos visualizados y comprados</li>
                <li>Preferencias de compra</li>
                <li>Interacciones con nuestro servicio al cliente</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* How We Use Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-indigo-600" />
              Cómo Usamos tu Información
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 mt-1">•</span>
                <span>Procesar y gestionar tus pedidos y pagos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 mt-1">•</span>
                <span>Comunicarnos contigo sobre tus pedidos y actualizaciones del servicio</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 mt-1">•</span>
                <span>Personalizar tu experiencia de compra</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 mt-1">•</span>
                <span>Mejorar nuestros productos y servicios</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 mt-1">•</span>
                <span>Enviarte ofertas y promociones (si has dado tu consentimiento)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 mt-1">•</span>
                <span>Prevenir fraudes y garantizar la seguridad</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Data Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-indigo-600" />
              Seguridad de tus Datos
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-700 leading-relaxed">
            <p className="mb-4">
              Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger tu información personal 
              contra acceso no autorizado, alteración, divulgación o destrucción.
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Encriptación SSL/TLS para todas las transmisiones de datos</li>
              <li>Servidores seguros y protegidos</li>
              <li>Acceso restringido a información personal</li>
              <li>Auditorías de seguridad regulares</li>
            </ul>
          </CardContent>
        </Card>

        {/* Your Rights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-indigo-600" />
              Tus Derechos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">Tienes derecho a:</p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 mt-1">✓</span>
                <span>Acceder a tu información personal</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 mt-1">✓</span>
                <span>Rectificar información inexacta</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 mt-1">✓</span>
                <span>Solicitar la eliminación de tus datos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 mt-1">✓</span>
                <span>Oponerte al procesamiento de tus datos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 mt-1">✓</span>
                <span>Solicitar la portabilidad de tus datos</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-indigo-600" />
              Contacto
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-700">
            <p className="mb-2">
              Si tienes preguntas sobre esta Política de Privacidad o deseas ejercer tus derechos, contáctanos:
            </p>
            <ul className="space-y-1">
              <li><strong>Email:</strong> privacidad@monterplace.com</li>
              <li><strong>Teléfono:</strong> +57 300 123 4567</li>
              <li><strong>Dirección:</strong> Montería, Córdoba, Colombia</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
