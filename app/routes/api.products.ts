import { LoaderFunctionArgs } from "react-router";
import { authenticate } from "../shopify.server";
import { GET_PRODUCTS_QUERY } from "../graphql/products.queries";
import {
  filterProducts,
  formatProduct,
  calculateProductCounts,
  filterVariantsByStatus,
  flattenProductsVariants,
} from "../utils/product.utils";
import type {
  ProductsResponse,
  ProductsApiResponse,
  ProductFilter,
} from "../types/product.types";

export async function loader({ request }: LoaderFunctionArgs) {
  // Authenticate the request
  const { admin } = await authenticate.admin(request);

  // Get filter from query params
  const url = new URL(request.url);
  const status = (url.searchParams.get("status") || "all") as ProductFilter;

  try {
    // Fetch products from Shopify
    const response = await admin.graphql(GET_PRODUCTS_QUERY);
    const responseJson: ProductsResponse = await response.json();

    // Handle GraphQL errors
    if (responseJson.errors) {
      console.error("GraphQL Errors:", responseJson.errors);
      throw new Response("Failed to fetch products", { status: 500 });
    }

    // Ensure data exists
    if (!responseJson.data) {
      throw new Response("No product data found", { status: 404 });
    }

    const products = responseJson.data.products.nodes;

    // Calculate counts for all filters
    const counts = calculateProductCounts(products);

    // Filter products based on status
    const filteredProducts = filterProducts(products, status);

    // Format products for frontend
    const formattedProducts = filteredProducts.map(formatProduct);

    const productsWithFilteredVariants = formattedProducts
      .map((product) => filterVariantsByStatus(product, status))
      .filter((product) => product.variants.length > 0);

    const rows = flattenProductsVariants(productsWithFilteredVariants);
    // Return successful response
    return Response.json({
      success: true,
      products: productsWithFilteredVariants,
      rows,
      count: formattedProducts.length,
      currentFilter: status,
      counts,
    } satisfies ProductsApiResponse);
  } catch (error) {
    // Handle errors
    console.error("Error fetching products:", error);
    return Response.json(
      {
        success: false,
        error: "Failed to fetch products",
        products: [],
        rows: [],
        count: 0,
        currentFilter: status,
        counts: {
          all: 0,
          low: 0,
          out: 0,
        },
      } satisfies ProductsApiResponse,
      { status: 500 },
    );
  }
}
