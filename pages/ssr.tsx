import {NextPage, GetServerSideProps} from 'next'
import {addApolloState, initializeApollo} from '@/libs'

const SsrPage: NextPage = () => {
    return <></>
}

export const getServerSideProps: GetServerSideProps = async () => {
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

export default SsrPage