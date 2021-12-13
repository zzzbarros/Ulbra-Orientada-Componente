import React, { useEffect, useState } from 'react'

import Api from '../../../../services/Api'
import { getToken } from '../../../../services/Auth'
import { useHistory, useLocation } from 'react-router'

import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast
} from '@chakra-ui/react'

export function ListContacts() {
  const [contacts, setContacts] = useState([])
  const [search, setSearch] = useState('')

  const history = useHistory()
  const location = useLocation()
  const toast = useToast()

  useEffect(() => {
    Api.get(`/contacts/${search !== '' ? `/search/${search}` : ''}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      }
    })
      .then(response => {
        setContacts(response.data)
      })
      .catch(error => {
        console.log(error)
        return setContacts(null)
      })
  }, [search])

  async function DeleteContact(id) {
    await Api.delete(`/contacts/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      }
    })
      .then(response => {
        const id = "success"
        if (!toast.isActive(id)) {
          toast({
            id,
            title: `Contato Removido`,
            status: 'success',
            isClosable: true,
          })
        }
      })
      .catch(err => {
        const id = "err"
        if (!toast.isActive(id)) {
          toast({
            id,
            title: `Erro ao deletar contato`,
            status: 'error',
            isClosable: true,
          })
        }
      })
      .finally(() => { window.location.reload() })
  }

  return (
    <Flex direction="column" p={8} fontSize='1em' w='100%'>
      <Flex justify="space-between" w='100%' p={8}>
        <Box fontSize="2em">Lista de Contatos</Box>
        <Flex direction="row">
          <Input
            type="text"
            variant='outline'
            placeholder='Busca'
            flex={1}
            marginRight={4}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </Flex>
      </Flex>
      <Box flex={1} m={8} p={8} border='2px solid lightgray' borderBottom='none' marginTop={0}>
        <Table variant='striped'>
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>Email</Th>
              <Th>Mensagem</Th>
              <Th>Status</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              contacts.map(contact => (
                <Tr key={contact.idContact}>
                  <Td>{contact.name}</Td>
                  <Td>{contact.email}</Td>
                  <Td>{contact.message}</Td>
                  <Td>{contact.status}</Td>
                  <Td>
                    <HStack>
                      <Button
                        variant='solid'
                        bg='blue.400'
                        onClick={() => {
                          history.push(`${location.pathname}/${contact.idContact}`);
                        }}>
                        Responder
                      </Button>
                      <Button
                        variant='solid'
                        bg='red.400'
                        onClick={() => { DeleteContact(contact.idContact) }}
                      >Excluir</Button>
                    </HStack>
                  </Td>
                </Tr>
              ))
            }
          </Tbody>
        </Table>
      </Box>
    </Flex >
  )
}

