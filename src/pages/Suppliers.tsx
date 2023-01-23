import { Modal } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Loading from '../components/Loading';
import { Supplier } from '../models/supplier/Supplier'
import { SupplierService } from '../network/supplier/SupplierService'

function Suppliers() {

  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [values, setValues] = useState<Supplier>({ companyName: "", contactName: "", contactTitle: "" });
  const [loading, setLoading] = useState<boolean>(false);

  const [forModal, setForModal] = useState<string>("");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let supplierService = new SupplierService();



  const getAllSuppliers = (): void => {
    setLoading(true)
    setSuppliers([])
    supplierService.getAll()
      .then(res => {
        setSuppliers(res.data)
        setLoading(false)
      })
  }

  useEffect(() => {
    getAllSuppliers();
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
    const { companyName, contactName, contactTitle } = values;
    if (companyName.trim().length === 0 || contactName.trim().length === 0 || contactTitle.trim().length === 0) {
      toast.warn("Please fill in all the inputs")
    } else {
      if (forModal === "Add") {
        supplierService.add(values)
          .then(() => getAllSuppliers())
      } else {
        supplierService.update(values, id)
          .then(() => getAllSuppliers())
      }

      setValues({ companyName: "", contactName: "", contactTitle: "" })
      toast.success("Supplier is ready")
      handleClose();
    }

  }

  const deleteSupplier = (id: number): void => {
    if (localStorage.getItem("user")) {
      console.log("@")
      supplierService.delete(id)
        .then(() => {
          toast.error("Supplier is deleted")
          getAllSuppliers();
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

        suppliers.length ? (
          <>
            <div className='header-page'>
              <h1 className='all-data-list'>Suppliers</h1>
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
                Add Supplier
              </button>
            </div>

            <table className="w3-table-all w3-centered">
              <thead>
                <tr>
                  <td>Id</td>
                  <td>Company Name</td>
                  <td>Contact Name</td>
                  <td>Contact Title</td>
                  <td>Update</td>
                  <td>Delete</td>
                </tr>
              </thead>
              <tbody>
                {React.Children.toArray(
                  suppliers.map(item => (
                    <tr>
                      <td>{item.id}</td>
                      <td>{item.companyName}</td>
                      <td>{item.contactName}</td>
                      <td>{item.contactTitle}</td>
                      <td>
                        <button
                          onClick={() => {
                            if (localStorage.getItem("user")) {
                              handleOpen();
                              setForModal("Update");
                              setValues({ companyName: item.companyName, contactName: item.contactName, contactTitle: item.contactTitle, id: item.id })
                            } else {
                              toast.error("Log in first")
                            }

                          }
                          }>
                          Update
                        </button>
                      </td>
                      <td>
                        <button onClick={() => deleteSupplier(item.id!)} >Delete</button>
                      </td>
                    </tr>
                  ))
                )}

              </tbody>
            </table>
          </>
        ) :
          <h1 className='not-list'>Supplier list is empty</h1>
      }

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className='box-modal'>
          <form onSubmit={(event) => submitForm(event, values.id!)}>
            <input name="companyName" required value={values.companyName} onChange={(e) => handleChange(e)} placeholder="Name" />
            <input name="contactName" required value={values.contactName} onChange={(e) => handleChange(e)} placeholder="Unit in Price" />
            <input name="contactTitle" required value={values.contactTitle} onChange={(e) => handleChange(e)} placeholder="Units in Stock" />
            <button> {forModal === "Add" ? "Add" : "Update"}</button>
          </form>
        </div>
      </Modal>

    </>
  )
}

export default Suppliers