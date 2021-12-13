import React from 'react'
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react'


export function Wrapper({ children }) {
  return (
    <ChakraProvider theme={theme} >
      {children}
    </ChakraProvider>
  )
}

