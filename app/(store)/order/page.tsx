"use client";

import { SetStateAction, useState } from "react"
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
import { RadioGroup } from '@headlessui/react';
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
  payment?: string;
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
    paymentMethods: z.string().optional(),
  })
  .refine((data) => data.addressCourier || data.warehouse, {
    message: "Оберіть або введіть адресу доставки або відділення.",
    path: ["warehouse"], // Der Fehler erscheint bei diesem Feld
  });

  const paymentMethods = [
    { id: 'by_agreement', label: 'По домовленості' }
  ];


export default function OrderForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedToggle, setSelectedToggle] = useState("Відділення");
  const { cart, getCartTotalPrice } = useCart();
  const [selectedCity, setSelectedCity] = useState<string>();
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [loadingWarehouses, setLoadingWarehouses] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<string>("");

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
      paymentMethods: ""
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
      warehouse: values.warehouse ?? "",
      selectedToggle: selectedToggle,
      cart: cart?.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      })) || []
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


      setOpen(true);
      form.reset();
    } catch {
      alert("Не вдалося оформити замовлення. Спробуйте ще раз.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const totalPrice = getCartTotalPrice()

  const handleSelectPayment = (value: string) => {
    // Wenn das Feld schon ausgewählt ist → wieder abwählen
    if (selectedPayment === value) {
      setSelectedPayment("");
    } else {
      setSelectedPayment(value);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 py-12 text-lg max-w-7xl mx-auto mt-0 p-3">
          <Card className="border-none shadow-none outline-none ring-0 p-0 gap-0">
            <CardContent>
              <Card className="shadow-md p-4 m-2 w-full">
                <CardHeader>
                  <CardTitle className="text-[#1996A3] text-[25px] font-semibold">
                    Контактні дані
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">

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
                  <FormField name="additionalInfo" control={form.control} render={({ field }) => (
                    <FormItem>
                      <FormLabel>Додаткова інформація</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Особливі побажання щодо доставки" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </CardContent>
              </Card>

              <Card className="shadow-md p-4 m-2 w-full max-w-full">
                <CardHeader>
                  <CardTitle className="text-[#1996A3] text-[20px] md:text-[25px] font-semibold">
                    Доставка
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="nova-poshta" className="border-b-0 p-3 py-3 rounded-lg w-full">
                      <AccordionTrigger>
                        <div className="flex items-center gap-3 w-full">
                          <Image src={logo} alt="Nova Poshta" className="w-6 h-auto" />
                          Нова Пошта
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="w-full max-w-full overflow-x-hidden">
                        <div className="space-y-4 p-4 rounded-lg">
                          <ToggleGroup
                            type="single"
                            value={selectedToggle}
                            onValueChange={(value) => {
                              setSelectedToggle(value);
                              setSelectedCity("");
                              form.setValue("city", "");
                              form.setValue("warehouse", "");
                            }}
                            className="flex flex-wrap gap-2"
                          >
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
                                  styles={{ menu: (provided) => ({ ...provided, zIndex: 9999 }) }}
                                  menuPortalTarget={document.body}
                                  onChange={(city) => {
                                    if (city) {
                                      setSelectedCity(city.value);
                                      form.setValue("city", city.value);
                                      fetchWarehouses(city.value);
                                    }
                                  }}
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
                                    onChange={(selectedOption) => {
                                      field.onChange(selectedOption?.value);
                                      form.setValue("warehouse", selectedOption?.value || "");
                                    }}
                                    value={warehouses.find(w => w.Description === field.value) ? { value: field.value, label: field.value } : null}
                                    options={warehouses.map(w => ({ value: w.Description, label: w.Description }))}
                                    placeholder={loadingWarehouses ? "Завантаження..." : "Оберіть відділення"}
                                    isDisabled={!selectedCity || loadingWarehouses || selectedToggle === "courier"}
                                    menuPortalTarget={document.body}
                                    styles={{
                                      container: (provided) => ({
                                        ...provided,
                                        width: '100%',
                                      }),
                                      control: (provided) => ({
                                        ...provided,
                                        maxWidth: '100%',
                                        whiteSpace: 'normal',
                                        wordBreak: 'break-word',
                                      }),
                                      menu: (provided) => ({
                                        ...provided,
                                        zIndex: 9999,
                                        maxWidth: '100%',
                                        wordWrap: 'break-word',
                                      }),
                                      singleValue: (provided) => ({
                                        ...provided,
                                        whiteSpace: 'normal',
                                        wordBreak: 'break-word',
                                      }),
                                      option: (provided) => ({
                                        ...provided,
                                        whiteSpace: 'normal',
                                        wordBreak: 'break-word',
                                      }),
                                    }}                                    
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                          )}
                          {selectedToggle === "courier" && (
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

              <Card className="shadow-md p-4 m-2 w-full">
                <CardHeader>
                  <CardTitle className="text-[#1996A3] text-[25px] font-semibold w-full">
                    Оплата
                  </CardTitle>
                  <CardContent>
                  <RadioGroup
                      value={selectedPayment}
                      onChange={(value) => {
                        handleSelectPayment(value);
                        form.setValue("paymentMethods", value);
                      }}
                    >
                    <div className="space-y-2 mt-8">
                      {paymentMethods.map((method) => (
                        <RadioGroup.Option
                        key={method.id}
                        value={method.label}
                        className={({ checked }) =>
                          `flex items-center justify-between gap-3 cursor-pointer rounded-lg px-4 py-2 border transition
                           ${checked ? 'bg-blue-500 text-white border-blue-500' : 'bg-white border-gray-300'}`
                        }
                      >
                        {({ checked }) => (
                          <>
                            <span className="text-sm">{method.label}</span>
                            <div
                              className={`h-4 w-4 rounded-full border-2 flex items-center justify-center
                                ${checked ? 'border-white' : 'border-gray-300'}`}
                            >
                              {checked && <div className="h-2 w-2 rounded-full bg-white" />}
                            </div>
                          </>
                        )}
                      </RadioGroup.Option>                      
                      ))}
                    </div>
                  </RadioGroup>
                  {selectedPayment && (
                    <div className="mt-4 text-[13px] text-gray-600">
                      Вибрано: {paymentMethods.find(m => m.label === selectedPayment)?.label}
                    </div>
                  )}

                  </CardContent>
                </CardHeader>
                <CardContent>

                </CardContent>
              </Card>
            </CardContent>
          </Card>

          <Card className="border-none shadow-none outline-none ring-0 p-0 gap-0">
            <CardContent className="space-y-5">
              <Card className="shadow-md p-4 m-2 w-full">
                <CardHeader>
                  <CardTitle className="text-[#1996A3] text-[25px] font-semibold">
                    Підсумок замовлення
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <div className=" p-4 rounded-lg space-y-3 text-[13px]">
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-semibold text-gray-600">Прізвище:</span>
                      <span>{form.watch("lastName") || "Не вказано"}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-semibold text-gray-600">Ім&apos;я:</span>
                      <span>{form.watch("firstName") || "Не вказано"}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-semibold text-gray-600">Електронна пошта:</span>
                      <span>{form.watch("email") || "Не вказано"}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-semibold text-gray-600">Телефон:</span>
                      <span>{form.watch("phone") || "Не вказано"}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-semibold text-gray-600">Адреса:</span>
                      <span>{form.watch("address") || "Не вказано"}</span>
                    </div>
                    {form.watch("city") && (
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-semibold text-gray-600">Місто:</span>
                        <span>{form.watch("city")}</span>
                      </div>
                    )}
                    {form.watch("warehouse") && (
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-semibold text-gray-600">Відділення:</span>
                        <span className="truncate max-w-[300px] overflow-hidden">{form.watch("warehouse")}</span>
                      </div>
                    )}
                    {form.watch("addressCourier") && (
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-semibold text-gray-600">Адреса доставки:</span>
                        <span>{form.watch("addressCourier")}</span>
                      </div>
                    )}
                    {form.watch("additionalInfo") && (
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-semibold text-gray-600">Додаткова інформація:</span>
                        <span>{form.watch("additionalInfo")}</span>
                      </div>
                    )}
                    {form.watch("paymentMethods") && (
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-semibold text-gray-600">Оплата:</span>
                        <span>{form.watch("paymentMethods")}</span>
                      </div>
                    )}
                  </div>
                  <CardTitle className="text-[#1996A3] text-[20px] font-semibold py-4">
                    <p>Товари в замовленні</p>
                  </CardTitle>
                  {cart.length === 0 ? (
                    <p>Ваш кошик порожній.</p>
                  ) : (
                    cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 text-base mt-3 border-b">
                        <div className="flex items-center gap-3">
                          <Image src={item.image} width={40} height={40} alt={item.name} className="object-cover rounded" />
                          <p className="font-semibold text-[14px]">{item.name}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <p>x{item.quantity}</p>
                          <p>{(item.price * item.quantity).toFixed(2)} грн.</p>
                        </div>
                      </div>
                    ))
                  )}

                </CardContent>
                <CardFooter>
                  <p className="text-xl font-semibold p-2">Всього: {totalPrice.toFixed(2)} грн.</p>
                </CardFooter>
                <Button type="submit" className="w-full bg-[#1996A3] hover:bg-[#167A8A] sm:w-auto text-white text-lg font-semibold py-3" disabled={isSubmitting}>
                  {isSubmitting ? "Обробка..." : "Оформити замовлення"}
                </Button>
              </Card>
            </CardContent>

          </Card>
        </div>
      </form>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-6">
          <div className="bg-white p-6 rounded-lg shadow-lg space-y-3 grid">
            <h1 className="text-lg font-semibold text-center">Замовлення успішно оформлене!</h1>
            <p className="text-gray-600 text-[14px] pb-3 text-center"> Вам надіслано підтвердження на пошту.</p>
            <Button className="flex bg-[#1996A3] p-3" onClick={() => setOpen(false)}>Закрити</Button>
          </div>
        </div>
      )}
    </Form>


  );
}