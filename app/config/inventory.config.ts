/**
 * Inventory Configuration
 * 
 * Adjust these thresholds to customize when products are considered
 * "Low Stock" or "Out of Stock"
 */

export const INVENTORY_CONFIG = {
  /**
   * OUT_OF_STOCK_THRESHOLD
   * Products with inventory at or below this value are considered "Out of Stock"
   * @default 0
   */
  OUT_OF_STOCK_THRESHOLD: 0,

  /**
   * LOW_STOCK_THRESHOLD
   * Products with inventory below this value (but above OUT_OF_STOCK_THRESHOLD)
   * are considered "Low Stock"
   * @default 5
   */
  LOW_STOCK_THRESHOLD: 5,
} as const;

/**
 * Helper function to validate configuration
 */
export function validateInventoryConfig() {
  if (INVENTORY_CONFIG.LOW_STOCK_THRESHOLD <= INVENTORY_CONFIG.OUT_OF_STOCK_THRESHOLD) {
    throw new Error(
      `LOW_STOCK_THRESHOLD (${INVENTORY_CONFIG.LOW_STOCK_THRESHOLD}) must be greater than OUT_OF_STOCK_THRESHOLD (${INVENTORY_CONFIG.OUT_OF_STOCK_THRESHOLD})`
    );
  }
}

// Validate on import
validateInventoryConfig();