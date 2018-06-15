import React from 'react'
import styled from 'styled-components'

const Icon = styled.div`
  display: inline-block;
`

export default (props) => (
  <Icon>
    <ion-icon {...props} />
  </Icon>
)
