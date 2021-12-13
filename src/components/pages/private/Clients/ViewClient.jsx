import React, { useEffect, useState } from 'react'

import Api from '../../../../services/Api';
import { getToken } from '../../../../services/Auth';
import { useHistory } from 'react-router';

import { Button } from '@chakra-ui/button';
import { Box, Flex, Stack, VStack } from '@chakra-ui/layout';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { useToast } from '@chakra-ui/toast';

export function ViewClient(props) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [id, setId] = useState('')

  const history = useHistory()
  const toast = useToast()

  useEffect(() => {
    setId(props.match.params.id)
    console.log(id)
    Api.get(`/clients/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      }
    })
      .then(response => {
        setName(response.data.name)
        setPhone(response.data.phone)
        setEmail(response.data.email)
        setAddress(response.data.address)
      })
      .catch(error => {
        return console.log(error)
      })
  }, [props, id])

  function Send(e) {
    e.preventDefault()

    Api.put(`/clients/${id}`,
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
            title: `Cliente editado`,
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
            title: `Erro ao editar cliente`,
            status: 'error',
            isClosable: true,
          })
        }
      })
  }

  return (
    <Box w='100%' p={8}>
      <Flex justify="space-between" w='100%' p={8}>
        <Box fontSize="2em">Editar Cliente</Box>
        <Button
          variant="solid"
          onClick={() => { history.push('/admin/clients') }}
        >
          Voltar
        </Button>
      </Flex>
      <Box w='100%' p={8} >
        <form onSubmit={Send}>
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
              <FormLabel>Endereço</FormLabel>
              <Input
                type="address"
                variant='flushed'
                placeholder='Rua x, nº Y, bairro, cidade'
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

