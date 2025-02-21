import React from 'react';
import { Server, Users, ShoppingBag, Package, Bell, BarChart } from 'lucide-react';

export function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Microservices Demo</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Server className="h-8 w-8 text-blue-500" />
            <h2 className="text-xl font-semibold ml-2">API Gateway</h2>
          </div>
          <p className="text-gray-600">Running on port 3000</p>
          <p className="text-sm text-gray-500 mt-2">Handles routing and service discovery</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Users className="h-8 w-8 text-green-500" />
            <h2 className="text-xl font-semibold ml-2">User Service</h2>
          </div>
          <p className="text-gray-600">Running on port 3001</p>
          <p className="text-sm text-gray-500 mt-2">Manages user data and authentication</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <ShoppingBag className="h-8 w-8 text-purple-500" />
            <h2 className="text-xl font-semibold ml-2">Product Service</h2>
          </div>
          <p className="text-gray-600">Running on port 3002</p>
          <p className="text-sm text-gray-500 mt-2">Handles product catalog and inventory</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Package className="h-8 w-8 text-orange-500" />
            <h2 className="text-xl font-semibold ml-2">Inventory Service</h2>
          </div>
          <p className="text-gray-600">Running on port 3003</p>
          <p className="text-sm text-gray-500 mt-2">Manages product stock levels</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <BarChart className="h-8 w-8 text-indigo-500" />
            <h2 className="text-xl font-semibold ml-2">Order Service</h2>
          </div>
          <p className="text-gray-600">Running on port 3004</p>
          <p className="text-sm text-gray-500 mt-2">Processes and tracks orders</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Bell className="h-8 w-8 text-red-500" />
            <h2 className="text-xl font-semibold ml-2">Notification Service</h2>
          </div>
          <p className="text-gray-600">Running on port 3005</p>
          <p className="text-sm text-gray-500 mt-2">Handles user notifications</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-2xl font-semibold mb-4">Architecture Overview</h2>
        <p className="text-gray-600">
          This demo showcases a comprehensive microservices architecture with six main components:
        </p>
        <ul className="list-disc list-inside mt-4 space-y-2 text-gray-600">
          <li>An API Gateway that routes requests to appropriate services</li>
          <li>A User Service for managing user data</li>
          <li>A Product Service for handling product information</li>
          <li>An Inventory Service for managing stock levels</li>
          <li>An Order Service for processing customer orders</li>
          <li>A Notification Service for sending user notifications</li>
        </ul>
      </div>
    </div>
  );
}