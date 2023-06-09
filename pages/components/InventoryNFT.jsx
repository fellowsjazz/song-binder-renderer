import { Box, Image, Text } from "@chakra-ui/react";

const InventoryNFT = ({token, callback}) => {
  const imageUrl = `https://gateway.ipfs.io/ipfs/${token?.image?.url?.replace('ipfs://','')}`;
  const audioUrl = `https://gateway.ipfs.io/ipfs/${token?.metadata?.losslessAudio?.replace('ipfs://','')}`

  const handleClick = () => {
    callback({imageUrl, audioUrl})
    console.log("call back function called from nft component, with this arg: ", imageUrl)
  }

  console.log("token from props:", token);
  console.log(audioUrl)

  return (
    <Box mx={"1%"} onClick={handleClick}>
  <Image src={imageUrl} alt={token?.name} w={"15rem"} />
  <Text>{token?.name}</Text>
  </Box>
  );
};

export default InventoryNFT;
