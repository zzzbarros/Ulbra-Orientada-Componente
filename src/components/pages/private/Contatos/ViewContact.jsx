import React, { useEffect, useState } from 'react'

import Api from '../../../../services/Api';
import { getToken } from '../../../../services/Auth';
import { useHistory } from 'react-router';

import { Button } from '@chakra-ui/button';
import { Box, Flex, Stack, VStack } from '@chakra-ui/layout';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Textarea } from '@chakra-ui/textarea';
import { Select } from '@chakra-ui/select';
import { useToast } from '@chakra-ui/toast';

export function ViewContact(props) {
  const [data, setData] = useState({})
  const [status, setStatus] = useState('')
  const [messageResponse, setMessageResponse] = useState('')
  const [idContact, setIdContact] = useState('')

  const history = useHistory()
  const toast = useToast()

  useEffect(() => {
    setIdContact(props.match.params.id)
    console.log(idContact)
    Api.get(`/contacts/${idContact}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      }
    })
      .then(response => {
        setData(response.data)
      })
      .catch(error => {
        console.log(error)
        return setData(null)
      })
  }, [props, idContact])

  function Send(e) {
    e.preventDefault()

    Api.put(`/contacts/${idContact}`,
      {
        status: status,
        description: messageResponse
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
            title: `Contato respondido`,
            status: 'success',
            isClosable: true,
          })
        }
        return history.push('/admin/contacts')
      })
      .catch(err => {
        const id = "err"
        if (!toast.isActive(id)) {
          toast({
            id,
            title: `Erro ao responder contato`,
            status: 'error',
            isClosable: true,
          })
        }
      })
  }

  return (
    <Flex direction="column" p={8} fontSize='1em' w='100%'>
      <Flex justify="space-between" w='100%' p={8}>
        <Box fontSize="2em">Responder Contato</Box>
        <Button
          marginTop={2}
          variant="solid"
          onClick={() => { history.push('/admin/contacts') }}
        >
          Voltar
        </Button>
      </Flex>
      <Box p={8}>
        <form onSubmit={Send} >
          <VStack
            spacing={10}
            align='stretch'
          >
            <FormControl
              id="name"
            >
              <FormLabel>
                Nome
              </FormLabel>
              <Input
                type="name"
                variant='flushed'
                placeholder='Nome Completo'
                value={data.name}
                disabled
              />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                variant='flushed'
                placeholder='nome@email.com'
                value={data.email}
                disabled
              />
            </FormControl>
            <FormControl id="message"
            >
              <FormLabel>Mensagem</FormLabel>
              <Textarea
                type="string"
                variant='flushed'
                placeholder='Escreva uma mensagem...'
                disabled
                value={data.message}
              />
            </FormControl>
            <FormControl
              id="message"
              isRequired
            >
              <FormLabel>Status</FormLabel>
              <Select
                placeholder='Status'
                w='20%'
                marginTop={2}
                onChange={(e) => { setStatus(e.target.value) }}
              >
                <option value='0'>Aberto</option>
                <option value='1'>Fechado</option>
              </Select>
            </FormControl>
            <FormControl
              id="message"
              isRequired
            >
              <FormLabel>Mensagem de retorno</FormLabel>
              <Textarea
                type="string"
                variant='flushed'
                placeholder='Escreva uma mensagem...'
                value={messageResponse}
                onChange={e => setMessageResponse(e.target.value)}
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
      </Box>
    </Flex >
  )
}

