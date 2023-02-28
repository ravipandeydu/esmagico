import {
  Box,
  Button,
  Input,
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
import { getAllUsers, searchUsers, updateUser } from "../Redux/users/users.actions";

const Users = () => {
  const token = useSelector((store) => store.auth.token);
  const users = useSelector((store) => store.users.data);
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers(token));
  }, []);

  const handleClick = (userId, user) => {
    dispatch(
      updateUser(userId, {
        ...user,
        role: "admin",
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
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Eamil</Th>
              <Th>Role</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users?.map((user) => (
              <Tr key={user._id}>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>
                  {user.role === "user" ? (
                    <Box>
                      {user.role} <Button onClick={()=>handleClick(user._id, user)}>Make Admin</Button>
                    </Box>
                  ) : (
                    <Box>{user.role}</Box>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Users;
