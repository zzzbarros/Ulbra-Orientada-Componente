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

export function ListClients() {
  const [clients, setClients] = useState([])
  const [search, setSearch] = useState('')

  const history = useHistory()
  const location = useLocation()
  const toast = useToast()

  useEffect(() => {
    Api.get(`/clients/${search !== '' ? `/search/${search}` : ''}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      }
    })
      .then(response => {
        setClients(response.data)
      })
      .catch(error => {
        console.log(error)
        return setClients(null)
      })
  }, [search])

  async function DeleteClient(id) {
    await Api.delete(`/clients/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      }
    })
      .then(response => {
        const id = "success"
        if (!toast.isActive(id)) {
          toast({
            id,
            title: `Cliente Removido`,
            status: 'success',
            isClosable: true,
          })
        }
        return window.location.reload()
      })
      .catch(err => {
        const id = "err"
        if (!toast.isActive(id)) {
          toast({
            id,
            title: `Erro ao deletar cliente`,
            status: 'error',
            isClosable: true,
          })
        }
      })
  }

  return (
    <Flex direction="column" p={8} fontSize='1em' w='100%'>
      <Flex justify="space-between" w='100%' p={8}>
        <Box fontSize="2em">Lista de Clientes</Box>
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
          <Button
            variant="solid"
            onClick={() => { history.push('/admin/clients/new') }}
          >
            Novo Cliente
          </Button>
        </Flex>
      </Flex>
      <Box flex={1} m={8} p={8} border='2px solid lightgray' borderBottom='none' marginTop={0} >
        <Table variant='striped'>
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>Contato</Th>
              <Th>Email</Th>
              <Th>Endereço</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              clients.map(client => (
                <Tr key={client.idClient}>
                  <Td>{client.name}</Td>
                  <Td>{client.phone}</Td>
                  <Td>{client.email}</Td>
                  <Td>{client.address}</Td>
                  <Td>
                    <HStack>
                      <Button
                        variant='solid'
                        bg='blue.400'
                        onClick={() => {
                          history.push(`${location.pathname}/${client.idClient}`);
                        }}>
                        Editar
                      </Button>
                      <Button
                        variant='solid'
                        bg='red.400'
                        onClick={() => { DeleteClient(client.idClient) }}
                      >Excluir</Button>
                    </HStack>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </Box>
    </Flex >
  )
}