type PageHeaderProps = {
  title: string;
};

export function PageHeader({ title }: PageHeaderProps) {
  return (
    <h1
      style={{
        fontSize: "24px",
        fontWeight: "600",
        marginBottom: "20px",
      }}
    >
      {title}
    </h1>
  );
}