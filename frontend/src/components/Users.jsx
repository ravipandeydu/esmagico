import {
  Box,
  Button,
  Center,
  Input,
  Select,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsers,
  searchUsers,
  updateUser,
} from "../Redux/users/users.actions";

const Users = () => {
  const token = useSelector((store) => store.auth.token);
  const users = useSelector((store) => store.users.data);
  const loading = useSelector((store) => store.users.loading);
  const loginuser = useSelector((store) => store.auth.user.user);
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers(token));
  }, []);

  const handleClick = (userId, user, role) => {
    dispatch(
      updateUser(userId, {
        ...user,
        role: role,
      })
    ).then(() => {
      dispatch(getAllUsers(token));
    });
  };

  const handlesearch = async (r) => {
    dispatch(searchUsers(r));
  };
  return (
    <Box>
      <Input
        mt="4px"
        maxW="xl"
        ml="20px"
        mr="10px"
        type={"text"}
        name="language"
        onChange={(e) => {
          setText(e.target.value);
        }}
        placeholder="Search Users"
      />
      <Button mt="4px" onClick={() => handlesearch(text)}>
        Search
      </Button>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Eamil</Th>
              <Th>Current Role</Th>
              <Th>Change Role</Th>
            </Tr>
          </Thead>
          <Tbody>
            {loading ? (
              <Center>
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                />
              </Center>
            ) : (
              users?.map((user) =>
                user._id === loginuser._id ? (
                  ""
                ) : (
                  <Tr key={user._id}>
                    <Td>{user.name}</Td>
                    <Td>{user.email}</Td>
                    <Td>{user.role}</Td>
                    <Td>
                      {user.role === "user" ? (
                        <Button
                          colorScheme={"red"}
                          onClick={() => handleClick(user._id, user, "admin")}
                        >
                          Make Admin
                        </Button>
                      ) : (
                        <Button
                          colorScheme={"yellow"}
                          onClick={() => handleClick(user._id, user, "user")}
                        >
                          Make User
                        </Button>
                      )}
                    </Td>
                  </Tr>
                )
              )
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Users;
