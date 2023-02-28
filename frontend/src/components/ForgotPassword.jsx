import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, FormLabel, Heading, Input, Spacer } from '@chakra-ui/react'
import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../Redux/auth/auth.actions';

const port = import.meta.env.VITE_PORT;

const ForgotPassword = () => {
    const [email, setEmail] = useState()

    const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post(`${port}/forgotpassword`, {email}).then(()=>{
        console.log("Conn")
    })
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
            {/* {loading ? (
              <Button
                isLoading
                loadingText="Loading"
                colorScheme="teal"
                variant="outline"
                spinnerPlacement="end"
              >
                Send Link
              </Button>
            ) : ( */}
              <Button variant="solid" colorScheme="blue" onClick={handleSubmit}>
                Send Link
              </Button>
            {/* )} */}
            <Spacer />
          </ButtonGroup>
        </CardFooter>
      </Card>
      {/* {error ? <Box>Something Went Wrong</Box> : ""} */}
    </Box>
  )
}

export default ForgotPassword