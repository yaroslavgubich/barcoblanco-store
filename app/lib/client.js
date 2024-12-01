import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Create a Sanity client instance
export const client = createClient({
  projectId: "0opk9qht",
  dataset: "dataset",
  apiVersion: "2023-11-11",
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

// Create an image URL builder
const builder = imageUrlBuilder(client);

// Function to convert image references into URLs
export const urlFor = (source) => builder.image(source);
