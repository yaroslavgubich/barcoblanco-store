"use client";

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useCart } from "@/context/CartContext"
import Image from "next/image"

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type OrderFormData = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  additionalInfo?: string;
  cart: CartItem[];
};

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Введіть правильне ім'я." }),
  email: z.string().email({ message: "Некоректна електронна пошта." }),
  phone: z.string().min(10, { message: "Введіть правильний номер телефону." }),
  address: z.string().min(5, { message: "Введіть правильну адресу." }),
  city: z.string().min(2, { message: "Введіть правильне місто." }),
  postalCode: z.string().min(5, { message: "Некоректний поштовий індекс." }),
  country: z.string().min(2, { message: "Введіть правильну країну." }),
  additionalInfo: z.string().optional(),
})

export default function OrderForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { cart, getCartTotalPrice } = useCart()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
      additionalInfo: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    const orderData: OrderFormData = {
      ...values,
      cart: cart.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
    };

    try {
      const response = await fetch("/api/send-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Помилка оформлення замовлення.");
      }

      alert("Замовлення успішно оформлене! Вам надіслано підтвердження на пошту.");
      form.reset();
    } catch {
      alert ("Не вдалося оформити замовлення. Спробуйте ще раз.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const totalPrice = getCartTotalPrice()

  return (
    <div className="grid gap-6 lg:grid-cols-2 py-16 text-lg max-w-7xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-[#1996A3] text-[30px] font-semibold">
            Інформація про доставку
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {["fullName", "email", "phone", "address", "city", "postalCode", "country"].map((fieldName) => (
                <FormField
                  key={fieldName}
                  control={form.control}
                  name={fieldName as keyof z.infer<typeof formSchema>}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">
                        {fieldName === "fullName" ? "Повне ім'я" :
                          fieldName === "email" ? "Електронна пошта" :
                          fieldName === "phone" ? "Телефон" :
                          fieldName === "address" ? "Адреса" :
                          fieldName === "city" ? "Місто" :
                          fieldName === "postalCode" ? "Поштовий індекс" :
                          "Країна"}
                      </FormLabel>
                      <FormControl>
                        <Input className="text-base p-3" placeholder={
                          fieldName === "fullName" ? "Іван Петренко" :
                            fieldName === "email" ? "ivan@example.com" :
                            fieldName === "phone" ? "+38 (097) 123-4567" :
                            fieldName === "address" ? "вул. Шевченка, 10" :
                            fieldName === "city" ? "Київ" :
                            fieldName === "postalCode" ? "01001" :
                            "Україна"
                        } {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <FormField
                control={form.control}
                name="additionalInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">
                      Додаткова інформація
                    </FormLabel>
                    <FormControl>
                      <Textarea className="text-base p-3" placeholder="Особливі побажання щодо доставки" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-[#1996A3] hover:bg-[#167A8A] text-white text-lg font-semibold py-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Обробка..." : "Оформити замовлення"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-[#1996A3] text-[30px] font-semibold">
            Підсумок замовлення
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {cart.length === 0 ? (
            <p>Ваш кошик порожній.</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-md text-base">
                <div className="flex items-center gap-4">
                  <Image src={item.image} width={40} height={40} alt={item.name} className="object-cover rounded" />
                  <p className="font-semibold">{item.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p>x{item.quantity}</p>
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))
          )}
        </CardContent>
        <CardFooter>
          <p className="text-xl font-semibold">Всього: ${totalPrice.toFixed(2)}</p>
        </CardFooter>
      </Card>
    </div>
  );
}


