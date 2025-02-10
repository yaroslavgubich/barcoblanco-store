"use client";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function BasketPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const router = useRouter();

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Your Basket</h1>

      {cart.length === 0 ? (
        <p className="text-gray-700">Your basket is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center justify-between border p-4 rounded-lg gap-4"
              >
                {/* Product Image */}
                <div className="flex items-center sm:w-1/3">
                  <Image
                    src={item.image}
                    width={80}
                    height={80}
                    alt={item.name}
                    className="object-cover rounded-md"
                  />
                  <div className="ml-4">
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-gray-500">${item.price.toFixed(2)}</p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
                    className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    -
                  </button>
                  <span className="font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    +
                  </button>
                </div>

                {/* Remove Button (Cross) */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 text-xl font-bold hover:text-red-800"
                  title="Remove item"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* Proceed with Order Button */}
          <div className="mt-8 text-right">
            <button
              onClick={() => router.push("/order")}
              className="px-4 py-2 bg-[#1996a3] text-white rounded-lg hover:bg-[#147a86]"
            >
              Продовжити замовлення
            </button>
          </div>
        </>
      )}
    </div>
  );
}
