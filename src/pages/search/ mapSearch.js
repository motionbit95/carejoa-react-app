import React, { useEffect } from "react";
import { KakaoMap } from "../../components/kakaomap";
import { Box, Flex, HStack, Icon, Stack, Text } from "@chakra-ui/react";
import { FiCalendar, FiPhone } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function MapSearch(props) {
  const navigate = useNavigate();
  const [selectLocation, setSelectLocation] = React.useState(null);
  const [selectItem, setSelectItem] = React.useState(null);

  useEffect(() => {
    if (selectLocation) {
      console.log(selectLocation);
    }
  }, [selectLocation]);
  return (
    <Flex pos={"relative"} h={"full"}>
      <KakaoMap onSelect={(location) => setSelectLocation(location)} />
      {selectItem && (
        <Box
          id="selectItem"
          p={4}
          w={"full"}
          position={"absolute"}
          zIndex={9999}
          bottom={0}
          left={0}
          right={0}
          cursor={"pointer"}
          onClick={() =>
            navigate(
              `/detail/${
                selectLocation.id[0] === "J" ? "hospital" : "facility"
              }/${selectLocation.id}`
            )
          }
        >
          <Stack
            spacing={4}
            p={4}
            bgColor={"white"}
            borderRadius={"xl"}
            boxShadow={"lg"}
          >
            <HStack justifyContent={"space-between"}>
              <Text fontWeight={"bold"} fontSize={"lg"}>
                {selectItem.yadmNm?.text}
              </Text>
            </HStack>
            <Text fontSize={"sm"} color={"gray.500"}>
              {selectItem.addr?.text}
            </Text>
            <HStack spacing={4}>
              <HStack>
                <Icon as={FiPhone} />
                <Text color={"blue.500"}>{selectItem.telno?.text}</Text>
              </HStack>
              <HStack>
                <Icon as={FiCalendar} />
                <Text color={"blue.500"}>
                  {selectItem.estbDd?.text.slice(0, 4)}-
                  {selectItem.estbDd?.text.slice(4, 6)}-
                  {selectItem.estbDd?.text.slice(6, 8)}
                </Text>
              </HStack>
            </HStack>
          </Stack>
        </Box>
      )}
    </Flex>
  );
}

export default MapSearch;
