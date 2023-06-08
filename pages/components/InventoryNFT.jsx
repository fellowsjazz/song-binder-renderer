import { Box, Image, Text } from "@chakra-ui/react";

const InventoryNFT = ({token, callback}) => {
  const imageUrl = `https://gateway.ipfs.io/ipfs/${token?.image?.url.replace('ipfs://','')}`;

  const handleClick = () => {
    callback(imageUrl)
    console.log("call back function called from nft component, with this arg: ", imageUrl)
  }

  console.log("token from props:", token);
  console.log(imageUrl)

  return (
    <Box mx={"1%"} onClick={handleClick}>
  <Image src={imageUrl} alt={token?.name} w={"15rem"} />
  <Text>{token?.name}</Text>
  </Box>
  );
};

export default InventoryNFT;
