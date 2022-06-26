import { NextPage, GetStaticProps } from 'next'
import {addApolloState, initializeApollo} from '@/libs'

const SsgPage: NextPage = () => {
    return <></>
}

export const getStaticProps: GetStaticProps  = async () => {
    const client = initializeApollo()
    const bool: boolean = false
    if (bool) {
        return {
            notFound: true
        }
    }
    return addApolloState(client, {
        props: {}
    })
}

export default SsgPage
