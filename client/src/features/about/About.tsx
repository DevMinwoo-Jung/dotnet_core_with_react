import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, ListItemText, Typography } from "@mui/material";
import agent from "../../app/api/agent";
import { useState } from "react";

export default function About() {

    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    function getValidationErrors(){
        agent.TestErrors.getValidationError()
        .then(()=> console.log('에러남'))
        .catch(err => setValidationErrors(err))
    }

    console.log(validationErrors)

    return (
        <Container>
            <Typography gutterBottom variant="h2">Error Testing</Typography>
            <ButtonGroup fullWidth>
                <Button variant="contained" onClick={() => agent.TestErrors.get400Error().catch(error => console.log(error))}>get400Error</Button>
                <Button variant="contained" onClick={() => agent.TestErrors.get401Error().catch(error => console.log(error))}>get401Error</Button>
                <Button variant="contained" onClick={() => agent.TestErrors.get404Error().catch(error => console.log(error))}>get404Error</Button>
                <Button variant="contained" onClick={getValidationErrors}>getValidationError</Button>
                <Button variant="contained" onClick={() => agent.TestErrors.get500Error().catch(error => console.log(error))}>get500Error</Button>
            </ButtonGroup>
            {
                validationErrors.length > 0 &&
                <Alert severity="error">
                    <AlertTitle>Validation Errors</AlertTitle>
                    <List>
                        {
                            validationErrors.map(err => (
                                <ListItem key={err}>
                                    <ListItemText>{err}</ListItemText>
                                </ListItem>
                            ))
                        }
                    </List>
                </Alert>
            }
        </Container>
    )
}