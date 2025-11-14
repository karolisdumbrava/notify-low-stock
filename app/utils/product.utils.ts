import { INVENTORY_CONFIG } from "app/config/inventory.config";
import {
  FormattedProduct,
  FormattedVariant,
  Product,
  ProductFilter,
  Variant,
} from "../types/product.types";

/**
 * Determines the stock status of a variant based on inventory quantity
 */
export function getVariantStatus(
  inventoryQuantity: number,
): "In Stock" | "Low Stock" | "Out of Stock" {
  if (inventoryQuantity === INVENTORY_CONFIG.OUT_OF_STOCK_THRESHOLD) return "Out of Stock";
  if (inventoryQuantity < INVENTORY_CONFIG.LOW_STOCK_THRESHOLD) return "Low Stock";
  return "In Stock";
}

/**
 * Filters products based on the given filter criteria
 * @param products - Array of products to filter
 * @param filter - Filter criteria: "all", "low", or "out"
 * @returns Filtered array of products
 */
export function filterProducts(
  products: Product[],
  filter: ProductFilter,
): Product[] {
  switch (filter) {
    case "low":
      return products.filter((product) =>
        product.variants.nodes.some(
          (variant) =>
            variant.inventoryQuantity > INVENTORY_CONFIG.OUT_OF_STOCK_THRESHOLD && variant.inventoryQuantity < INVENTORY_CONFIG.LOW_STOCK_THRESHOLD,
        ),
      );
    case "out":
      return products.filter((product) =>
        product.variants.nodes.every(
          (variant) => variant.inventoryQuantity === INVENTORY_CONFIG.OUT_OF_STOCK_THRESHOLD,
        ),
      );
    case "all":
    default:
      return products;
  }
}

/**
 * Formats a variant into the frontend-friendly structure
 * @param variant - The variant to format
 * @returns Formatted variant
 */
export function formatVariant(variant: Variant): FormattedVariant {
  return {
    id: variant.id,
    title: variant.title,
    inventoryQuantity: variant.inventoryQuantity,
    status: getVariantStatus(variant.inventoryQuantity),
  };
}

/**
 * Formats a product into the frontend-friendly structure
 * @param product - The product to format
 * @returns Formatted product
 */
export function formatProduct(product: Product): FormattedProduct {
  return {
    id: product.id,
    title: product.title,
    variants: product.variants.nodes.map(formatVariant),
  };
}

/**
 * Calculates counts of products in different stock statuses
 * @param products - Array of products to calculate counts for
 * @returns Object with counts for all, low stock, and out of stock products
 */
export function calculateProductCounts(products: Product[]) {
  return {
    all: products.length,
    low: filterProducts(products, "low").length,
    out: filterProducts(products, "out").length,
  };
}

/**
 * Filters the variants of a product based on the given status filter
 * @param product - The product whose variants are to be filtered
 * @param filter - Filter criteria: "all", "low", or "out"
 * @returns Product with filtered variants
 */
export function filterVariantsByStatus(
  product: FormattedProduct,
  filter: ProductFilter,
): FormattedProduct {
  if (filter === "all") {
    return product;
  }

  const filteredVariants = product.variants.filter((variant) => {
    if (filter === "low") {
      return variant.status === "Low Stock";
    } else if (filter === "out") {
      return variant.status === "Out of Stock";
    }
    return true;
  });

  return {
    ...product,
    variants: filteredVariants,
  };
}

/**
 * Flattens products and their variants into a single array of variant objects
 * with associated product information
 * @param products - Array of formatted products
 * @returns Flattened array of variants with product info
 */
export function flattenProductsVariants(products: FormattedProduct[]) {
  return products.flatMap((product) =>
    product.variants.map((variant) => ({
      productId: product.id,
      productTitle: product.title,
      variantId: variant.id,
      variantTitle: variant.title,
      inventoryQuantity: variant.inventoryQuantity,
      status: variant.status,
    })),
  );
}
