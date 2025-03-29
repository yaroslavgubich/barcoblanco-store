"use client";

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Select from "react-select";
import * as z from "zod"
import logo from "/public/icons/nova_poshta_2014_logo.svg(1).png";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import CreatableSelect from "react-select/creatable";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
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
import { Warehouse } from "lucide-react";


type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type OrderFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  additionalInfo?: string;
  addressCourier?: string;
  cart: CartItem[];
  warehouse: string;
  selectedToggle: string;
};

type Warehouse = {
  Number: string,
  Description: string
};

const apiKey = process.env.NOVA_POSHTA_API_KEY;

const cities = [
  "Київ", "Харків", "Одеса", "Львів", "Дніпро", "Слов'янськ", "Запоріжжя", "Вінниця",
  "Івано-Франківськ", "Луцьк"
].map(city => ({ value: city, label: city }));


const formSchema = z
  .object({
    firstName: z.string().min(2, { message: "Введіть правильне ім'я." }),
    lastName: z.string().min(2, { message: "Введіть правильне прізвище." }),
    email: z.string().email({ message: "Некоректна електронна пошта." }),
    phone: z.string().min(10, { message: "Введіть правильний номер телефону." }),
    address: z.string().min(5, { message: "Введіть правильну адресу." }),
    addressCourier: z.string().optional(),
    city: z.string().min(2, { message: "Виберіть або введіть місто." }).nullable(),
    warehouse: z.string().optional(),
    additionalInfo: z.string().optional(),
    selectedToggle: z.string().optional(),
  })
  .refine((data) => data.addressCourier || data.warehouse, {
    message: "Оберіть або введіть адресу доставки або відділення.",
    path: ["warehouse"], // Der Fehler erscheint bei diesem Feld
  });


