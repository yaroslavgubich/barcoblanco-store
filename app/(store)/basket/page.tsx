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
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
            Кошик{" "}
            <span className="text-[#1996A3] text-xl sm:text-2xl font-medium">
              {cart.length} товар{cart.length === 1 ? "" : cart.length < 5 ? "и" : "ів"}
            </span>
          </h1>

          {/* Заголовки таблицы для desktop */}
          <div className="hidden md:grid grid-cols-[1fr_150px_180px_150px_40px] gap-4 px-2 text-gray-500 font-semibold border-b pb-2 mb-4">
            <span>Найменування</span>
            <span className="text-right">Ціна</span>
            <span className="text-center">Кількість</span>
            <span className="text-right">Сума</span>
            <span></span>
          </div>

          <div className="space-y-6 w-full">
            {cart.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-1 md:grid-cols-[1fr_150px_180px_150px_40px] items-center gap-4 border-b pb-4 min-h-[120px]"
              >
                {/* Название и картинка (без ссылки) */}
                <div className="flex items-start md:items-center gap-4">
                  <Image
                    src={item.image}
                    width={80}
                    height={80}
                    alt={item.name}
                    className="object-cover rounded-md"
                  />
                  <div>
                    <h2 className="text-base sm:text-lg font-medium text-[#1996A3]">
                      {item.name}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">шт.</p>

                    {/* Мобильная цена и сумма */}
                    <div className="mt-2 text-sm text-gray-700 md:hidden space-y-1">
                      <p>
                        <span className="text-gray-500">Ціна: </span>
                        <span className="text-[#1996A3] font-semibold">
                          {item.price.toLocaleString()} грн.
                        </span>
                      </p>
                      <p>
                        <span className="text-gray-500">Сума: </span>
                        <span className="font-bold text-gray-800">
                          {(item.price * item.quantity).toLocaleString()} грн.
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Цена (desktop) */}
                <div className="hidden md:block text-right text-[#1996A3] font-semibold text-lg">
                  {item.price.toLocaleString()} грн.
                </div>

                {/* Количество */}
                <div className="flex justify-center items-center gap-3">
                  <button
                    onClick={() =>
                      item.quantity === 1
                        ? removeFromCart(item.id)
                        : updateQuantity(item.id, item.quantity - 1)
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

                {/* Сумма (desktop) */}
                <div className="hidden md:block text-right text-lg font-bold text-gray-800">
                  {(item.price * item.quantity).toLocaleString()} грн.
                </div>

                {/* Кнопка удаления */}
                <div className="flex justify-end">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-[#147A86] transition text-2xl font-bold"
                    title="Видалити товар"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Итого + кнопки */}
          <div className="mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-xl font-semibold text-gray-800">
              Загальна сума:{" "}
              <span className="text-[#1996A3]">
                {total.toLocaleString()} грн.
              </span>
            </p>

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













