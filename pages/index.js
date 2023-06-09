import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { Box, Text, Flex, Spacer, useDisclosure } from "@chakra-ui/react";
import DisplayTBAofToken from "./components/DisplayTBAofToken";
import { GraphQLClient } from "graphql-request";
import { useEffect, useState } from "react";
import InventoryNFT from "./components/InventoryNFT";
import AudioPlayer from "./components/AudioPlayer";

const inter = Inter({ subsets: ["latin"] });

const zoraAPI = new GraphQLClient("https://api.zora.co/graphql");

const apiQuery = `query WalletTokens {
  tokens(
    where: {ownerAddresses: "0x0531D190699f93b8CE77F487a6b8ba72D4f5e733", collectionAddresses: "0x52aa9ca183657794c1729215e304780ffeac7777"}
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

//good shit! it's working well, now I want to play with the ability to set the background content based on clicking withing the inventory

export default function Home() {
  const [backgroundImageURL, setBackgroundImageURL] = useState(
    "https://ipfs.io/ipfs/bafybeifxpprjn3t6phqw7vikefh7zvl3rqqqn2ytnykfbfx22lhwxaxd4a/Untitled%20design%20(4).png"
  );
  const [audioUrl, setAudioUrl] = useState()

  const handleCallback = (childData) => {
    setBackgroundImageURL(childData.imageUrl);
    setAudioUrl(childData.audioUrl)
  };

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
        <Box position="absolute" top={0} left={0} width="100%" height="100%">
          <img
            src={backgroundImageURL}
            alt="Background Image"
            width="100%"
            height="100%"
            objectFit="cover"
          />
        </Box>
        <Box
          position="absolute"
          top={0}
          left={0}
          bg="gray.200"
          borderRadius="md"
          m={"1%"}
          p={"1%"}
        >
          <Text fontSize="xl">Camp 4 Song Binder</Text>
          <Text>
            The goerli testnet wallet address of this NFT is:{" "}
            {<DisplayTBAofToken />}
          </Text>
          
        </Box>
        <Box position="absolute"
          top={0}
          right={0}
          bg="gray.200"
          borderRadius="md"
          m={"1%"}
          p={"1%"}>
        <AudioPlayer audioUrl={audioUrl}/>
        </Box>
        <BottomTab callback={handleCallback} />
      </Box>
    </Box>
  );
}

function BottomTab({ callback }) {
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

  // useEffect(() => {
  //   //testing useEffect to see if token array populates
  //   console.log("token array set to: ", tokenArray);
  // }, [tokenArray]);

  const handleCallback = (childData) => {
    callback(childData);
    console.log("callback function called from middle component", childData);
  };

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
        <Text fontSize="sm">
          Binder Address (goerli): {<DisplayTBAofToken />}
        </Text>
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
          <Text>My Camp 4 Collection</Text>
          <Flex direction={"row"}>
            {tokenArray?.map((item) => (
              <Box maxH={"20%"}>
                <InventoryNFT token={item.token} callback={handleCallback} />
              </Box>
            ))}
          </Flex>
        </Box>
      )}
    </>
  );
}
