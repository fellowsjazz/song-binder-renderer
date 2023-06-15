import React from 'react'
import { useRouter } from 'next/router'

export default function TokenDetail() {

    const router = useRouter()
    const tokenId = router.query.tokenId

  return (
    <div>
      details about token numer {tokenId}
    </div>
  )
}
