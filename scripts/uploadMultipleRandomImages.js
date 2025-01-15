import { client } from "../app/lib/client.js";
import { faker } from "@faker-js/faker";

const uploadedImageIds = [
  "image-37b1a2cfd82885ed5596cfac2c9ce14438c4206c-600x400-jpg",
  "image-6b2d219fb6cea8657113651df80c1d232b047714-600x400-jpg",
  "image-c5b77f7a42d5bb66d057a2df835f9e6c512db461-600x400-jpg",
  "image-f010884436a3fef045ff9e02a5043676e4f61547-600x400-jpg",
  "image-b70a2ee6f79b2b1f245722fbcb36ba0f7bb0d4ef-600x400-jpg",
];

const categories = ["mirrors", "wardrobe", "cabinet", "waterproof"];

const fakeProducts = Array.from({ length: 50 }, () => ({
  _type: "product",
  name: faker.commerce.productName(),
  slug: {
    _type: "slug",
    current: faker.helpers.slugify(faker.commerce.productName()),
  },
  price: parseFloat(faker.commerce.price(10, 1000, 2)),
  details: faker.commerce.productDescription(),
  category: faker.helpers.arrayElement(categories),
  image: [
    {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: faker.helpers.arrayElement(uploadedImageIds), // Randomly assign a valid image
      },
    },
  ],
}));

const uploadProducts = async () => {
  try {
    for (const product of fakeProducts) {
      const result = await client.create(product);
      console.log("Created product:", result._id);
    }
  } catch (error) {
    console.error("Error creating product:", error.message);
  }
};

uploadProducts();
console.log(JSON.stringify(fakeProducts, null, 2));
