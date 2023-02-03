import {GoVerified} from 'react-icons/go'
import {FaBath,FaBed} from 'react-icons/fa'
import {BsGridFill} from 'react-icons/bs'
import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import {fetchApi,BaseUrl} from '@/utils/fetchApi'
import ImageScrollbar from '@/components/ImageScrollbar'
import millify from 'millify'

function PropertyDetails({PropertyDetails:{price,rentFrequency,rooms,title,baths,area,agency,isVerified,description,type,purpose,furnishingStatus,amenities,photos}}) {
  return (
    <Box maxWidth='1000px' margin='auto' p='4'>
        {photos && <ImageScrollbar data={photos}/>}
        <Box w='full' p='6'>
          <Flex paddingTop='2' alignItems='center' justifyContent='space-between'>
            <Flex alignItems='center'>
              <Box paddingRight='3' color='green.400'>{isVerified && <GoVerified/>}</Box>
              <Text fontWeight='bold' fontSize='lg'>AED {millify(price)}{rentFrequency && `/${rentFrequency}`}</Text>
            </Flex>
            <Box>
              <Avatar size='sm' src={agency?.logo?.url}/>
            </Box>
          </Flex>
          <Flex alignItems='center' p='1' justifyContent='space-between' w='250px' color='blue.400'>
            {rooms} <FaBed/> | {baths} <FaBath/> | {millify(area)} sqft <BsGridFill/>
          </Flex>
          <Box marginTop='2'>
            <Text fontSize='lg' marginBottom='2' fontWeight='bold'>
              {title}
            </Text>
            <Text lineHeight='2' color='gray.600'>
              {description}
            </Text>
          </Box>
          <Flex flexWrap='wrap' textTransform='uppercase' justifyContent='space-between'>
            <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3'>
              <Text>Type</Text>
              <Text fontWeight='bold'>{type}</Text>
            </Flex>
          </Flex>
        </Box>
    </Box>
  )
}

export default PropertyDetails

export async function getServerSideProps({params:{id}}){
    const data = await fetchApi(`${BaseUrl}/properties/detail?externalID=${id}`);
    return{
        props:{
            PropertyDetails:data
        }
    }
}