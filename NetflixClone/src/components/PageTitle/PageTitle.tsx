import { Helmet } from "react-helmet-async";

interface PageTitleProps {
  title?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  const pageTitle = title ? `${title} | Netflix Clone` : "Netflix Clone";

  return (
    <Helmet>
      <title>{pageTitle}</title>
    </Helmet>
  );
};

export default PageTitle;
