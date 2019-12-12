import { useEffect, useState } from 'react'
import * as firebase from 'firebase/app'
import 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'

export default () => {
  const [values, loading] = useCollection(firebase.firestore().collection('Users'))
  const [users, setUsers] = useState([])

  useEffect(() => {
    if (!loading) {
      setUsers(values.docs.map(doc => doc.data()))
    }
  }, [loading, values])

  return users
}
