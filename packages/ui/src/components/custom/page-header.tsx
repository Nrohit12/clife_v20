interface PageHeaderProps {
  title: string;
}

const PageHeader = ({ title }: PageHeaderProps) => {
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
};

export default PageHeader;
