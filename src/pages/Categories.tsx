import { Modal } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Loading from '../components/Loading';
import { Category } from '../models/category/Category'
import { CategoryService } from '../network/category/CategoryService'

function Categories() {

  const [categories, setCategories] = useState<Category[]>([])
  const [values, setValues] = useState<Category>({ name: "", description: "" });
  const [loading, setLoading] = useState<boolean>(false);

  const [forModal, setForModal] = useState<string>("");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let categoryService = new CategoryService();



  const getAllCategories = (): void => {
    setLoading(true)
    setCategories([])
    categoryService.getAll()
      .then(res => {
        setCategories(res.data)
        setLoading(false)
      })
  }

  useEffect(() => {
    getAllCategories();
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
    const { name, description } = values;
    if (name.trim().length === 0 || description.trim().length === 0) {
      toast.warn("Please fill in all the inputs")
    } else {
      if (forModal === "Add") {
        categoryService.add(values)
          .then(() => getAllCategories())
      } else {
        categoryService.update(values, id)
          .then(() => getAllCategories())
      }

      setValues({ name: "", description: "" })
      toast.success("Category is ready")
      handleClose();
    }

  }

  const deleteCategory = (id: number): void => {
    if (localStorage.getItem("user")) {
      console.log("@")
      categoryService.delete(id)
        .then(() => {
          toast.error("Category is deleted")
          getAllCategories();
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

        categories.length ? (
          <>
            <div className='header-page'>
              <h1 className='all-data-list'>Categories</h1>
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
                Add Category
              </button>
            </div>

            <table className="w3-table-all w3-centered">
              <thead>
                <tr>
                  <td>Id</td>
                  <td>Name</td>
                  <td>Description</td>
                  <td>Update</td>
                  <td>Delete</td>
                </tr>
              </thead>
              <tbody>
                {React.Children.toArray(
                  categories.map(item => (
                    <tr>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                      <td>
                        <button
                          onClick={() => {
                            if(localStorage.getItem("user")){
                              handleOpen();
                              setForModal("Update");
                              setValues({ name: item.name, description: item.description, id: item.id })
                            }else{
                              toast.error("Log in first")
                            }
                           
                          }
                          }>
                          Update
                        </button>
                      </td>
                      <td>
                        <button onClick={() => deleteCategory(item.id!)} >Delete</button>
                      </td>
                    </tr>
                  ))
                )}

              </tbody>
            </table>
          </>
        ) :
          <h1 className='not-list'>Category list is empty</h1>
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
            <input name="description" required value={values.description} onChange={(e) => handleChange(e)} placeholder="Description" />
            <button> {forModal === "Add" ? "Add" : "Update"}</button>
          </form>
        </div>
      </Modal>

    </>
  )
}

export default Categories