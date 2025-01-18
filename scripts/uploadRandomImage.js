import { client } from "../app/lib/client.js";
import axios from "axios";
import fs from "fs";
import path from "path";
const uploadedImageIds = [
  "image-37b1a2cfd82885ed5596cfac2c9ce14438c4206c-600x400-jpg",
  "image-6b2d219fb6cea8657113651df80c1d232b047714-600x400-jpg",
  "image-c5b77f7a42d5bb66d057a2df835f9e6c512db461-600x400-jpg",
  "image-f010884436a3fef045ff9e02a5043676e4f61547-600x400-jpg",
  "image-b70a2ee6f79b2b1f245722fbcb36ba0f7bb0d4ef-600x400-jpg",
];

(async () => {
  const imagePath = path.join(__dirname, "../assets/random-image.jpg"); // Save location

  try {
    // Fetch a random image from Lorem Picsum
    const response = await axios({
      url: "https://picsum.photos/600/400", // Fetch random 600x400 image
      method: "GET",
      responseType: "stream",
    });

    // Save the image locally
    const writer = fs.createWriteStream(imagePath);
    response.data.pipe(writer);

    writer.on("finish", async () => {
      console.log("Image downloaded locally at:", imagePath);

      // Upload the image to Sanity
      const imageAsset = await client.assets.upload(
        "image",
        fs.createReadStream(imagePath),
        {
          filename: "random-image.jpg",
        }
      );

      console.log("Uploaded image asset ID:", imageAsset._id);
    });

    writer.on("error", (err) => {
      console.error("Error saving image locally:", err.message);
    });
  } catch (error) {
    console.error("Error fetching or uploading image:", error.message);
  }
})();
console.log(JSON.stringify(fakeProducts, null, 2));
