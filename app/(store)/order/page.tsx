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
  FormDescription,
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

// Typen definieren
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
  fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  city: z.string().min(2, { message: "City must be at least 2 characters." }),
  postalCode: z.string().min(5, { message: "Postal code must be at least 5 characters." }),
  country: z.string().min(2, { message: "Country must be at least 2 characters." }),
  additionalInfo: z.string().optional(),
})

export default function OrderForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 1️⃣ Access cart from CartContext
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
      const response = await fetch("https://barcoblanco-dev.vercel.app/backend/send-order", {
        //id for main branch is: emebvfa0s, dev: pv71d964g
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend error:", errorData);
        throw new Error("Failed to submit the order.");
      }

      const result = await response.json();
      console.log("Order response:", result);
      alert("Order submitted successfully! A confirmation email has been sent.");
      form.reset();
    } catch (error) {
      console.error("Error submitting the order:", error);
      alert("Failed to submit the order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  // 2️⃣ Calculate total price
  const totalPrice = getCartTotalPrice()

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Інформація про доставку</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Повне ім&apos;я</FormLabel>
                    <FormControl>
                      <Input placeholder="Іван Петренко" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Електронна пошта</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="ivan@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Телефон</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="+38 (097) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Адреса</FormLabel>
                    <FormControl>
                      <Input placeholder="вул. Шевченка, 10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Місто</FormLabel>
                    <FormControl>
                      <Input placeholder="Київ" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Поштовий індекс</FormLabel>
                    <FormControl>
                      <Input placeholder="01001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Країна</FormLabel>
                    <FormControl>
                      <Input placeholder="Україна" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="additionalInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Додаткова інформація</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Будь ласка, зазначте особливі побажання щодо доставки"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Необов&apos;язково: Ви можете залишити коментар щодо доставки.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Обробка..." : "Оформити замовлення"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* 3️⃣ Order Summary with Cart Items and Total */}
      <Card>
        <CardHeader>
          <CardTitle>Підсумок замовлення</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {/* List Cart Items */}
          {cart.length === 0 ? (
            <p>Ваш кошик порожній.</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-gray-50 p-2 rounded-md"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={item.image}
                    width={40}
                    height={40}
                    alt={item.name}
                    className="object-cover rounded"
                  />
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
          <p className="text-lg font-semibold">
            Всього: ${totalPrice.toFixed(2)}
          </p>
        </CardFooter>
      </Card>
    </div>
  );




}
