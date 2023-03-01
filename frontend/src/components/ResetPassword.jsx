import { useNavigate, useParams } from "react-router-dom";
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

const ResetPassword = () => {
  const toast = useToast();
  const { resettoken } = useParams();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .put(`${port}/resetpassword/${resettoken}`, { password: password })
      .then((r) => {
        toast({
          title: r?.data?.message,
          description: "You can login now",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate("/signin");
      })
      .catch((e) => {
        toast({
          title: e?.response?.data?.error,
          description: "Link has been expired",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };
  return (
    <Box align="center">
      <Heading my={"40px"}>New Password</Heading>
      <Card maxW="lg">
        <CardBody>
          <FormLabel>Password</FormLabel>
          <Input
            type={"password"}
            onChange={(e) => setPassword(e.target.value)}
          />
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup>
            <Button variant="solid" colorScheme="blue" onClick={handleSubmit}>
              Update
            </Button>
            <Spacer />
          </ButtonGroup>
        </CardFooter>
      </Card>
    </Box>
  );
};

export default ResetPassword;
