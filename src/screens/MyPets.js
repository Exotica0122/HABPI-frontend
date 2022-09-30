// Library imports
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { Button, Typography } from "@mui/material";
import { Container, Card, CardContent, Grid } from "@mui/material";
import { margin } from "@mui/system";


const MyPets = (props) => {
    const [loadedPets, setLoadedPets] = useState();

    const params = useParams();
    const navigate = useNavigate();
    const userId = params.userId;

    useEffect(() => {
        axios
            .get(`http://localhost:8082/user/${userId}/all-pets`)
            .then((response) => {
                setLoadedPets(response.data.pets);
            });
    }, [userId]);

    const petEditButtonHandler = (petId) => {
        navigate(`/${petId}/edit`);
    };

    const petRemoveButtonHandler = (petId) => {

    };

    const onNewPetHandler = (event) => {
        navigate("/newPet");
    };

    return (
        <Container>
            <Typography variant="h2" style={{ display: "inline-block" }}>Your Pets</Typography>

            <Grid container item justifyContent="flex-end">
                <Button variant="contained" onClick={onNewPetHandler} >New Pet</Button>
            </Grid>

            {loadedPets &&
                loadedPets.map((pet) => {
                    return (
                        <>
                            <Card sx={{ my: 2 }}>
                                <CardContent>
                                    <h2 key={pet.name}>{pet.name}</h2>
                                    <p key={pet.age}>Age: {pet.age}</p>
                                    <p key={pet.breed}>Breed: {pet.breed}</p>
                                    <Button
                                        key={pet._id}
                                        variant="contained"
                                        type="submit"
                                        margin="normal"
                                        onClick={() => petEditButtonHandler(pet._id)}
                                        sx={{ mr: 1 }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        key={pet._id}
                                        variant="contained"
                                        type="submit"
                                        margin="normal"
                                        onClick={() => petRemoveButtonHandler(pet._id)}
                                    >
                                        Remove
                                    </Button>
                                </CardContent>
                            </Card>
                        </>
                    );
                })}
        </Container>

    );
};

export default MyPets;
