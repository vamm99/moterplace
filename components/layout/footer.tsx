import Link from 'next/link';
import { ShoppingCart, Facebook, Twitter, Instagram, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-8 w-8 text-primary-500" />
              <span className="text-2xl font-bold text-white">
                Monter<span className="text-primary-400">Place</span>
              </span>
            </div>
            <p className="text-sm text-gray-400">
              Tu tienda online de confianza. Encuentra los mejores productos al mejor precio.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-gray-100 font-semibold mb-4">Acerca de</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/categories" className="hover:text-primary-400 transition-colors">
                  Todas las Categorías
                </Link>
              </li>
              <li>
                <Link href="/deals" className="hover:text-primary-400 transition-colors">
                  Ofertas del Día
                </Link>
              </li>
              <li>
                <Link href="/new-arrivals" className="hover:text-primary-400 transition-colors">
                  Nuevos Productos
                </Link>
              </li>
              <li>
                <Link href="/bestsellers" className="hover:text-primary-400 transition-colors">
                  Más Vendidos
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-gray-100 font-semibold mb-4">Síguenos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/account" className="hover:text-primary-400 transition-colors">
                  Mi Perfil
                </Link>
              </li>
              <li>
                <Link href="/account/orders" className="hover:text-primary-400 transition-colors">
                  Mis Pedidos
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-primary-400 transition-colors">
                  Lista de Deseos
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-primary-400 transition-colors">
                  Carrito
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} MonterPlace. Todos los derechos reservados.</p>
          <div className="mt-2 space-x-4">
            <Link href="/privacy" className="hover:text-primary-400 transition-colors">
              Política de Privacidad
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-primary-400 transition-colors">
              Términos y Condiciones
            </Link>
            <span>•</span>
            <Link href="/cookies" className="hover:text-primary-400 transition-colors">
              Política de Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
