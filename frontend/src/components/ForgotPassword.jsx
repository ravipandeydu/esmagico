import {
  useToast,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  FormLabel,
  Heading,
  Input,
  Spacer,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const port = import.meta.env.VITE_PORT;

const ForgotPassword = () => {
  const toast = useToast();
  const [email, setEmail] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post(`${port}/forgotpassword`, { email }).then((r) => {
      toast({
        title: r?.data?.message,
        description: "Check you mail",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    })
    .catch((e)=>{
      console.log(e)
      toast({
        title: e?.response?.data?.error,
        description: "Try again later",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    });
  };
  return (
    <Box align="center">
      <Heading my={"40px"}>Forgot Password</Heading>
      <Card maxW="lg">
        <CardBody>
          <FormLabel>Email</FormLabel>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup>
            <Button variant="solid" colorScheme="blue" onClick={handleSubmit}>
              Send Link
            </Button>
            <Spacer />
          </ButtonGroup>
        </CardFooter>
      </Card>
    </Box>
  );
};

export default ForgotPassword;
