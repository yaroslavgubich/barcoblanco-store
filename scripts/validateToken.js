import { createClient } from "@sanity/client";

// Configure Sanity client with the token provided
const client = createClient({
  projectId: "0opk9qht", // Replace with your actual project ID
  dataset: "dataset", // Replace with your dataset name
  apiVersion: "2023-01-01", // Use a recent API version
  token:
    "skxxon1oodYFTBaKYwsaou4JMoiUCuiOX4z9h4mDJPHVogOqzo9SjddUAWufEHrPPeXS8jXrkvHwsTyt9pwIuL1bteJhBqsn1qj0HURi1lOwSztUZW00DQNwDtQyLQaySeZ0HSYZwJXPx1X9JQTdpE2BWJRTWkfYqNk41NNPvqg7Q4WqibZY", // Token to test
  useCdn: false,
});

(async () => {
  try {
    // Attempt to create a test document
    const result = await client.create({
      _type: "test",
      name: "Permission Test",
    });
    console.log("Permission test succeeded:", result);
  } catch (error) {
    console.error(
      "Permission test failed:",
      error.message,
      error.response?.body
    );
  }
})();
