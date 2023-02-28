import { Heading } from "@chakra-ui/react";
import React from "react";

const Home = () => {
  const port = import.meta.env.VITE_PORT;
  console.log(port)
  return <Heading>This is the homepage</Heading>;
};

export default Home;
