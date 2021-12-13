import { useState } from 'react'

import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Stack } from '@chakra-ui/layout'

import Api from '../../../../services/Api'
import { setToken } from '../../../../services/Auth'

import { useHistory } from 'react-router'
import { useToast } from '@chakra-ui/toast'

export function FormLogin() {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')

  const history = useHistory()
  const toast = useToast()


  async function sign(e) {
    e.preventDefault()
    await Api.post('/users/login', {
      user: user,
      pass: password,
    })
      .then(response => {

        if (response.data.acess === "false") {
          const id = "wrong-password"
          if (!toast.isActive(id)) {
            toast({
              id,
              title: `Usuário ou senha inválido`,
              status: 'error',
              isClosable: true,
            })
          }
          return
        }

        setToken(response.data.token)
        history.push('/admin')
        return window.location.reload()
      })
  }

  return (
    <form onSubmit={sign}>
      <FormControl id="email" isRequired>
        <FormLabel>Usuário</FormLabel>
        <Input
          type="text"
          value={user}
          onChange={e => setUser(e.target.value)}
        />
      </FormControl>
      <FormControl
        id="password"
        isRequired
        margin="1em 0"
      >
        <FormLabel>Senha</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </FormControl>
      <Stack spacing={10}>
        <Stack
          direction={{ base: 'column', sm: 'row' }}
          align={'start'}
          justify={'space-between'}>
        </Stack>
        <Button
          bg={'blue.400'}
          color={'white'}
          _hover={{
            bg: 'blue.500',
          }}
          type="submit"
        >
          Entrar
        </Button>
      </Stack>
    </form>
  )
}

