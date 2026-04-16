"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "@/features/cart/cartSlice";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { mockProducts } from "@/lib/mockData";

export default function CartPage() {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (items && items.length > 0) {
      const itemsWithProducts = items.map((item) => ({
        ...item,
        product:
          item.product ||
          mockProducts.find((p) => p.id === item.productId) ||
          mockProducts[0],
      }));
      setCartItems(itemsWithProducts);
    }
    setLoading(false);
  }, [items]);

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateQty = (productId, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ productId, quantity }));
    }
  };

  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.product?.price || 49.99;
    return sum + price * item.quantity;
  }, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <ShoppingBag className="w-16 h-16 text-slate-300 mb-4" />
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Your cart is empty
        </h1>
        <p className="text-slate-500 mb-6">Add some products to get started</p>
        <Link
          href="/products"
          className="bg-slate-900 text-white px-6 py-3 rounded-xl hover:bg-slate-800"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.productId || item._id}
                className="bg-white rounded-xl p-4 flex gap-4"
              >
                <div className="w-24 h-24 bg-slate-100 rounded-lg overflow-hidden">
                  <Image
                    src={
                      item.product?.images?.[0] ||
                      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200"
                    }
                    alt={item.product?.name}
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">
                    {item.product?.name}
                  </h3>
                  <p className="text-primary-600 font-bold">
                    ${(item.product?.price || 49.99).toFixed(2)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() =>
                        handleUpdateQty(item.productId, item.quantity - 1)
                      }
                      className="p-1 border rounded"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-3">{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleUpdateQty(item.productId, item.quantity + 1)
                      }
                      className="p-1 border rounded"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleRemove(item.productId)}
                      className="ml-auto text-red-500"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl p-6 h-fit">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span className="text-slate-600">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-slate-600">Shipping</span>
              <span>${subtotal > 50 ? "Free" : "$9.99"}</span>
            </div>
            <div className="border-t pt-4 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <Link
              href="/checkout"
              className="mt-6 w-full bg-slate-900 text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-800"
            >
              Checkout <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
