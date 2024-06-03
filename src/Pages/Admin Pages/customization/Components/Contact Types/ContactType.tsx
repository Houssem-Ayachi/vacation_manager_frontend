import React from 'react'

type Props = {
  type: string,
  value_type: string
}

function ContactType({type, value_type}: Props) {
  return (
      <span>{type}, {value_type}</span>
  )
}

export default ContactType;
