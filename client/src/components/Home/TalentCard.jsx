import React from "react";
import { Link } from "react-router-dom";
import { Box, Image, Button } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import { useSelector } from "react-redux";


export default function TalentCard({ title, username, description, image, cost, id }) {
    
  const property = useSelector(state => state.index.filteredTalents)
  
    return (
      <div class='user-select-none'>

      <Box m='2' maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' h="500px">
        <Image src={image} alt="talent_image" h="250px" w="sm"/>
  
        <Box p='6'>
          <Box display='flex' alignItems='baseline'>
            {/* <Badge borderRadius='full' px='2' colorScheme='teal'>
              New
            </Badge> */}
            <Box
              color='gray.500'
              fontWeight='semibold'
              letterSpacing='wide'
              fontSize='xs'
              ml='2'
            >
              By: {username}
            </Box>
          </Box>
  
          <Box
            mt='1'
            fontWeight='semibold'
            as='h4'
            lineHeight='tight'
            isTruncated
          >
            {title}
          </Box>

          <Box overflowY='scroll' maxH="100px">
            {description}
          </Box>
  
          <Box>
            <Box as='span' color='gray.600' fontSize='sm'>
              ${cost}
            </Box>
          </Box>
  
          <Box display='flex' mt='2' alignItems='center'>
            {Array(5)
              .fill('')
              .map((_, i) => (
                <StarIcon
                  key={i}
                  color={i < property.rating ? 'teal.500' : 'gray.300'}
                />
              ))}
            {/* <Box as='span' ml='2' color='gray.600' fontSize='sm'>
              {property.reviewCount} reviews
            </Box> */}
            <Box as='span' ml='2' color='gray.600' fontSize='sm'>
              <Link to={'/talent/' + id}>
              <Button>
                  Ver mas
              </Button>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
      </div>
    )
  }