type EmptyStateProps = {
  filter: string;
  onReset: () => void;
};

export function EmptyState({ filter, onReset }: EmptyStateProps) {
  const messages = {
    low: {
      title: "No Low Stock Products",
      description: "Great news! All your products are well-stocked.",
      icon: "✅",
    },
    out: {
      title: "No Out of Stock Products",
      description: "Excellent! All your products are available.",
      icon: "🎉",
    },
    all: {
      title: "No Products Found",
      description: "Start by adding products to your store.",
      icon: "📦",
    },
  };

  const message = messages[filter as keyof typeof messages] || messages.all;

  return (
    <div
      style={{
        textAlign: "center",
        padding: "60px 20px",
        backgroundColor: "#f6f6f7",
        borderRadius: "8px",
      }}
    >
      <div style={{ fontSize: "48px", marginBottom: "16px" }}>
        {message.icon}
      </div>
      <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px" }}>
        {message.title}
      </h3>
      <p style={{ color: "#6d7175", marginBottom: "20px" }}>
        {message.description}
      </p>
      {filter !== "all" && (
        <s-button onClick={onReset}>View All Products</s-button>
      )}
    </div>
  );
}
