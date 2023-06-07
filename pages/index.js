import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";

import { Box, Text } from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Box display={"flex"} flexDir={"row"} justifyContent={"center"}>
      <Box h={"100vh"} w={"100vh"} border={"1px"} display={"flex"} flexDir={"column"} alignItems={"center"}>
        <Text fontSize={"3xl"}>Camp 4 Song Binder</Text>
      </Box>
    </Box>
  );
}
