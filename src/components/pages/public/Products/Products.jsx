import React, { useEffect, useState } from 'react'

import Api from '../../../../services/Api'
import { useLocation } from 'react-router'

import { Box, Flex } from '@chakra-ui/layout'
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table'
import { Select } from '@chakra-ui/select'

export function Products() {
  const [products, setProducts] = useState([])
  const location = useLocation();
  const [filter, setFilter] = useState('')

  useEffect(() => {
    Api.get(`${location.pathname + filter}`)
      .then(products => {
        setProducts(products.data)
      }).catch(error => {
        console.log(error)
        return setProducts(null)
      })
  }, [location, filter])

  return (
    <Flex direction="column" p={8} fontSize='1em' w='100%'>
      <Flex justify="space-between" w='100%' p={8}>
        <Box fontSize="2em">Lista de Produtos</Box>
        <Select placeholder='Categorias' w='20%' marginTop={2} onChange={(e) => { setFilter(e.target.value) }}>
          <option value='/category/1'>Categoria 1</option>
          <option value='/category/2'>Categoria 2</option>
          <option value='/category/3'>Categoria 3</option>
        </Select>
      </Flex>
      <Box flex={1} m={8} p={8} border='2px solid lightgray' borderBottom='none' marginTop={0} >
        <Table variant='striped'>
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>Preço</Th>
              <Th>Descrição</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              products.map(product => (
                <Tr key={product.idProduct}>
                  <Td>{product.name}</Td>
                  <Td>{product.price}</Td>
                  <Td>{product.description}</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </Box>
    </Flex >
  )
}

