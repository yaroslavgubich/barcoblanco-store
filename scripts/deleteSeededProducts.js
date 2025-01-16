import { client } from "../app/lib/client.js";

const deleteSeededProducts = async () => {
  try {
    // Fetch all seeded products (modify query as needed)
    const productsToDelete = await client.fetch(`
      *[_type == "product" && category in ["mirrors", "wardrobe", "cabinet", "waterproof"]]._id
    `);

    if (productsToDelete.length === 0) {
      console.log("No products found for deletion.");
      return;
    }

    console.log(`Found ${productsToDelete.length} products. Deleting...`);

    // Delete products in batches
    for (const productId of productsToDelete) {
      await client.delete(productId);
      console.log(`Deleted product: ${productId}`);
    }

    console.log("All specified products have been deleted.");
  } catch (error) {
    console.error("Error deleting products:", error.message);
  }
};

deleteSeededProducts();
