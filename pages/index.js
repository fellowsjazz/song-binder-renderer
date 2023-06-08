import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { Box, Text, Flex, Spacer, useDisclosure } from "@chakra-ui/react";
import DisplayTBAofToken from "./components/DisplayTBAofToken";
import { GraphQLClient } from "graphql-request";
import { useEffect, useState } from "react";
import InventoryNFT from "./components/InventoryNFT";

const inter = Inter({ subsets: ["latin"] });

const zoraAPI = new GraphQLClient("https://api.zora.co/graphql");

const apiQuery = `query WalletTokens {
  tokens(
    where: {ownerAddresses: "0x0531D190699f93b8CE77F487a6b8ba72D4f5e733"}
    networks: [{network: ETHEREUM, chain: GOERLI}]
  ) {
    nodes {
      token {
        tokenId
        name
        owner
        metadata
        image {
          url
        }
      }
    }
  }
}`;

///THE ABOVE FUNCTION SHOULD WORK, and the binder NFT should now be holding at least one CD NFT. need to wait for zora's api to update though

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
        <Text>The goerli testnet wallet address of this NFT is: </Text>
        <DisplayTBAofToken />
        <BottomTab />
      </Box>
    </Box>
  );
}

function BottomTab() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tokenArray, setTokenArray] = useState([]);

  useEffect(() => {
    async function getData() {
      const data = await zoraAPI.request(apiQuery);
      console.log("data from zora", data.tokens.nodes);
      setTokenArray(data.tokens.nodes);
    }
    getData();
  }, [apiQuery]);

  useEffect(()=>{ //testing useEffect to see if token array populates
    console.log("token array set to: ", tokenArray)
  },[tokenArray])

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
        <Text fontSize="sm">Inventory</Text>
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
          <Text>
            Bottom Drawer Content is sooooooooooooooooooooooooooooooooooooooooo
            long now, but here's what I fetched
            <InventoryNFT token={tokenArray[0].token}/>
          </Text>
        </Box>
      )}
    </>
  );
}
