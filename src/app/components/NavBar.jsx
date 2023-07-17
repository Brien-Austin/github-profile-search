"use client";
import React from 'react';
import { Box, Button, Flex } from '@chakra-ui/react'; // Update the import statement for chakra
import { Image } from '@chakra-ui/react'; // Update the import statement for chakra-next

export const NavBar = () => {
  return (
      <Flex justifyContent={"center"} py={6} alignItems={"center"}>
          <Box boxSize={'160px'} position={"relative"} aspectRatio={5 / 3} minHeight={20}>
              <Image  py={3} src={"/logo.png"} alt="Github logo" sx={{ filter: "invert(1)" }} />
        </Box>
         
    </Flex>
  );
};
