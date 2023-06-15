import React from 'react'
import { GraphQLClient } from "graphql-request";
import { useEffect, useState } from "react";
import { Box, Text, Flex, Spacer, useDisclosure } from "@chakra-ui/react";
import TrayItem from './TrayItem';



//this should take some props from the parent, probably just the tbaHoldings array
export default function InventoryTray({tbaHoldings}) {
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
        <Text fontSize="sm">
          TBA HOLDINGS:
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
          minW={"100vh"}
        >
          <Text></Text>
          <Flex flexDirection={"row"} justifyContent={"space-between"}>
          <TrayItem/>
          <TrayItem/>
          <TrayItem/>
          <TrayItem/>
          <TrayItem/>
          </Flex>
        </Box>
      )}
    </>
  )
}
