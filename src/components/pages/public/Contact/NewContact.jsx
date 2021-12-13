import React, { useState } from 'react'

import Api from '../../../../services/Api'

import { useHistory } from 'react-router'

import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Button } from '@chakra-ui/button'
import { Box, Flex, Stack, VStack } from '@chakra-ui/layout'
import { Textarea } from '@chakra-ui/textarea'
import { useToast } from '@chakra-ui/toast'


export function NewContact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const toast = useToast()
  const history = useHistory()

  async function Create(e) {
    e.preventDefault()

    Api.post('/contacts', {
      name: name,
      email: email,
      message: message
    })
      .then(response => {
        const id = "success"
        if (!toast.isActive(id)) {
          toast({
            id,
            title: `Contato enviado`,
            status: 'success',
            isClosable: true,
          })
        }
        return history.push('/')
      })
      .catch(err => {
        const id = "err"
        if (!toast.isActive(id)) {
          toast({
            id,
            title: `Erro ao salvar contato`,
            status: 'error',
            isClosable: true,
          })
        }
      })
  }

  return (
    <Box w='100%' p={8}>
      <Flex direction="column" p={8} fontSize='1em' w='100%'>
        <Flex justify="space-between" w='100%' marginBottom={8}>
          <Box fontSize="2em">Entrar em Contato</Box>
          <Button
            marginTop={2}
            variant="solid"
            onClick={() => { history.push('/') }}
          >
            Voltar
          </Button>
        </Flex>
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
              id="message"
              isRequired
            >
              <FormLabel>Mensagem</FormLabel>
              <Textarea
                type="string"
                variant='flushed'
                placeholder='Escreva uma mensagem...'
                value={message}
                onChange={e => setMessage(e.target.value)}
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
      </Flex>
    </Box >
  )
}