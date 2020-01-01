import React, { useEffect, useState } from 'react'
import ReactJson from 'react-json-view'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Page } from 'components'
import useUsers from 'hooks/useUsers'

import sortSubmitted from './sortSubmitted'

const Applications = () => {
  const users = useUsers()
  const [sorted, setSorted] = useState({ under18: [], experienced: [], novice: [] })

  const { under18, experienced, novice } = sorted
  const startScoring = () => {
    setSorted(sortSubmitted(users))
  }

  return (
    <Page>
      <h1>Applications</h1>
      <button type='button' onClick={startScoring}>
        Score Applications
      </button>
      <CopyToClipboard text={JSON.stringify({ under18: under18.slice(0, 54) })}>
        <span>under18-1</span>
      </CopyToClipboard>
      <CopyToClipboard text={JSON.stringify({ under18: under18.slice(55) })}>
        <span>under18-2</span>
      </CopyToClipboard>
      <CopyToClipboard text={JSON.stringify({ experienced })}>
        <span>experienced</span>
      </CopyToClipboard>
      <CopyToClipboard text={JSON.stringify({ novice: novice.slice(0, 50) })}>
        <span>novice-1</span>
      </CopyToClipboard>
      <CopyToClipboard text={JSON.stringify({ novice: novice.slice(51, 100) })}>
        <span>novice-2</span>
      </CopyToClipboard>
      <CopyToClipboard text={JSON.stringify({ novice: novice.slice(101, 150) })}>
        <span>novice-3</span>
      </CopyToClipboard>
      <CopyToClipboard text={JSON.stringify({ novice: novice.slice(151, 200) })}>
        <span>novice-4</span>
      </CopyToClipboard>
      <CopyToClipboard text={JSON.stringify({ novice: novice.slice(201, 250) })}>
        <span>novice-5</span>
      </CopyToClipboard>
      <CopyToClipboard text={JSON.stringify({ novice: novice.slice(251) })}>
        <span>novice-6</span>
      </CopyToClipboard>
      <ReactJson src={sorted.under18} name='Under 18' theme='monokai' />
      <ReactJson src={sorted.experienced} name='Experienced' theme='monokai' />
      <ReactJson src={sorted.novice} name='Novice' theme='monokai' />
    </Page>
  )
}
export default Applications
