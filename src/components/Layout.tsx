import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutGrid, Users, ShoppingBag } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center px-2 py-2 text-gray-700 hover:text-gray-900">
                <LayoutGrid className="h-6 w-6 mr-2" />
                <span className="font-semibold">Micro Demo</span>
              </Link>
            </div>
            <div className="flex space-x-4">
              <Link to="/users" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                <Users className="h-5 w-5 mr-1" />
                <span>Users</span>
              </Link>
              <Link to="/products" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                <ShoppingBag className="h-5 w-5 mr-1" />
                <span>Products</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
}