import { LinkContainer } from "react-router-bootstrap"
import { Table, Button, Col, Row } from "react-bootstrap"
import { FaEdit, FaTrash } from "react-icons/fa"
import { useParams } from 'react-router-dom'
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import { toast } from 'react-toastify'
import { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation } from '../../slices/productApiSlice.js'
import Paginate from '../../components/Paginate.jsx'

const ProductListScreen = () => {
  const { pageNumber } = useParams()

  const { data, isLoading, error, refetch } = useGetProductsQuery({pageNumber});

  const [ createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();

  const [ deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();

  const deleteHandler = async(id) =>{
    if(window.confirm('Estas seguro de eliminar este producto?')){
      try {
        await deleteProduct(id)
        refetch()
        toast.success('Producto Eliminado')
      } catch (error) {
        toast.error(error?.data?.message || error.error)
      }
    }
  }

const createProductHandler = async() => {
  if(window.confirm('Estas seguro de que quieres crear un nuevo producto?')){
    try {
      await createProduct()
      refetch()
      toast.success('Producto Creado, ahora puedes editarlo')
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

      {loadingDelete && <Loader/>}

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
            {data.products.map((product)=> (
              <tr key={product._id}>
                <td> {product._id}  </td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.scent}</td>
                <td>{product.crystal}</td>
                
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button className='btn-sm mx-2' variant='secondary'>
                      <FaEdit/>
                    </Button>
                  </LinkContainer>
                  <Button className='btn-sm mx-2' variant="light" onClick={()=> deleteHandler(product._id)}>
                    <FaTrash style={{color: 'black'}}/>
                  </Button>

                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Paginate
          pages={data.pages}
          page={data.page}
          isAdmin={true}
        />
        </>
      )}
    </>
  )
}

export default ProductListScreen