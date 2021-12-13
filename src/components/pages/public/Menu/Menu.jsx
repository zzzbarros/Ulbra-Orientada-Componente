import React from 'react'

import { Link } from 'react-router-dom'
import { isAdmin } from '../../../../services/Auth'

import { Box, StackDivider, VStack } from '@chakra-ui/layout'

export function Menu() {
  return (
    <Box minWidth='15vw' p={4} bg='#2e2e2ef6' fontSize='1.1rem'>
      <Box color='white' p={2} >
        <Box p={6} width='100%'> Menu </Box>
        <VStack
          divider={<StackDivider borderColor='gray.209' />}
          spacing={2}
          align='stretch'
        >
          <Link to='/'>
            <Box
              p={6}
              _hover={{ color: "blue.500" }}
              width='100%'
            >
              Inicio
            </Box>
          </Link>
          <Link to='/contact'>
            <Box
              p={6}
              _hover={{ color: "blue.500" }}
              width='100%'
            >
              Contato
            </Box>
          </Link>
          <Link to='/about'>
            <Box
              p={6}
              _hover={{ color: "blue.500" }}
              width='100%'
            >
              Sobre
            </Box>
          </Link>
          <Link to='/products'>
            <Box
              p={6}
              _hover={{ color: "blue.500" }}
              width='100%'
            >
              Produtos
            </Box>
          </Link>
          {isAdmin() ?
            <VStack
              divider={<StackDivider borderColor='gray.209' />}
              align='stretch'
            >
              <Link to='/admin/clients'>
                <Box
                  p={6}
                  _hover={{ color: "blue.500" }}
                  width='100%'
                >
                  Clientes
                </Box>
              </Link>
              <Link to='/admin/contacts'>
                <Box
                  p={6}
                  _hover={{ color: "blue.500" }}
                  width='100%'
                >
                  Contatos
                </Box>
              </Link>
            </VStack>
            : <></>}
        </VStack>
      </Box>
    </Box >
  )
}

