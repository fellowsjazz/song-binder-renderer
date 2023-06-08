import { Box, Image, Text } from "@chakra-ui/react";

const InventoryNFT = ({token}) => {
  const imageUrl = `https://gateway.ipfs.io/ipfs/${token?.image?.url.replace('ipfs://','')}`;

  

  console.log("token from props:", token);
  console.log(imageUrl)

  return (
    <Box mx={"1%"}>
  <Image src={imageUrl} alt={token?.name} w={"15rem"} />
  <Text>{token?.name}</Text>
  </Box>
  );
};

export default InventoryNFT;
