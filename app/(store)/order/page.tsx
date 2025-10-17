"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import Select from "react-select";
import CreatableSelect from "react-select/creatable";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Image from "next/image";
import { useCart } from "@/context/CartContext";

// ---------- картинки из /public (строковые пути)
const logo = "/icons/nova_poshta_2014_logo.svg(1).png";
const ukrLogo = "/icons/Ukrposhta.png";
const pickupLogo = "/icons/pickup.png";

// ---------- типы
type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type DeliveryMethod = "nova-poshta" | "ukr-poshta" | "pickup" | string;

type OrderFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  deliveryMethod: DeliveryMethod;
  selectedToggle?: string;

  city?: string;
  warehouse?: string;
  addressCourier?: string;
  address?: string;

  additionalInfo?: string;
  paymentMethods: string;
  pickup?: string;
  pickupDeatails?: string;

  cart: CartItem[];
};

// чтобы не конфликтовать по имени
type NPWarehouse = { Number: string; Description: string };

// публичный env, если бьём в API с клиента
const apiKey = process.env.NEXT_PUBLIC_NOVA_POSHTA_API_KEY;

const cities = [
  "Київ",
  "Харків",
  "Одеса",
  "Львів",
  "Дніпро",
  "Слов'янськ",
  "Запоріжжя",
  "Вінниця",
  "Івано-Франківськ",
  "Луцьк",
].map((city) => ({ value: city, label: city }));

