import React, { useState } from 'react'

import Api from '../../../../services/Api'
import { getToken } from '../../../../services/Auth'
import { useHistory } from 'react-router'

import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Button } from '@chakra-ui/button'
import { Box, Flex, Stack, VStack } from '@chakra-ui/layout'
import { useToast } from '@chakra-ui/toast'


export function NewClient() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')

  const toast = useToast()
  const history = useHistory()

  async function Create(e) {
    e.preventDefault()
    Api.post(`/clients`,
      {
        name: name,
        phone: phone,
        email: email,
        address: address
      },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        }
      })
      .then(response => {
        const id = "success"
        if (!toast.isActive(id)) {
          toast({
            id,
            title: `Cliente salvo`,
            status: 'success',
            isClosable: true,
          })
        }
        return history.push('/admin/clients')
      })
      .catch(err => {
        const id = "err"
        if (!toast.isActive(id)) {
          toast({
            id,
            title: `Erro ao salvar cliente`,
            status: 'error',
            isClosable: true,
          })
        }
      })

  }

  return (
    <Box w='100%' p={8}>
      <Flex justify="space-between" w='100%' p={8}>
        <Box fontSize="2em">Novo Cliente</Box>
        <Button
          variant="solid"
          onClick={() => { history.push('/admin/clients') }}
        >
          Voltar
        </Button>
      </Flex>
      <Box w='100%' p={8} >
        <form onSubmit={Create}>
          <VStack
            spacing={20}
            align='stretch'
          >
            <FormControl
              id="name"
              isRequired
            >
              <FormLabel>
                Nome
              </FormLabel>
              <Input
                type="name"
                variant='flushed'
                placeholder='Nome Completo'
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </FormControl>

            <FormControl
              id="phone"
              isRequired
            >
              <FormLabel>Celular</FormLabel>
              <Input
                type="number"
                variant='flushed'
                placeholder='DDDXXXXXXXX'
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
            </FormControl>

            <FormControl
              id="email"
              isRequired
            >
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                variant='flushed'
                placeholder='nome@email.com'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl
              id="address"
              isRequired
            >
              <FormLabel>Endere??o</FormLabel>
              <Input
                type="address"
                variant='flushed'
                placeholder='Rua x, n?? Y, bairro, cidade'
                value={address}
                onChange={e => setAddress(e.target.value)}
              />
            </FormControl>

          </VStack>

          <Stack spacing={10}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
            </Stack>
            <Button
              bg={'blue.400'}
              color={'white'}
              h={16}
              _hover={{
                bg: 'blue.500',
              }}
              type="submit"
            >
              Salvar
            </Button>
          </Stack >
        </form >
      </Box >
    </Box >
  )
}