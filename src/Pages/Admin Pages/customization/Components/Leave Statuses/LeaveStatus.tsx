import React from 'react'

type Props = {
  label: string
}

function LeaveStatus({label}: Props) {
  return (
      <span>{label}</span>
  )
}

export default LeaveStatus;
