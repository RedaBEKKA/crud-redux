import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"
import { addUser } from "../redux/actions"

export const AddUser = () => {
    const [state, setState] = useState({
        name: '',
        email: '',
        contact: '',
        address: ''
    });
    //let history = useHistory();
    const [error, setError] = useState('');
    const { name, email, contact, address } = state;
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !address || !contact) {
            setError("SVP remplissez tous les champs");
        } else {
            dispatch(addUser(state));
            navigate("/")
            setError("")
           //history.push()
        }
    }

    return (
        <>
            <Button variant="contained" color="secondary" type="submit"
                style={{ width: 100, marginTop: 200 }} onClick={() => navigate("/")}>
                Précédent
            </Button>
            <h2>Ajout d'un utilisateur</h2>
            {error &&
                <h3 style={{color:'red'}}>{error}</h3>
            }
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '45ch' },
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >

                <TextField id="nom" label="Nom"  name="name" variant="standard" value={name} type="text" onChange={handleInputChange} />
                <br />
                <TextField id="email" label="Email" name="email" variant="standard" value={email} type="email" onChange={handleInputChange} />
                <br />
                <TextField id="phone" label="N° Téléphone" name="contact" variant="standard" value={contact} type="number" onChange={handleInputChange} />
                <br />
                <TextField id="address" label="Adresse" name="address" variant="standard" value={address} type="text" onChange={handleInputChange} />
                <br />
                <Button variant="contained" color="primary" type="submit" style={{ width: 100 }}>
                    Valider
                </Button>
            </Box>
        </>
    )
}
