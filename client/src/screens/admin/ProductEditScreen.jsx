import { useState, useEffect } from "react"
import { useParams, useNavigate, Link} from "react-router-dom"
import { Button, Form} from 'react-bootstrap'
import Loader from "../../components/Loader.jsx"
import Message from "../../components/Message.jsx"
import FormContainer from "../../components/FormContainer.jsx"
import { toast } from "react-toastify"
import { useGetProductDetailsQuery, useUpdateProductMutation, useUploadProductImageMutation } from "../../slices/productApiSlice.js"

const ProductEditScreen = () => {
  const { id: productId }= useParams()

  const [name, setName] = useState('');
  const [price, setPrice ] = useState(0); 
  const [image, setImage ] = useState(''); 
  const [description, setDescription ] = useState(''); 
  const [intention, setIntention ] = useState('');
  const [scent, setScent ] = useState('');
  const [crystal, setCrystal ] = useState('');
  const [category, setCategory ] = useState('');
  const [countInStock, setCountInStock ] = useState(0);

  const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery (productId);
  console.log(product)

  const [ updateProduct, {isLoading: loadingUpdate}] = useUpdateProductMutation();

  const [ uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();

  const navigate = useNavigate()

  useEffect(()=>{
    if(product){
      setName(product.name);
      setPrice(product.price); 
      setImage(product.image); 
      setDescription(product.description); 
      setIntention(product.intention);
      setScent(product.scent);
      setCrystal(product.crystal);
      setCategory(product.category);
      setCountInStock(product.countInStock);
    }
  },[product])

  const submitHandler = async(e)=>{
    e.preventDefault()
    const updatedProduct = {
      _id: productId,
      name, 
      price, 
      image, 
      description, 
      intention,
      scent,
      crystal,
      category,
      countInStock,
    }

    const result = await updateProduct(updatedProduct)
    if(result.error){
      toast.error(result.error)
    } else {
      toast.success('Producto actualizado')
      navigate('/admin/productlist')
    }
  }

  const uploadFileHandler = async(e)=> {
    console.log(e.target.files[0])
    const formData = new FormData()
    formData.append('image', e.target.files[0])
    try {
      const res = await uploadProductImage(formData).unwrap()
      toast.success(res.message)
      setImage(res.image)
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  }

  return (
    <>
      <Link to='/admin/productlist' className="btn btn-secondary my-3"> Ir atrás </Link>
      <FormContainer>
        <h2>Editar Producto</h2>
        
        {loadingUpdate && <Loader/>} 

        {isLoading ? (<Loader/> ): error ? (<Message variant='danger'>{error}</Message>) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="my-2">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa el nombre del producto"
                value={name}
                onChange={(e)=> setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price" className="my-2">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingresa el precio del producto"
                value={price}
                onChange={(e)=> setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image" className="my-2">
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa la imagen del producto"
                value={image}
                onChange={(e)=> setImage(e.target.value)}
              ></Form.Control>
              <Form.Control type="file" label='Selecciona el archivo' onChange={uploadFileHandler}></Form.Control>
            </Form.Group>

            <Form.Group controlId="description" className="my-2">
              <Form.Label>Descripcion</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa la descripcion del producto"
                value={description}
                onChange={(e)=> setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="intention" className="my-2">
              <Form.Label>Intencion</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa la intencion del producto"
                value={intention}
                onChange={(e)=> setIntention(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="scent" className="my-2">
              <Form.Label>Esencia</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa la esencia del producto"
                value={scent}
                onChange={(e)=> setScent(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="crystal" className="my-2">
              <Form.Label>Cristal</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa el crystal que contiene el producto"
                value={crystal}
                onChange={(e)=> setCrystal(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category" className="my-2">
              <Form.Label>Categoria</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa la categoria del producto"
                value={category}
                onChange={(e)=> setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock" className="my-2">
              <Form.Label>Unidades Disponibles</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingresa las unidades disponibles del producto"
                value={countInStock}
                onChange={(e)=> setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              className="mt-3 w-100"
              
            >
              Actualizar
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductEditScreen