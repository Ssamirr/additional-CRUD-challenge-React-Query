import React, { useEffect, useState } from 'react'
import { NavLink } from "react-router-dom";
import { Modal } from '@mui/material';
import { toast } from 'react-toastify';
import { AuthUser } from '../models/user/User';



function Header() {

    const [logged, setLogged] = useState<boolean>(false);

    useEffect(() => {
        if (localStorage.getItem("user")) {
            setLogged(true);
        }
    }, [])

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [values, setValues] = useState<AuthUser>({ username: "", password: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const name: string = e.target.name;
        const value: string = e.target.value;

        setValues({
            ...values,
            [name]: value,
        });
    };


    const submitForm = (event: React.SyntheticEvent): void => {
        event.preventDefault();
        const { username, password } = values;
        if (username.trim().length === 0 || password.trim().length === 0) {
            toast.warn("Please fill in all the inputs");
        } else {
            // userContext?.setUser(values);
            handleClose();
            toast.success("You have successfully logged in")
            localStorage.setItem("user", JSON.stringify(values))
            setLogged(true);
        }

    }

    const logOut = () => {
        localStorage.removeItem("user");
        toast.success("You have successfully logged out")
        setLogged(false);
    }



    return (
        <header className='header'>
            <div className='navbar'>
                <ul className='navbar-ul'>
                    <li>
                        <NavLink to="/">Categories</NavLink>
                    </li>
                    <li>
                        <NavLink to="/products">Products</NavLink>
                    </li>
                    <li>
                        <NavLink to="/suppliers">Suppliers</NavLink>
                    </li>
                    <li>
                        <NavLink to="/query">CategoriesQuery</NavLink>
                    </li>

                </ul>
                <div className='navbar-user'>
                    {logged
                        ?
                        <div className='header-user'>
                            <h2>{JSON.parse(localStorage.getItem("user") || "{}").username}</h2>
                            <button onClick={() => logOut()}>Log Out</button>
                        </div>
                        :
                        <button onClick={handleOpen}>Log in</button>
                    }
                </div>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className='box-modal'>
                    <form onSubmit={(event) => submitForm(event)}>
                        <input name="username" required value={values.username} onChange={(e) => handleChange(e)} placeholder="Username" />
                        <input name="password" required value={values.password} onChange={(e) => handleChange(e)} placeholder="Password" type={"password"} />
                        <button>Log in</button>
                    </form>
                </div>
            </Modal>

        </header>
    )
}

export default Header