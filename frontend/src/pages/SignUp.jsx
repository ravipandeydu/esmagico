import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  FormLabel,
  Image,
  Input,
  Alert,
  AlertIcon,
  AlertTitle,
  Heading,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupSuccess } from "../Redux/auth/auth.actions";

const SignUp = () => {
  const { loading, error } = useSelector((state) => state.auth);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSignUp(e) {
    e.preventDefault();
    try {
      dispatch(signupSuccess({ name, phone_number: phone, password })).then(
        () => {
          navigate("/signin");
        }
      );
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Box align={"center"}>
      <Heading my={"40px"}>Sign Up</Heading>
      <Card maxW="lg">
        <CardBody>
          <FormLabel>Name</FormLabel>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
          <FormLabel>Phone Number</FormLabel>
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
          <FormLabel>Password</FormLabel>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </CardBody>
        <Divider />
        <CardFooter>
          {loading ? (
            <Button
              isLoading
              loadingText="Loading"
              colorScheme="teal"
              variant="outline"
              spinnerPlacement="end"
            >
              Signup
            </Button>
          ) : (
            <Button variant="solid" colorScheme="blue" onClick={handleSignUp}>
              Sign Up
            </Button>
          )}
        </CardFooter>
      </Card>
      {error ? <Box>Something Went Wrong</Box> : ""}
    </Box>
  );
};

export default SignUp;
