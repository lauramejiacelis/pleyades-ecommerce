import { LinkContainer } from "react-router-bootstrap"
import { Table, Button, Col, Row } from "react-bootstrap"
import { FaTimes, FaEdit, FaTrash } from "react-icons/fa"
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import { toast } from 'react-toastify'
import { useGetProductsQuery, useCreateProductMutation } from '../../slices/productApiSlice.js'

const ProductListScreen = () => {
  const { data:products, isLoading, error, refetch } = useGetProductsQuery();
  console.log(products)

  const [ createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();

  const deleteHandler = (id) =>{
    console.log('delete', id)
  }

const createProductHandler = async() => {
  if(window.confirm('Estas seguro de que quieres crear un nuevo producto?')){
    try {
      await createProduct()
      refetch()
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }
}

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h2>Productos</h2>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm m-3" onClick={createProductHandler}>
            <FaEdit/> Crear  Producto
          </Button>
        </Col>
      </Row>

      {loadingCreate && <Loader/>}

      {isLoading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
        <>
          <Table striped hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NOMBRE</th>
              <th>PRECIO</th>
              <th>CATEGORIA</th>
              <th>ESENCIA</th>
              <th>CRISTAL</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product)=> (
              <tr key={product._id}>
                <td> {product._id}  </td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.scent}</td>
                <td>{product.crystal}</td>
                
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button className='btn-sm mx-2' variant='info'>
                      <FaEdit/>
                    </Button>
                  </LinkContainer>
                  <Button className='btn-sm mx-2' variant='danger' onClick={()=> deleteHandler(product._id)}>
                    <FaTrash style={{color: 'white'}}/>
                  </Button>
                  <Button className='btn-sm mx-2' variant='info'>
                    <FaTimes/>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        </>
      )}
    </>
  )
}

export default ProductListScreen