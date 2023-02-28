
import { useParams } from 'react-router-dom';
import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, FormLabel, Heading, Input, Spacer } from '@chakra-ui/react'
import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
const port = import.meta.env.VITE_PORT;

const ResetPassword = () => {
    const {resettoken} = useParams();
    console.log(resettoken)
    const [password, setPassword] = useState()

    const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.put(`${port}/resetpassword/${resettoken}`, {password: password}).then(()=>{
        console.log("Conn")
    })
  };
  return (
    <Box align="center">
      <Heading my={"40px"}>New Password</Heading>
      <Card maxW="lg">
        <CardBody>
          <FormLabel>Password</FormLabel>
          <Input value={password} onChange={(e) => setPassword(e.target.value)} />
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup>
              <Button variant="solid" colorScheme="blue" onClick={handleSubmit}>
                Update
              </Button>
            {/* )} */}
            <Spacer />
          </ButtonGroup>
        </CardFooter>
      </Card>
    </Box>
  )
}

export default ResetPassword