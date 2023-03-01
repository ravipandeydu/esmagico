import {
  useToast,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  FormLabel,
  Input,
  Heading,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupSuccess } from "../Redux/auth/auth.actions";

const SignUp = () => {
  const toast = useToast();
  const { loading, error } = useSelector((state) => state.auth);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSignUp(e) {
    e.preventDefault();
    try {
      dispatch(signupSuccess({ name, email, password })).then(
        (r) => {
          toast({
            title: r?.data?.message,
            description: "You can login now",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          navigate("/signin");
        }
      );
    } catch (e) {
      toast({
        title: e?.response?.data?.error,
        description: "",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  return (
    <Box align={"center"}>
      <Heading my={"40px"}>Sign Up</Heading>
      <Card maxW="lg">
        <CardBody>
          <FormLabel>Name</FormLabel>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
          <FormLabel>Email</FormLabel>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
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
