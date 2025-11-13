// GraphQL Response Types
export type Variant = {
  id: string;
  title: string;
  inventoryQuantity: number;
};

export type Product = {
  id: string;
  title: string;
  variants: {
    nodes: Variant[];
  };
};

export type ProductsResponse = {
  data?: {
    products: {
      nodes: Product[];
    };
  };
  errors?: { message: string }[];
};

// Formatted Types for Frontend
export type FormattedVariant = {
  id: string;
  title: string;
  inventoryQuantity: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
};

export type FormattedProduct = {
  id: string;
  title: string;
  variants: FormattedVariant[];
};

// API Response Type
export type ProductsApiResponse = {
  success: boolean;
  products: FormattedProduct[];
  rows: ProductVariantRow[];
  count: number;
  currentFilter: string;
  counts: {
    all: number;
    low: number;
    out: number;
  };
  error?: string;
};

// Filter type
export type ProductFilter = "all" | "low" | "out";

export type ProductVariantRow = {
    productId: string;
    productTitle: string;
    variantId: string;
    variantTitle: string;
    inventoryQuantity: number;
    status: "In Stock" | "Low Stock" | "Out of Stock";
}