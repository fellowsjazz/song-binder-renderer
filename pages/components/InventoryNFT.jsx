import { Box, Image } from "@chakra-ui/react";

const InventoryNFT = ({token}) => {
  const imageUrl = `https://gateway.ipfs.io/ipfs/${token?.image?.url.replace('ipfs://','')}`;

  

  console.log("token from props:", token);
  console.log(imageUrl)

  return (
    <Box>
  <Box>{token?.name}</Box>
  <Image src={imageUrl} alt={token.name} />
  </Box>
  );
};

export default InventoryNFT;
