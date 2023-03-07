import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../../utils/mutations";
import { Container, TextField, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import styled from "@emotion/styled";
import Auth from "../../utils/auth";

const StyledTextField = styled(TextField)({
  width: "100%",
  marginTop: "1.5rem",
});

export default function Login() {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN);
  let history = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      Auth.login(data.login.token, history);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <>
      <Container>
        <Box component="form" onSubmit={handleFormSubmit}>
          <StyledTextField
            placeholder="Your email"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
            label="email"
            variant="standard"
          />
          <StyledTextField
            placeholder="password"
            name="password"
            type="password"
            value={formState.password}
            onChange={handleChange}
            label="password"
            variant="standard"
          />
          {error ? (
            <div>
              <p className="error-text">
                The provided credentials are incorrect
              </p>
            </div>
          ) : null}
          <Box textAlign="center">
            <Button
              type="submit"
              sx={{
                mt: 5,
                border: 1,
                backgroundColor: "#92b9e0",
                color: "#C5C6C7",
              }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Container>
      <Typography id="signupCreate">
        Don't Have An Account? Click <a href="/signup">Here</a> To Create An
        Account!
      </Typography>
    </>
  );
}
