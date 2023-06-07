import React from 'react'
import Image from "next/image";

import { useEffect } from "react";
import { ConnectKitButton } from "connectkit";

import { usePublicClient } from "wagmi";
import { getAccount } from "@tokenbound/sdk";
import { useState } from "react";

import { createPublicClient, http } from "viem";
import { mainnet, goerli } from "viem/chains";

import { Flex, Box, Text } from "@chakra-ui/react";



export default function DisplayTBAofToken() {

 
  const [tokenBoundAccount, setTokenBoundAccount] = useState('placeholder');
  const testnetPublicClient = createPublicClient({
    chain: goerli,
    transport: http(),
  });

//   the following use effect gets the wallet address for any given NFT contract address and token ID
  useEffect(() => {
    async function getTBA() {
      const accountAddress = await getAccount(
        "0xF007Ab65C07ac1F40D63D8cF36D116526eDB7703", // ERC-712 contract address
        "11", // ERC-721 token ID
        testnetPublicClient // viem public client
      );
      console.log("account address:", accountAddress);
      setTokenBoundAccount(accountAddress)
    }
    getTBA();
    
  }, []);


  return (
    <div>
       <a href={`https://goerli.etherscan.io/address/${tokenBoundAccount}`} target="_blank" >{tokenBoundAccount}</a>
       
    </div>
  )
}
