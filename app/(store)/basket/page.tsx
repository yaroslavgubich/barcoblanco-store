"use client";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function BasketPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotalPrice } = useCart();
  const router = useRouter();

  const total = getCartTotalPrice();

  return (
    <div className="w-full max-w-[1400px] mx-auto py-10 px-4">
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center h-64">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Твій кошик пустий</h2>
          <p className="text-gray-600 mb-4">Додайте товари до кошика, щоб оформити замовлення.</p>
          <button
            onClick={() => router.push("/products")}
            className="px-6 py-3 bg-[#1996A3] text-white rounded-lg hover:bg-[#147A86] transition"
          >
            Перейти до каталогу
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-6 w-full">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row justify-between border border-[#1996A3] p-4 rounded-xl shadow-sm hover:shadow-md transition gap-4 bg-white"
              >
                {/* Верх: Картинка + Название + Цена */}
                <div className="flex items-center sm:w-1/3">
                  <Image
                    src={item.image}
                    width={80}
                    height={80}
                    alt={item.name}
                    className="object-cover rounded-md"
                  />
                  <div className="ml-4">
                    <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                    <p className="text-[#1996A3] font-medium">${item.price.toFixed(2)}</p>
                  </div>
                </div>

                {/* Низ: Кол-во и крестик */}
                <div className="flex flex-col sm:flex-row items-center sm:justify-between justify-start flex-1 gap-3 sm:gap-6 w-full">
                  {/* Кол-во */}
                  <div className="flex items-center gap-3 self-start sm:self-center">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                      className="px-3 py-1 bg-[#1996A3] text-white rounded hover:bg-[#147A86] text-lg"
                    >
                      −
                    </button>
                    <span className="font-semibold text-lg">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 bg-[#1996A3] text-white rounded hover:bg-[#147A86] text-lg"
                    >
                      +
                    </button>
                  </div>

                  {/* Кнопка удаления */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-[#1996A3] text-2xl font-bold hover:text-[#147A86] transition self-end sm:self-center"
                    title="Видалити товар"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Сумма + Кнопки */}
          <div className="mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Общая сумма */}
            <p className="text-xl font-semibold text-gray-800">
              Загальна сума: <span className="text-[#1996A3]">${total.toFixed(2)}</span>
            </p>

            {/* Кнопки */}
            <div className="flex gap-3 justify-end flex-wrap">
              <button
                onClick={clearCart}
                className="px-5 py-2 border border-[#1996A3] text-[#1996A3] rounded-lg hover:bg-[#1996A3] hover:text-white transition"
              >
                Очистити кошик
              </button>
              <button
                onClick={() => router.push("/order")}
                className="px-6 py-3 bg-[#1996A3] text-white rounded-lg hover:bg-[#147A86] transition font-semibold shadow-sm"
              >
                Продовжити замовлення
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}







