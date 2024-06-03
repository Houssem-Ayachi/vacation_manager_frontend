import React from 'react'

type Props = {
  type: string
}

function LeaveType({type}: Props) {
  return (
    <>
      <span>{type}</span>
    </>
  )
}

export default LeaveType;
