import type { HeadersFunction, LoaderFunctionArgs } from "react-router";
import { useLoaderData, useNavigate, useNavigation } from "react-router";
import { authenticate } from "../shopify.server";
import { boundary } from "@shopify/shopify-app-react-router/server";
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
import { FilterButtons } from "../components/FilterButtons";
import { PageHeader } from "../components/PageHeader";
import { ProductInventoryTable } from "../components/ProductInventoryTable";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin } = await authenticate.admin(request);

  const url = new URL(request.url);
  const status = (url.searchParams.get("status") || "all") as ProductFilter;

  try {
    const response = await admin.graphql(GET_PRODUCTS_QUERY);
    const responseJson: ProductsResponse = await response.json();

    if (!responseJson.data) {
      throw new Error("No data returned from Shopify API");
    }

    const products = responseJson.data.products.nodes;
    const counts = calculateProductCounts(products);
    const filteredProducts = filterProducts(products, status);
    const formattedProducts = filteredProducts.map(formatProduct);

    // IMPORTANT: Filter variants within each product based on status
    const productsWithFilteredVariants = formattedProducts
      .map((product) => filterVariantsByStatus(product, status))
      .filter((product) => product.variants.length > 0); // Remove products with no matching variants

    // Flatten into rows for table display
    const rows = flattenProductsVariants(productsWithFilteredVariants);

    return Response.json({
      success: true,
      products: productsWithFilteredVariants,
      rows,
      count: rows.length,
      currentFilter: status,
      counts,
    } satisfies ProductsApiResponse);
  } catch (error) {
    console.error("Error:", error);
    return Response.json({
      success: false,
      products: [],
      rows: [],
      count: 0,
      currentFilter: status,
      error: "Failed to load products",
      counts: { all: 0, low: 0, out: 0 },
    } satisfies ProductsApiResponse);
  }
};

export default function Index() {
  const data = useLoaderData() as ProductsApiResponse;
  const navigate = useNavigate();
  const navigation = useNavigation();

  const handleFilterChange = (newStatus: ProductFilter) => {
    navigate(`?status=${newStatus}`);
  };

  const isLoading = navigation.state === "loading";

  const handleResetFilter = () => {
    navigate("?status=all");
  };
  return (
    <s-page>
      <div style={{ padding: "20px" }}>
        <PageHeader title="Product Inventory" />
        <FilterButtons
          currentFilter={data.currentFilter}
          counts={data.counts}
          onFilterChange={handleFilterChange}
        />
        {/* Loading State */}
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "200px",
            }}
          >
            <s-spinner size="large" />
          </div>
        ) : (
          <ProductInventoryTable
            rows={data.rows}
            currentFilter={data.currentFilter}
            onResetFilter={handleResetFilter}
          />
        )}{" "}
      </div>
    </s-page>
  );
}

export const headers: HeadersFunction = (headersArgs) => {
  return boundary.headers(headersArgs);
};

export { ErrorBoundary } from "../components/ErrorBoundary";
