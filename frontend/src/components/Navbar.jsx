import {
  Box,
  Button,
  Flex,
  Image,
  Spacer,
  Text,
  Tooltip,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/auth/auth.actions";

const Navbar = () => {
  const token = useSelector((store) => store.auth.token);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  function handleLogout() {
    dispatch(logout());
  }
  return (
    <Flex
      bg={useColorModeValue("red.200", "teal")}
      borderBottom="0.5px solid #b1b3b5"
      px={6}
      align="center"
      justify="center"
      wrap="nowrap"
      position={"sticky"}
      top={0}
      zIndex={10}
    >
      <Link to="/">
        <Text px={6} py={2} fontSize="xl">
          Es Magico
        </Text>
      </Link>
      <Spacer />
      <Link to="/myprofile">
        <Text px={6} py={2} fontSize="xl">
          My Profile
        </Text>
      </Link>
      {user?.user.role === "admin" ? (
        <Link to={"/users"}>
          <Text px={6} py={2} fontSize="xl">
            Users
          </Text>
        </Link>
      ) : (
        ""
      )}
      {token ? (
        <Flex gap={"10px"}>
          <Box px={6} py={2} fontWeight="600" fontSize={"18px"}>
            {user?.user?.name}
          </Box>
          <Button px={6} py={2} onClick={handleLogout}>
            Logout
          </Button>
        </Flex>
      ) : (
        <Flex>
          <Link to="/signin">
            <Text px={6} py={2}>
              Sign In
            </Text>
          </Link>
          <Link to="/signup">
            <Text px={6} py={2}>
              Sign Up
            </Text>
          </Link>
        </Flex>
      )}
    </Flex>
  );
};

export default Navbar;
