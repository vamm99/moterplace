import Link from 'next/link';
import { ShoppingCart, Facebook, Twitter, Instagram, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-950 to-indigo-950 text-gray-300 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
                <ShoppingCart className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">
                Monter<span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Place</span>
              </span>
            </div>
            <p className="text-sm text-gray-400">
              Tu tienda online de confianza. Encuentra los mejores productos al mejor precio.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-indigo-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-indigo-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-indigo-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-indigo-400 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-gray-100 font-semibold mb-4">Acerca de</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/categories" className="hover:text-indigo-400 transition-colors">
                  Todas las Categorías
                </Link>
              </li>
              <li>
                <Link href="/deals" className="hover:text-indigo-400 transition-colors">
                  Ofertas del Día
                </Link>
              </li>
              <li>
                <Link href="/new-arrivals" className="hover:text-indigo-400 transition-colors">
                  Nuevos Productos
                </Link>
              </li>
              <li>
                <Link href="/bestsellers" className="hover:text-indigo-400 transition-colors">
                  Más Vendidos
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-gray-100 font-semibold mb-4">Mi Cuenta</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/account" className="hover:text-indigo-400 transition-colors">
                  Mi Perfil
                </Link>
              </li>
              <li>
                <Link href="/account/orders" className="hover:text-indigo-400 transition-colors">
                  Mis Pedidos
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-indigo-400 transition-colors">
                  Lista de Deseos
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-indigo-400 transition-colors">
                  Carrito
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-gray-100 font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-indigo-400 transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-indigo-400 transition-colors">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-indigo-400 transition-colors">
                  Política de Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} MonterPlace. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
