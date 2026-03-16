import Firecrawl from "@mendable/firecrawl-js";

export const firecrawl = new Firecrawl({
  apiKey: process.env.FIRCRAWL_API_KEY,
});
