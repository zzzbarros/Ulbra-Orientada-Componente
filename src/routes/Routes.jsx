import React from 'react'

import {
  Switch,
  Route,
} from 'react-router-dom'

import { Header } from '../components/pages/public/Header/Header'
import { Menu } from '../components/pages/public/Menu/Menu'
import { Home } from '../components/pages/public/Home/Home'
import { Login } from '../components/pages/public/Login/Login'
import { About } from '../components/pages/public/Sobre/About'
import { Products } from '../components/pages/public/Produtos/Products'
import { NewContact } from '../components/pages/public/Contato/NewContact'


import { Private } from './Private'
import { PrivateRoute } from './PrivateRoute'

import { Flex } from '@chakra-ui/layout'

export function Routes() {
  return (
    <Flex direction="column" minHeight="100vh">
      <Header />
      <Flex flex={1}>
        <Menu />
        <Flex flex={1}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/about" exact component={About} />
            <Route path="/contact" exact component={NewContact} />
            <Route path="/products" exact component={Products} />
            <PrivateRoute path="/admin" component={Private} />
          </Switch>
        </Flex>
      </Flex>
    </Flex>
  )
}
