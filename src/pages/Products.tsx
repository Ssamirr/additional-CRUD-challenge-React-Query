import { Modal } from '@mui/material';
import React, {useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Loading from '../components/Loading';
import { Product } from '../models/product/Product'
import { ProductService } from '../network/product/ProductService'

function Products() {

  const [products, setProducts] = useState<Product[]>([])
  const [values, setValues] = useState<Product>({ name: "", unitPrice: 0, unitsInStock: 0 });
  const [loading, setLoading] = useState<boolean>(false);

  const [forModal, setForModal] = useState<string>("");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let productService = new ProductService();



  const getAllProducts = (): void => {
    setLoading(true)
    setProducts([])
    productService.getAll()
      .then(res => {
        setProducts(res.data)
        setLoading(false)
      })
  }

  useEffect(() => {
    getAllProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const name: string = e.target.name;
    const value: string = e.target.value;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const submitForm = (event: React.SyntheticEvent, id: number): void => {
    event.preventDefault();
    const { name} = values;
    if (name.trim().length === 0) {
      toast.warn("Please fill in all the inputs")
    } else {
      if (forModal === "Add") {
        productService.add(values)
          .then(() => getAllProducts())
      } else {
        productService.update(values, id)
          .then(() => getAllProducts())
      }

      setValues({ name: "", unitPrice: 0, unitsInStock: 0 })
      toast.success("Product is ready")
      handleClose();
    }

  }

  const deleteProduct = (id: number): void => {
    if (localStorage.getItem("user")) {
      console.log("@")
      productService.delete(id)
        .then(() => {
          toast.error("Product is deleted")
          getAllProducts();
        })
    } else {
      toast.error("Log in first")
    }

  }


  return (
    <>
      {loading ?
        <Loading />
        :

        products.length ? (
          <>
            <div className='header-page'>
              <h1 className='all-data-list'>Products</h1>
              <button
                onClick={() => {
                  if (localStorage.getItem("user")) {
                    handleOpen()
                    setForModal("Add")
                  }
                  else {
                    toast.error("Log in first")
                  }
                }}
                className='add-item'>
                Add Product
              </button>
            </div>

            <table className="w3-table-all w3-centered">
              <thead>
                <tr>
                  <td>Id</td>
                  <td>Name</td>
                  <td>Unit Price</td>
                  <td>Units In Stock</td>
                  <td>Update</td>
                  <td>Delete</td>
                </tr>
              </thead>
              <tbody>
                {React.Children.toArray(
                  products.map(item => (
                    <tr>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.unitPrice}</td>
                      <td>{item.unitsInStock}</td>
                      <td>
                        <button
                          onClick={() => {
                            if (localStorage.getItem("user")) {
                              handleOpen();
                              setForModal("Update");
                              setValues({ name: item.name, unitPrice: item.unitPrice, unitsInStock: item.unitsInStock, id: item.id })
                            } else {
                              toast.error("Log in first")
                            }

                          }
                          }>
                          Update
                        </button>
                      </td>
                      <td>
                        <button onClick={() => deleteProduct(item.id!)} >Delete</button>
                      </td>
                    </tr>
                  ))
                )}

              </tbody>
            </table>
          </>
        ) :
          <h1 className='not-list'>Product list is empty</h1>
      }

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className='box-modal'>
          <form onSubmit={(event) => submitForm(event, values.id!)}>
            <input name="name" required value={values.name} onChange={(e) => handleChange(e)} placeholder="Name" />
            <input name="unitPrice" required value={values.unitPrice} onChange={(e) => handleChange(e)} placeholder="Unit in Price" type={"number"} />
            <input name="unitsInStock" required value={values.unitsInStock} onChange={(e) => handleChange(e)} placeholder="Units in Stock" type={"number"} />
            <button> {forModal === "Add" ? "Add" : "Update"}</button>
          </form>
        </div>
      </Modal>

    </>
  )
}

export default Products