import { Box, Center, VStack } from '@chakra-ui/layout'
import React, { useEffect, useState } from 'react'
import Api from '../../../../services/Api';

export function About() {
  const [page, setPage] = useState([])

  useEffect(() => {
    Api.get('/pages/2')
      .then((response) => {
        setPage(response.data)
      });
  }, [])

  return (
    <Center w='100%' fontSize='2xl'>
      <VStack>
        <Box dangerouslySetInnerHTML={{ __html: page.content }}></Box>
      </VStack>
    </Center>
  )
}

