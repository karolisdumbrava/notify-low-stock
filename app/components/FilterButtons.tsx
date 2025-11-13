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
        >
          All Products ({counts.all})
        </s-button>
        <s-button
          variant={currentFilter === "low" ? "primary" : "secondary"}
          onClick={() => onFilterChange("low")}
        >
          Low Stock ({counts.low})
        </s-button>
        <s-button
          variant={currentFilter === "out" ? "primary" : "secondary"}
          onClick={() => onFilterChange("out")}
        >
          Out of Stock ({counts.out})
        </s-button>
      </div>
    </div>
  );
}