export default function OrderForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedToggle, setSelectedToggle] = useState("Відділення");
  const { cart, getCartTotalPrice } = useCart();
  const [selectedCity, setSelectedCity] = useState<string>();
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [loadingWarehouses, setLoadingWarehouses] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      addressCourier: "",
      city: selectedCity || "",
      warehouse: "",
      additionalInfo: "",
      selectedToggle: "",
    },
  })

  async function fetchWarehouses(city: string) {
    setLoadingWarehouses(true);
    try {
      const response = await fetch("https://api.novaposhta.ua/v2.0/json/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey: apiKey,
          modelName: "Address",
          calledMethod: "getWarehouses",
          methodProperties: {
            CityName: city
          },
        }),
      });

      const data = await response.json();
      setWarehouses(data.data || []);
    } catch {
      setWarehouses([]);
    } finally {
      setLoadingWarehouses(false);
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    const orderData: OrderFormData = {
      ...values,
      city: selectedCity ?? "",
      warehouse: "",
      selectedToggle: selectedToggle,
      cart: cart?.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      })) || [],
    };

    try {
      const response = await fetch("/api/send_email", {
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
      alert("Не вдалося оформити замовлення. Спробуйте ще раз.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const totalPrice = getCartTotalPrice()

  return (
    <div className="grid gap-4 lg:grid-cols-2 py-16 text-lg max-w-7xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-[#1996A3] text-[30px]">
            Інформація про доставку
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#1996A3] text-[20px] font-semibold">
                    Контактні дані
                  </CardTitle>
                </CardHeader>
                <CardContent>

                  <FormField name="lastName" control={form.control} render={({ field }) => (
                    <FormItem>
                      <FormLabel>Прізвище</FormLabel>
                      <FormControl>
                        <Input placeholder="Петренко" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField name="firstName" control={form.control} render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ім&apos;я</FormLabel>
                      <FormControl>
                        <Input placeholder="Іван" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField name="email" control={form.control} render={({ field }) => (
                    <FormItem>
                      <FormLabel>Електронна пошта</FormLabel>
                      <FormControl>
                        <Input placeholder="ivan@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField name="phone" control={form.control} render={({ field }) => (
                    <FormItem>
                      <FormLabel>Телефон</FormLabel>
                      <FormControl>
                        <Input placeholder="+38 (097) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField name="address" control={form.control} render={({ field }) => (
                    <FormItem>
                      <FormLabel>Адреса</FormLabel>
                      <FormControl>
                        <Input placeholder="вул. Шевченка, 10" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-[#1996A3] text-[20px] font-semibold">
                    Доставка
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="nova-poshta" className="border-b-0">
                      <AccordionTrigger>
                        <div className="flex items-center gap-2">
                          <Image src={logo} alt="Nova Poshta" className="w-5 h-9" />
                          Нова Пошта
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 p-4 rounded-lg overflow-visible">
                          <ToggleGroup type="single" value={selectedToggle} onValueChange={(value) => {
                            setSelectedToggle(value);
                            setSelectedCity(""); 
                            form.setValue("city", ""); // Löscht den Wert im Formular
                            form.setValue("warehouse", ""); // Löscht das Warehouse-Feld
                          }}>
                            <ToggleGroupItem value="Відділення">🏢 Відділення</ToggleGroupItem>
                            <ToggleGroupItem value="Поштомат">📦 Поштомат</ToggleGroupItem>
                            <ToggleGroupItem value="courier">🚚 Кур&apos;єром</ToggleGroupItem>
                          </ToggleGroup>
                          <FormField name="city" render={() => (
                            <FormItem>
                              <FormLabel>Місто</FormLabel>
                              <FormControl>
                                <CreatableSelect
                                  options={cities}
                                  value={selectedCity ? { value: selectedCity, label: selectedCity } : null}
                                  styles={{
                                    // Stile für das Dropdown-Menü
                                    menu: (provided) => ({
                                      ...provided,
                                      zIndex: 9999, // Stelle sicher, dass das Menü über anderen Elementen liegt
                                      position: 'absolute', // Stelle sicher, dass das Menü korrekt positioniert wird
                                      top: '100%', // Positioniere das Menü direkt unter dem Input
                                    }),
                                    menuPortal: (base) => ({
                                      ...base,
                                      zIndex: 9999, // Damit das Dropdown-Menü über anderen Komponenten erscheint
                                    }),
                                  }}
                                  menuPortalTarget={document.body}
                                  onChange={(city) => {
                                    if (city) {
                                      setSelectedCity(city.value);
                                      form.setValue("city", city.value); // Fügt den Wert in das Formular ein!
                                      fetchWarehouses(city.value);
                                    }
                                  }}
                                  onCreateOption={(inputValue) => {
                                    setSelectedCity(inputValue);
                                    form.setValue("city", inputValue); // Jetzt wird der Wert übernommen
                                    fetchWarehouses(inputValue);
                                  }}
                                  formatCreateLabel={(inputValue) => `Обрати "${inputValue}"`}
                                  placeholder="Оберіть місто"
                                  isClearable
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                          {selectedToggle !== "courier" && (
                            <FormField name="warehouse" render={({ field }) => (
                              <FormItem>
                                <FormLabel>Відділення</FormLabel>
                                <FormControl>
                                  <Select
                                    {...field}
                                    onChange={(selectedOption) => field.onChange(selectedOption?.value)}
                                    value={warehouses.find(w => w.Description === field.value) ? { value: field.value, label: field.value } : null}
                                    options={warehouses.filter(w => w.Description.includes(selectedToggle)).map(w => ({ value: w.Description, label: w.Description }))}
                                    placeholder={loadingWarehouses ? "Завантаження..." : "Оберіть відділення"}
                                    isDisabled={!selectedCity || loadingWarehouses || selectedToggle === "courier"}
                                    noOptionsMessage={() => "Немає доступних відділень"}
                                    styles={{
                                      menu: (provided) => ({
                                        ...provided,
                                        zIndex: 9999,
                                        position: "absolute",
                                      }),
                                      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                                    }}
                                    menuPortalTarget={document.body}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                          )}
                          {selectedToggle == "courier" && (
                            <FormField name="addressCourier" control={form.control} render={({ field }) => (
                              <FormItem>
                                <FormLabel>Адреса доставки</FormLabel>
                                <FormControl>
                                  <Input placeholder="вул. Шевченка, 10" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-[#1996A3] text-[20px] font-semibold">
                    Оплата
                  </CardTitle>
                </CardHeader>
                <CardContent>

                </CardContent>
              </Card>


              <FormField name="additionalInfo" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Додаткова інформація</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Особливі побажання щодо доставки" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <Button type="submit" className="w-full bg-[#1996A3] hover:bg-[#167A8A] text-white text-lg font-semibold py-3" disabled={isSubmitting}>
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