import type { ProductFilter } from "../types/product.types";

type FilterButtonsProps = {
  currentFilter: string;
  counts: {
    all: number;
    low: number;
    out: number;
  };
  onFilterChange: (filter: ProductFilter) => void;
};

export function FilterButtons({
  currentFilter,
  counts,
  onFilterChange,
}: FilterButtonsProps) {
  return (
    <div style={{ marginBottom: "24px" }}>
      <h2
        style={{
          fontSize: "18px",
          fontWeight: "500",
          marginBottom: "12px",
        }}
      >
        Filter by Stock Status
      </h2>
      <div style={{ display: "flex", gap: "10px" }}>
        <s-button
          variant={currentFilter === "all" ? "primary" : "secondary"}
          onClick={() => onFilterChange("all")}
          aria-pressed={currentFilter === "all"}
          aria-label="Show all products"
        >
          All Products ({counts.all})
        </s-button>
        <s-button
          variant={currentFilter === "low" ? "primary" : "secondary"}
          onClick={() => onFilterChange("low")}
          aria-pressed={currentFilter === "low"}
          aria-label="Filter by low stock products"
        >
          Low Stock ({counts.low})
        </s-button>
        <s-button
          variant={currentFilter === "out" ? "primary" : "secondary"}
          onClick={() => onFilterChange("out")}
          aria-pressed={currentFilter === "out"}
          aria-label="Filter by out of stock products"
        >
          Out of Stock ({counts.out})
        </s-button>
      </div>
    </div>
  );
}