const formSchema = z
  .object({
    firstName: z.string().min(2, { message: "Введіть правильне ім'я." }),
    lastName: z.string().min(2, { message: "Введіть правильне прізвище." }),
    email: z.string().email({ message: "Некоректна електронна пошта." }),
    phone: z.string().min(10, { message: "Введіть правильний номер телефону." }),
    address: z.string().min(5, { message: "Введіть правильну адресу." }),
    addressCourier: z.string().optional(),
    city: z.string().nullable().optional(),
    warehouse: z.string().optional(),
    additionalInfo: z.string().optional(),
    selectedToggle: z.string().optional(),
    paymentMethods: z.string().min(1, { message: "Оберіть метод оплати." }),
    pickup: z.string().optional(),
    pickupDeatails: z.string().optional(),
    deliveryMethod: z.enum(["nova-poshta", "ukr-poshta", "pickup"], {
      required_error: "Оберіть спосіб доставки.",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.deliveryMethod === "pickup") return;

    if (!data.city || data.city.trim().length < 2) {
      ctx.addIssue({
        path: ["city"],
        message: "Оберіть або введіть місто.",
        code: z.ZodIssueCode.custom,
      });
    }

    if (data.selectedToggle === "courier") {
      if (!data.addressCourier || data.addressCourier.trim().length < 5) {
        ctx.addIssue({
          path: ["addressCourier"],
          message: "Введіть правильну адресу для кур’єра.",
          code: z.ZodIssueCode.custom,
        });
      }
    } else {
      if (!data.warehouse || data.warehouse.trim().length < 3) {
        ctx.addIssue({
          path: ["warehouse"],
          message: "Оберіть відділення або поштомат.",
          code: z.ZodIssueCode.custom,
        });
      }
    }
  });

const paymentMethods = [{ id: "by_agreement", label: "По домовленості" }];

export default function OrderForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedToggle, setSelectedToggle] = useState("");
  const { cart, getCartTotalPrice } = useCart();
  const [selectedCity, setSelectedCity] = useState<string>();
  const [warehouses, setWarehouses] = useState<NPWarehouse[]>([]);
  const [loadingWarehouses, setLoadingWarehouses] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<string>("");
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState<string | undefined>(undefined);

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
      paymentMethods: "",
      pickup: "",
      deliveryMethod: undefined as any,
      pickupDeatails: "",
    },
  });

  const router = useRouter();

  async function fetchWarehouses(city: string) {
    setLoadingWarehouses(true);
    try {
      const response = await fetch("https://api.novaposhta.ua/v2.0/json/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey,
          modelName: "Address",
          calledMethod: "getWarehouses",
          methodProperties: { CityName: city },
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

    const deliveryMethod = values.deliveryMethod as DeliveryMethod;

    const cleanedOrder: OrderFormData = {
      ...values,
      deliveryMethod,
      city: undefined,
      warehouse: undefined,
      addressCourier: undefined,
      pickup: undefined,
      selectedToggle,
      cart:
        cart?.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })) || [],
    };

    if (deliveryMethod === "pickup") {
      cleanedOrder.pickup = values.pickup;
    } else if (
      deliveryMethod === "nova-poshta" ||
      deliveryMethod === "ukr-poshta"
    ) {
      cleanedOrder.city = selectedCity ?? "";
      if (selectedToggle === "courier") {
        cleanedOrder.addressCourier = values.addressCourier;
      } else {
        cleanedOrder.warehouse = values.warehouse;
      }
    }

    try {
      const response = await fetch("/api/send_email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanedOrder),
      });

      if (!response.ok) throw new Error("Помилка оформлення замовлення.");

      setOpen(true);
      form.reset();
      setSelectedPayment("");
    } catch {
      alert("Не вдалося оформити замовлення. Спробуйте ще раз.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const totalPrice = getCartTotalPrice();

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 py-12 text-lg max-w-7xl mx-auto mt-0 p-3">
          <Card className="border-none shadow-none outline-none ring-0 p-0 gap-0 max-w-full overflow-hidden">
            <CardContent>
              <Card className="shadow-md p-4 m-2 w-full">
                <CardHeader>
                  <CardTitle className="text-[#1996A3] text-[25px] font-semibold">
                    Контактні дані
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <FormField
                    name="lastName"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Прізвище</FormLabel>
                        <FormControl>
                          <Input placeholder="Петренко" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="firstName"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ім&apos;я</FormLabel>
                        <FormControl>
                          <Input placeholder="Іван" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Електронна пошта</FormLabel>
                        <FormControl>
                          <Input placeholder="ivan@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="phone"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Телефон</FormLabel>
                        <FormControl>
                          <Input placeholder="+38 (097) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="address"
                    control={form.control}
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
                    name="additionalInfo"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Додаткова інформація</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Особливі побажання щодо доставки"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card className="shadow-md p-4 m-2 w-full max-w-full overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-[#1996A3] text-[20px] md:text-[25px] font-semibold">
                    Доставка
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs
                    value={activeTab}
                    onValueChange={(value) => {
                      setActiveTab(value);
                      form.setValue(
                        "deliveryMethod",
                        value as "nova-poshta" | "pickup" | "ukr-poshta"
                      );
                      if (value === "pickup") {
                        setSelectedToggle("");
                        setSelectedCity("");
                        form.setValue("selectedToggle", "");
                        form.setValue("city", "");
                        form.setValue("warehouse", "");
                      }
                    }}
                    className="w-full"
                  >
                    <TabsList className="flex flex-wrap sm:flex-nowrap overflow-x-auto gap-2 w-full mb-2">
                      <TabsTrigger value="nova-poshta">
                        <Image
                          src={logo}
                          alt="Nova Poshta"
                          width={24}
                          height={24}
                          className="w-3 h-auto mr-2"
                        />
                        Нова Пошта
                      </TabsTrigger>

                      <TabsTrigger value="ukr-poshta" className="hidden">
                        <Image
                          src={ukrLogo}
                          alt="Ukr Poshta"
                          width={16}
                          height={16}
                          className="w-2 h-auto mr-2"
                        />
                        Укр Пошта
                      </TabsTrigger>

                      <TabsTrigger value="pickup">
                        <Image
                          src={pickupLogo}
                          alt="Pickup"
                          width={28}
                          height={28}
                          className="w-5 h-auto mr-2"
                        />
                        Самовивіз
                      </TabsTrigger>
                    </TabsList>

                    {!activeTab && (
                      <div className="text-gray-500 text-sm px-4 py-2">
                        Будь ласка, оберіть спосіб доставки
                      </div>
                    )}

                    {/* Нова Пошта */}
                    <TabsContent value="nova-poshta">
                      <div className="border-b-0 p-3 py-1 rounded-lg w-full max-w-full overflow-x-hidden">
                        <div className="space-y-4 p-3 sm:p-5 rounded-lg text-sm sm:text-base max-w-full overflow-x-hidden">
                          <ToggleGroup
                            type="single"
                            value={selectedToggle}
                            onValueChange={(value) => {
                              setSelectedToggle(value);
                              setSelectedCity("");
                              form.setValue("city", "");
                              form.setValue("warehouse", "");
                            }}
                            className="flex flex-wrap gap-2 sm:gap-3"
                          >
                            <ToggleGroupItem value="Відділення">
                              🏢 Відділення
                            </ToggleGroupItem>
                            <ToggleGroupItem value="Поштомат">
                              📦 Поштомат
                            </ToggleGroupItem>
                            <ToggleGroupItem value="courier">
                              🚚 Кур&apos;єром
                            </ToggleGroupItem>
                          </ToggleGroup>

                          <FormField
                            name="city"
                            render={() => (
                              <FormItem>
                                <FormLabel>Місто</FormLabel>
                                <FormControl>
                                  {isClient && (
                                    <CreatableSelect
                                      options={cities}
                                      value={
                                        selectedCity
                                          ? {
                                              value: selectedCity,
                                              label: selectedCity,
                                            }
                                          : null
                                      }
                                      styles={{
                                        menu: (p) => ({ ...p, zIndex: 9999 }),
                                      }}
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
                                  )}
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {selectedToggle !== "courier" ? (
                            <FormField
                              name="warehouse"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Відділення</FormLabel>
                                  <FormControl>
                                    {isClient && (
                                      <Select
                                        {...field}
                                        onChange={(opt) => {
                                          field.onChange(opt?.value);
                                          form.setValue(
                                            "warehouse",
                                            opt?.value || ""
                                          );
                                        }}
                                        value={
                                          warehouses.find(
                                            (w) => w.Description === field.value
                                          )
                                            ? {
                                                value: field.value,
                                                label: field.value,
                                              }
                                            : null
                                        }
                                        options={warehouses.map((w) => ({
                                          value: w.Description,
                                          label: w.Description,
                                        }))}
                                        placeholder={
                                          loadingWarehouses
                                            ? "Завантаження..."
                                            : "Оберіть відділення"
                                        }
                                        isDisabled={
                                          !selectedCity || loadingWarehouses
                                        }
                                        styles={{
                                          menu: (p) => ({
                                            ...p,
                                            zIndex: 9999,
                                            maxHeight: 200,
                                            overflowY: "auto",
                                          }),
                                        }}
                                        menuPortalTarget={document.body}
                                      />
                                    )}
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          ) : (
                            <FormField
                              name="addressCourier"
                              control={form.control}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Адреса доставки</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="вул. Шевченка, 10"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          )}
                        </div>
                      </div>
                    </TabsContent>

                    {/* Укр Пошта */}
                    <TabsContent value="ukr-poshta">
                      <div className="border-b-0 p-3 py-1 rounded-lg w-full">
                        <div className="w-full max-w-full overflow-x-hidden">
                          <div className="space-y-4 p-3 sm:p-5 rounded-lg text-sm sm:text-base w-full min-w-0 overflow-hidden">
                            <ToggleGroup
                              type="single"
                              value={selectedToggle}
                              onValueChange={(value) => {
                                setSelectedToggle(value);
                                setSelectedCity("");
                                form.setValue("city", "");
                                form.setValue("warehouse", "");
                              }}
                              className="flex flex-wrap gap-2 sm:gap-3"
                            >
                              <ToggleGroupItem value="Відділення">
                                🏢 Відділення
                              </ToggleGroupItem>
                              <ToggleGroupItem value="Поштомат">
                                📦 Поштомат
                              </ToggleGroupItem>
                              <ToggleGroupItem value="courier">
                                🚚 Кур&apos;єром
                              </ToggleGroupItem>
                            </ToggleGroup>

                            <FormField
                              name="city"
                              render={() => (
                                <FormItem>
                                  <FormLabel>Місто</FormLabel>
                                  <FormControl>
                                    {isClient && (
                                      <CreatableSelect
                                        options={cities}
                                        value={
                                          selectedCity
                                            ? {
                                                value: selectedCity,
                                                label: selectedCity,
                                              }
                                            : null
                                        }
                                        styles={{
                                          menu: (p) => ({ ...p, zIndex: 9999 }),
                                        }}
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
                                    )}
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            {selectedToggle !== "courier" ? (
                              <FormField
                                name="warehouse"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Відділення</FormLabel>
                                    <FormControl className="min-w-0 overflow-hidden w-full">
                                      {isClient && (
                                        <Select
                                          {...field}
                                          onChange={(opt) => {
                                            field.onChange(opt?.value);
                                            form.setValue(
                                              "warehouse",
                                              opt?.value || ""
                                            );
                                          }}
                                          value={
                                            warehouses.find(
                                              (w) =>
                                                w.Description === field.value
                                            )
                                              ? {
                                                  value: field.value,
                                                  label: field.value,
                                                }
                                              : null
                                          }
                                          options={warehouses.map((w) => ({
                                            value: w.Description,
                                            label: w.Description,
                                          }))}
                                          placeholder={
                                            loadingWarehouses
                                              ? "Завантаження..."
                                              : "Оберіть відділення"
                                          }
                                          isDisabled={
                                            !selectedCity || loadingWarehouses
                                          }
                                          styles={{
                                            container: (p) => ({
                                              ...p,
                                              maxWidth: "100%",
                                              minWidth: 0,
                                            }),
                                            control: (p) => ({
                                              ...p,
                                              minHeight: 42,
                                              maxWidth: "100%",
                                              overflow: "hidden",
                                              display: "flex",
                                              flexWrap: "nowrap",
                                            }),
                                            valueContainer: (p) => ({
                                              ...p,
                                              flex: 1,
                                              minWidth: 0,
                                              overflow: "hidden",
                                            }),
                                            singleValue: (p) => ({
                                              ...p,
                                              whiteSpace: "nowrap",
                                              overflow: "hidden",
                                              textOverflow: "ellipsis",
                                              maxWidth: "100%",
                                              title: field.value,
                                            }),
                                            placeholder: (p) => ({
                                              ...p,
                                              whiteSpace: "nowrap",
                                              overflow: "hidden",
                                              textOverflow: "ellipsis",
                                            }),
                                            indicatorsContainer: (p) => ({
                                              ...p,
                                              flexShrink: 0,
                                            }),
                                            menu: (p) => ({
                                              ...p,
                                              zIndex: 9999,
                                              maxHeight: 200,
                                              overflowY: "auto",
                                            }),
                                            option: (p) => ({
                                              ...p,
                                              whiteSpace: "normal",
                                              wordBreak: "break-word",
                                            }),
                                          }}
                                          menuPortalTarget={document.body}
                                        />
                                      )}
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            ) : (
                              <FormField
                                name="addressCourier"
                                control={form.control}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Адреса доставки</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="вул. Шевченка, 10"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    {/* Самовивіз */}
                    <TabsContent value="pickup">
                      <div className="space-y-4 p-4 rounded-lg bg-gray-50 text-sm">
                        <p>
                          Ви можете забрати замовлення самостійно. <br />
                          Деталі по телефону: +38 (050) 47-30-644
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <Card className="shadow-md p-4 m-2 w-full">
                <CardHeader>
                  <CardTitle className="text-[#1996A3] text-[25px] font-semibold w-full">
                    Оплата
                  </CardTitle>
                  <CardContent>
                    <div className="space-y-2 mt-8">
                      {paymentMethods.map((method) => (
                        <label
                          key={method.id}
                          className={`flex items-center justify-between gap-3 cursor-pointer rounded-lg px-4 py-2 border transition
                            ${
                              selectedPayment === method.label
                                ? "bg-[#1996A3] text-white border-[#1996A3]"
                                : "bg-white border-gray-300"
                            }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="paymentMethods"
                              value={method.label}
                              checked={selectedPayment === method.label}
                              onChange={(e) => {
                                const v = e.target.value;
                                setSelectedPayment(v);
                                form.setValue("paymentMethods", v);
                              }}
                              className="h-4 w-4"
                            />
                            <span className="text-sm">{method.label}</span>
                          </div>
                          <div
                            className={`h-4 w-4 rounded-full border-2 flex items-center justify-center
                              ${
                                selectedPayment === method.label
                                  ? "border-white"
                                  : "border-gray-300"
                              }`}
                          >
                            {selectedPayment === method.label && (
                              <div className="h-2 w-2 rounded-full bg-white" />
                            )}
                          </div>
                        </label>
                      ))}
                    </div>

                    {selectedPayment && (
                      <div className="mt-4 text-[13px] text-gray-600">
                        Вибрано:{" "}
                        {paymentMethods.find(
                          (m) => m.label === selectedPayment
                        )?.label}
                      </div>
                    )}
                  </CardContent>
                </CardHeader>
                <CardContent />
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
                  <div className="p-4 rounded-lg space-y-3 text-[13px]">
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-semibold text-gray-600">
                        Прізвище:
                      </span>
                      <span>{form.watch("lastName") || "Не вказано"}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-semibold text-gray-600">
                        Ім&apos;я:
                      </span>
                      <span>{form.watch("firstName") || "Не вказано"}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-semibold text-gray-600">
                        Електронна пошта:
                      </span>
                      <span>{form.watch("email") || "Не вказано"}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-semibold text-gray-600">
                        Телефон:
                      </span>
                      <span>{form.watch("phone") || "Не вказано"}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-semibold text-gray-600">
                        Адреса:
                      </span>
                      <span>{form.watch("address") || "Не вказано"}</span>
                    </div>
                    {form.watch("city") && (
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-semibold text-gray-600">
                          Місто:
                        </span>
                        <span>{form.watch("city")}</span>
                      </div>
                    )}
                    {form.watch("deliveryMethod") && (
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-semibold text-gray-600">
                          Доставка:
                        </span>
                        <span>
                          {form.watch("deliveryMethod") === "pickup"
                            ? "Самовивіз"
                            : form.watch("deliveryMethod") === "ukr-poshta"
                            ? "Укр Пошта"
                            : form.watch("deliveryMethod") === "nova-poshta"
                            ? "Нова Пошта"
                            : "Не вказано"}
                        </span>
                      </div>
                    )}
                    {form.watch("warehouse") && (
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-semibold text-gray-600">
                          Відділення:
                        </span>
                        <span className="truncate max-w-[300px] overflow-hidden">
                          {form.watch("warehouse")}
                        </span>
                      </div>
                    )}
                    {form.watch("addressCourier") && (
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-semibold text-gray-600">
                          Адреса доставки:
                        </span>
                        <span>{form.watch("addressCourier")}</span>
                      </div>
                    )}
                    {form.watch("additionalInfo") && (
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-semibold text-gray-600">
                          Додаткова інформація:
                        </span>
                        <span>{form.watch("additionalInfo")}</span>
                      </div>
                    )}
                    {form.watch("paymentMethods") && (
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-semibold text-gray-600">
                          Оплата:
                        </span>
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
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 text-base mt-3 border-b"
                      >
                        <div className="flex items-center gap-3">
                          <Image
                            src={item.image}
                            width={40}
                            height={40}
                            alt={item.name}
                            className="object-cover rounded"
                          />
                          <p className="font-semibold text-[14px]">
                            {item.name}
                          </p>
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
                  <p className="text-xl font-semibold p-2">
                    Всього: {totalPrice.toFixed(2)} грн.
                  </p>
                </CardFooter>

                <Button
                  type="submit"
                  className="w-full bg-[#1996A3] hover:bg-[#167A8A] sm:w-auto text-white text-lg font-semibold py-3"
                  disabled={isSubmitting}
                >
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
            <h1 className="text-lg font-semibold text-center">
              Замовлення успішно оформлене!
            </h1>
            <p className="text-gray-600 text-[14px] pb-3 text-center">
              Вам надіслано підтвердження на пошту.
            </p>
            <Button
              className="flex bg-[#1996A3] p-3"
              onClick={() => {
                setOpen(false);
                router.push("/");
              }}
            >
              Закрити
            </Button>
          </div>
        </div>
      )}
    </FormProvider>
  );
}
