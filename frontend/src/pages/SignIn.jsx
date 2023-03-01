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
  ButtonGroup,
  Spacer,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../Redux/auth/auth.actions";

const SignIn = () => {
  const toast = useToast();
  const { loading, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginSuccess({ email, password })).then((r) => {
        console.log(r)
        toast({
          title: r?.data?.message,
          description: "Successfully logged in",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate("/myprofile");
      });
    } catch (e) {
      console.log(e);
      toast({
        title: e?.response?.data?.message,
        description: "",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <Box align="center">
      <Heading my={"40px"}>Sign In</Heading>
      <Card maxW="lg">
        <CardBody>
          <FormLabel>Email</FormLabel>
          <Input onChange={(e) => setEmail(e.target.value)} />
          <FormLabel>Password</FormLabel>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup>
            {loading ? (
              <Button
                isLoading
                loadingText="Loading"
                colorScheme="teal"
                variant="outline"
                spinnerPlacement="end"
              >
                Login
              </Button>
            ) : (
              <Button variant="solid" colorScheme="blue" onClick={handleSubmit}>
                Login
              </Button>
            )}
            <Spacer />
            <Button><Link to="/forgotpassword">Forgot Password</Link></Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
      {error ? <Box>Something Went Wrong</Box> : ""}
    </Box>
  );
};

export default SignIn;
