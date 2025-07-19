import {Suspense} from 'react'
import content from './content'

function contentFallback() {
    return <>placeholder</>
}

export default function Page() {
    return (
        <>
            <Suspense fallback={<contentFallback/>}>
                <content/>
            </Suspense>
        </>
    )
}