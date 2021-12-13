import React from 'react'

import { deleteToken, isAdmin } from '../../../../services/Auth'

import { Box, Flex, Stack } from '@chakra-ui/layout'
import { Button, IconButton } from '@chakra-ui/button'
import { ColorModeSwitcher } from '../../../utils/ColorModeSwitcher'
import { VscSignOut } from "react-icons/vsc"
import { useHistory } from 'react-router'

export function Header() {

  const history = useHistory()

  const logout = () => {
    deleteToken()
    history.push("/")
    return window.location.reload()
  }

  return (
    <Flex
      bg='#2e2e2e'
      w='100%'
      p={4}
      paddingLeft='2.5rem'
      paddingRight='2.5rem'
      color='white'
      justifyContent='space-between'
      align='center'
      fontSize='1.5rem'>
      <Box>
        This is Header
      </Box>
      <Box>
        <Stack direction='row' spacing={6}>
          <ColorModeSwitcher />
          {isAdmin() ? <IconButton
            variant='outline'
            aria-label='Sign Out'
            fontSize='20px'
            icon={<VscSignOut />}
            onClick={logout}
          />
            : <Button variant='outline' onClick={() => { history.push('/login') }}>Login</Button>
          }
        </Stack>
      </Box>
    </Flex>
  )
}


