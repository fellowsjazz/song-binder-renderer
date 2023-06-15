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

export default function TokenDetail() {
  const router = useRouter();
  const tokenId = router.query.tokenId; //this gets the token ID from the dynamic route

  const [tokenBoundAccount, setTokenBoundAccount] = useState("placeholder");
  const testnetPublicClient = createPublicClient({
    chain: goerli,
    transport: http(),
  });

  const tokenIdString = tokenId?.toString();

  //   the following use effect gets the wallet address for any given NFT contract address and token ID
  useEffect(() => {
    async function getTBA() {
      const accountAddress = await getAccount(
        "0xf90519597abbc20e9af0bcc38805d1ff68b576c4", // ERC-712 contract address
        tokenId, // ERC-721 token ID
        testnetPublicClient // viem public client
      );
      console.log("token id string: ", tokenIdString);
      console.log("account address:", accountAddress);
      setTokenBoundAccount(accountAddress);
    }
    if (tokenId) {
      getTBA();
    }
  }, [tokenId]);

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
        <Text>TBA: {tokenBoundAccount}</Text>
      </Box>
    </Box>
  );
}
