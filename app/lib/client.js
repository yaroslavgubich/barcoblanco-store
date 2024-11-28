import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Create a Sanity client instance
export const client = createClient({
  projectId: "0opk9qht", // Your Sanity project ID
  dataset: "dataset", // Dataset name
  apiVersion: "2023-11-11", // API version
  useCdn: true, // Set to false if you need fresh data for development
  token:
    "skQIUEwTIcizKs56v6jpQkgQVhV9V2xpZkz0ASoYJyIKt3qutBhImNrDp6AlPTNrQV2o3G0qoUAHirGg5yaMbVW5TSmLSb2LHvZDw4XXXDBjCoT0uiTLLJwwvUwo23FLHJqz81lJ0v0sajtrOPdCKxaXRsCALJYRCMDog9kLvEauPjsuUEvd", // Token with appropriate permissions
});

// Create an image URL builder
const builder = imageUrlBuilder(client);

// Function to convert image references into URLs
export const urlFor = (source) => builder.image(source);
