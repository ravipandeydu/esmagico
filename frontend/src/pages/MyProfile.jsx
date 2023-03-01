import {
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  Image,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MyProfile = () => {
  const token = useSelector((state) => state.auth.user).token;
  const user = JSON.parse(localStorage.getItem("user"))?.user;
  const dispatch = useDispatch();
  return (
    <Box align="center">
      <Heading size="lg" m={5}>
        {user?.name}'s Profile
      </Heading>
      <Card maxW="sm">
        <CardBody>
          <Image
            src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-512.png"
            alt="Green double couch with wooden legs"
            borderRadius="lg"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">Name</Heading>
            <Text>{user?.name}</Text>
            <Heading size="md">Email</Heading>
            <Text>{user?.email}</Text>
            <Heading size="md">Role</Heading>
            <Text>{user?.role}</Text>
          </Stack>
        </CardBody>
      </Card>
    </Box>
  );
};

export default MyProfile;
