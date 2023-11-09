import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Pleyades ::: Magia y Luz',
  description: 'Vendemos velas artesanales',
  keywords: 'velas, aromas',
};

export default Meta;
