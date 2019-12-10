import React from 'react'
import { Page } from 'components'
import useDatabase from 'hooks/useDatabase'

const Home = () => {
  const [database, update, loading] = useDatabase()

  return (
    <Page>
      <h1>cuHacking Admin Console: stats</h1>
      <div>
        <button type='button' onClick={update}>
          Fetch
        </button>
        {loading}
      </div>
    </Page>
  )
}

export default Home
