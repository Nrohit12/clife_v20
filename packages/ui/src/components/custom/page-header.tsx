interface PageHeaderProps {
  title: string;
}

export default function PageHeader({ title }: PageHeaderProps) {
  return (
    <div
      style={{
        fontFamily: "Inter Tight",
        fontWeight: 500,
        fontSize: "28px",
        lineHeight: "32px",
        letterSpacing: "0px",
      }}
    >
      {title}
    </div>
  );
}
