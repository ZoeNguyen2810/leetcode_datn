import React from 'react'
import { Input } from 'antd'

export const ex1 = () => {
    return (
        <>
            <Input type='number' max={10} min={2} />
            <textarea autoFocus={true} />
        </>

    )
}
