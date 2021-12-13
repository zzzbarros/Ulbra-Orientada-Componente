import React from 'react'

import { Dashboard } from '../components/pages/private/Dashboard'

import { ListClients } from '../components/pages/private/Clientes/ListClients'
import { NewClient } from '../components/pages/private/Clientes/NewClient'
import { ViewClient } from '../components/pages/private/Clientes/ViewClient'

import { ListContacts } from '../components/pages/private/Contatos/ListContacts'
import { ViewContact } from '../components/pages/private/Contatos/ViewContact'


import { Route, Switch } from 'react-router'

export function Private() {
  return (
    <>
      <Switch>
        <Route path="/admin" exact component={Dashboard} />
        <Route path="/admin/clients" exact component={ListClients} />
        <Route path="/admin/clients/new" exact component={NewClient} />
        <Route path="/admin/clients/:id" exact component={ViewClient} />
        <Route path="/admin/contacts" exact component={ListContacts} />
        <Route path="/admin/contacts/:id" component={ViewContact} />
      </Switch>
    </>
  )
}
