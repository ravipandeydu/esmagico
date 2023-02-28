import {
  Box,
  Button,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
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
    <Box>
      <Heading>My Profile</Heading>
      <Box>Name: {user.name}</Box>
      <Box>Email: {user.email}</Box>
    </Box>
  );
};

export default MyProfile;
