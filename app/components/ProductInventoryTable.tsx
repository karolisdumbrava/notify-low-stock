import type { ProductVariantRow } from "../types/product.types";
import { EmptyState } from "./EmptyState";

type ProductInventoryTableProps = {
  rows: ProductVariantRow[];
  currentFilter: string;
  onResetFilter: () => void;
};

export function ProductInventoryTable({
  rows,
  currentFilter,
  onResetFilter,
}: ProductInventoryTableProps) {
  if (rows.length === 0) {
    return <EmptyState filter={currentFilter} onReset={onResetFilter} />;
  }

  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "separate",
        borderSpacing: "0 8px",
      }}
      role="table"
      aria-label="Product inventory list"
    >
      <thead>
        <tr>
          <th
            scope="col"
            style={{
              textAlign: "left",
              padding: "12px 16px",
              backgroundColor: "#f6f6f7",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            Product
          </th>
          <th
            scope="col"
            style={{
              textAlign: "left",
              padding: "12px 16px",
              backgroundColor: "#f6f6f7",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            Variant
          </th>
          <th
            scope="col"
            style={{
              textAlign: "right",
              padding: "12px 16px",
              backgroundColor: "#f6f6f7",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            Quantity
          </th>
          <th
            scope="col"
            style={{
              textAlign: "center",
              padding: "12px 16px",
              backgroundColor: "#f6f6f7",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            Status
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr
            key={row.variantId}
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e1e3e5",
            }}
          >
            <td
              style={{
                padding: "16px",
                fontWeight: "500",
                fontSize: "14px",
                borderTopLeftRadius: "8px",
                borderBottomLeftRadius: "8px",
              }}
            >
              {row.productTitle}
            </td>
            <td
              style={{
                padding: "16px",
                fontSize: "14px",
                color: "#6d7175",
              }}
            >
              {row.variantTitle}
            </td>
            <td
              style={{
                padding: "16px",
                textAlign: "right",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              {row.inventoryQuantity}
            </td>
            <td
              style={{
                padding: "16px",
                textAlign: "center",
                borderTopRightRadius: "8px",
                borderBottomRightRadius: "8px",
              }}
            >
              <s-badge
                tone={
                  row.status === "Out of Stock"
                    ? "critical"
                    : row.status === "Low Stock"
                      ? "warning"
                      : "success"
                }
              >
                {row.status}
              </s-badge>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
