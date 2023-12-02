import { Row, Col, Button } from 'react-bootstrap';
import { useGetProductsQuery } from '../slices/productApiSlice';
import ProductCard from '../components/ProductCard';
import Meta from '../components/Meta';
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate';
import { useParams } from 'react-router-dom';
import ProductCarousel from '../components/ProductCarousel';
import { Link } from 'react-router-dom';

const HomeScreen = () => {
 // const { data: products, isLoading, error } = useGetProductsQuery();
 const { pageNumber,keyword } = useParams();

 const { data, isLoading, error } = useGetProductsQuery({
   keyword,
   pageNumber,
 });


  return (
    <>
     {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      {isLoading ? (
        <Loader/>
      ) : error ? (
        <Message variant='danger'>{error?.data.message || error.error}</Message>
      ) : (
        <>
        <Meta/>
          <h1>Latest Products</h1>
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;