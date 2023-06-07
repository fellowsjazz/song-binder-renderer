import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { Box, Text, Flex, Spacer, useDisclosure } from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Box display="flex" justifyContent="center">
      <Box
        h="100vh"
        w="100vh"
        border="1px"
        display="flex"
        flexDir="column"
        alignItems="center"
        position="relative"
      >
        <Text fontSize="3xl">Camp 4 Song Binder</Text>
        <BottomTab />
      </Box>
    </Box>
  );
}

function BottomTab() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        position="absolute"
        bottom={0}
        right={0}
        p={2}
        bg="gray.200"
        borderRadius="md"
        cursor="pointer"
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
      >
        <Text fontSize="sm">Click me</Text>
        <Spacer />
        <Text fontSize="sm">&#x25BE;</Text>
      </Flex>
      {isOpen && (
        <Box
          position="absolute"
          bottom={0}
          right={0}
          p={4}
          bg="white"
          border="1px"
          borderRadius="md"
          boxShadow="md"
          zIndex={1}
          onMouseEnter={onOpen}
          onMouseLeave={onClose}
        >
          <Text>Bottom Drawer Content</Text>
        </Box>
      )}
    </>
  );
}
