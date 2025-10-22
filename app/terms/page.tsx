import { FileText, ShoppingCart, CreditCard, Package, AlertCircle, Scale } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 mb-4">
          <FileText className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Términos y Condiciones
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
              <Scale className="h-5 w-5 text-emerald-600" />
              Aceptación de los Términos
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-700 leading-relaxed">
            <p>
              Al acceder y utilizar MonterPlace, aceptas estar sujeto a estos Términos y Condiciones de Uso. 
              Si no estás de acuerdo con alguna parte de estos términos, no debes utilizar nuestro sitio web.
            </p>
          </CardContent>
        </Card>

        {/* Use of Service */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-emerald-600" />
              Uso del Servicio
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Elegibilidad</h3>
              <p className="text-gray-700">
                Debes tener al menos 18 años para realizar compras en MonterPlace. Al realizar un pedido, 
                declaras que tienes la capacidad legal para celebrar contratos vinculantes.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Cuenta de Usuario</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Eres responsable de mantener la confidencialidad de tu cuenta</li>
                <li>Debes proporcionar información precisa y actualizada</li>
                <li>No puedes transferir tu cuenta a otra persona</li>
                <li>Debes notificarnos inmediatamente sobre cualquier uso no autorizado</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Products and Pricing */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-emerald-600" />
              Productos y Precios
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Disponibilidad</h3>
              <p>
                Todos los productos están sujetos a disponibilidad. Nos reservamos el derecho de limitar las cantidades 
                de cualquier producto o servicio que ofrecemos.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Precios</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Los precios están expresados en pesos colombianos (COP)</li>
                <li>Los precios pueden cambiar sin previo aviso</li>
                <li>El precio aplicable es el vigente al momento de la compra</li>
                <li>Los precios incluyen IVA cuando aplique</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Payment */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-emerald-600" />
              Pago y Facturación
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Métodos de Pago</h3>
              <p>Aceptamos los siguientes métodos de pago:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Tarjetas de crédito y débito</li>
                <li>Bancolombia</li>
                <li>PayPal</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Procesamiento</h3>
              <p>
                Al realizar un pedido, autorizas a MonterPlace a cargar el monto total a tu método de pago seleccionado. 
                Todos los pagos se procesan de forma segura.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Shipping and Delivery */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-emerald-600" />
              Envío y Entrega
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Tiempos de Entrega</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Envío estándar: 3-5 días hábiles</li>
                <li>Envío express: 1-2 días hábiles</li>
                <li>Los tiempos pueden variar según la ubicación</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Costos de Envío</h3>
              <p>
                Envío gratis en compras superiores a $50.000 COP. Para compras menores, se aplicará un cargo de envío 
                de $5.000 COP.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Returns and Refunds */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-emerald-600" />
              Devoluciones y Reembolsos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Política de Devolución</h3>
              <p>
                Tienes 30 días desde la recepción del producto para solicitar una devolución. Los productos deben estar 
                en su estado original, sin usar y en su embalaje original.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Reembolsos</h3>
              <p>
                Una vez recibida y aprobada tu devolución, procesaremos el reembolso a tu método de pago original 
                en un plazo de 5-10 días hábiles.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Limitation of Liability */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-emerald-600" />
              Limitación de Responsabilidad
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-700 leading-relaxed">
            <p>
              MonterPlace no será responsable de daños indirectos, incidentales, especiales o consecuentes que resulten 
              del uso o la imposibilidad de usar nuestros servicios, incluso si hemos sido advertidos de la posibilidad 
              de tales daños.
            </p>
          </CardContent>
        </Card>

        {/* Changes to Terms */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-emerald-600" />
              Modificaciones
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-700 leading-relaxed">
            <p>
              Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor 
              inmediatamente después de su publicación en el sitio web. Tu uso continuado del servicio después de 
              cualquier cambio constituye tu aceptación de los nuevos términos.
            </p>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
          <CardHeader>
            <CardTitle>Contacto</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-700">
            <p className="mb-2">
              Si tienes preguntas sobre estos Términos y Condiciones, contáctanos:
            </p>
            <ul className="space-y-1">
              <li><strong>Email:</strong> legal@monterplace.com</li>
              <li><strong>Teléfono:</strong> +57 300 123 4567</li>
              <li><strong>Dirección:</strong> Montería, Córdoba, Colombia</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
