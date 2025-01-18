import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import dotenv from "dotenv";
dotenv.config();

export const client = createClient({
  projectId: "0opk9qht",
  dataset: "dataset",
  apiVersion: "2023-11-11",
  useCdn: true,
  token: process.env.SANITY_TOKEN,
});

// Create an image URL builder
const builder = imageUrlBuilder(client);

// Function to convert image references into URLs
export const urlFor = (source) => builder.image(source);
