import React from "react";
import { useRouter } from "next/router";
import { Inter } from "next/font/google";
import { Box, Text, Flex, Spacer, useDisclosure } from "@chakra-ui/react";

import { GraphQLClient } from "graphql-request";
import { useEffect, useState } from "react";
import { usePublicClient } from "wagmi";
import { getAccount } from "@tokenbound/sdk";

import { createPublicClient, http } from "viem";
import { mainnet, goerli } from "viem/chains";
import InventoryTray from "../components/InventoryTray";

const testnetPublicClient = createPublicClient({
  chain: goerli,
  transport: http(),
});

const zoraAPI = new GraphQLClient("https://api.zora.co/graphql");

export default function TokenDetail() {
  const [tokenBoundAccount, setTokenBoundAccount] = useState();
  const [tbaHoldings, setTbaHoldings] = useState([]);
  const router = useRouter();
  const tokenId = router.query.tokenId; //this gets the token ID from the dynamic route


  //   the following use effect gets the wallet address for any given NFT contract address and token ID
  useEffect(() => {
    async function getTBA() {
      const accountAddress = await getAccount(
        "0xf90519597abbc20e9af0bcc38805d1ff68b576c4", // ERC-712 contract address
        tokenId, // ERC-721 token ID
        testnetPublicClient // viem public client
      );
      setTokenBoundAccount(accountAddress);
    }
    if (tokenId) {
      getTBA();
    }
  }, [tokenId]);


  //this is where the query of TBA holdings happens. the TBA is brought in dynamically, and the collection Addresses we want to display are hardcoded here
  const apiQuery = `query WalletTokens {
    tokens(
      where: {ownerAddresses: "${tokenBoundAccount}", collectionAddresses: "0x58D4c3d19b75b88E749Dc2F17491Bf6A79Af41f4"}
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

  //this useEffect triggers every time the apiQuery changes (i.e., whenever the TBA address changes), and creates an array of the tokens fetched by the API call
  useEffect(() => {
    async function getData() {
      const data = await zoraAPI.request(apiQuery);
      console.log("data from zora", data.tokens.nodes);
      setTbaHoldings(data.tokens.nodes);
    }
    if (tokenBoundAccount){
      getData();
    }
    
  }, [apiQuery]);

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
        <Text>This is Test CD #{tokenId}</Text>
        <Text>Goerli Testnet TBA: {tokenBoundAccount}</Text>
        <InventoryTray/>
      </Box>
    </Box>
  );
}
