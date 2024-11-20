import { createClient } from "@sanity/client"; // Updated import for Sanity v3
import imageUrlBuilder from "@sanity/image-url"; // Import for image URL builder

// Create the Sanity client
export const client = createClient({
  projectId: "0opk9qht", // Your Sanity project ID
  dataset: "production", // Dataset name (e.g., production)
  apiVersion: "2024-11-20", // API version of Sanity
  useCdn: true, // Use CDN for faster response (set to false if real-time updates are required)
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN, // Sanity token for authentication (if required)
});

// Create an image URL builder instance
const builder = imageUrlBuilder(client);

// Function to generate URLs for images
export const urlFor = (source) => builder.image(source);
