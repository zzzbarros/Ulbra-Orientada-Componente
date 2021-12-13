import React from 'react'

import {
  Box,
  Center,
  Stack,
  Heading,
  useColorModeValue,
  Flex,
  VStack
} from '@chakra-ui/react'

import { FormLogin } from './FormLogin'


export function Login() {

  return (
    <Flex w="100%" p={4}>
      <Center w="100%">
        <VStack spacing={8}>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={14}
            w="25vw"
            minWidth="400px"
          >
            <Stack spacing={8}>
              <Heading fontSize={'4xl'}>
                Bem-vindo
                <Box fontSize='2xl' fontWeight='medium'>Digite seu usuário para prosseguir.</Box>
              </Heading>
              <FormLogin />
            </Stack>
          </Box>
        </VStack>
      </Center >
    </Flex >
  )
}


