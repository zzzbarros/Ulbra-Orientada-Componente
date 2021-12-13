import React from 'react'

import { Redirect, Route } from 'react-router'

import { isAdmin } from '../services/Auth'

export function PrivateRoute({ component: Component, ...rest }) {

  if (isAdmin() === false) {
    return (
      <Redirect to={{ pathname: '/login' }} />
    )
  }

  return (
    <Route {...rest} component={Component} />
  )
}




