import {NextPage, GetServerSideProps} from 'next'
import {addApolloState, initializeApollo} from '@/libs'
import { useQuery } from '@apollo/client'
import {GET_SAMPLE_LIST, SampleList} from '@/apis'

const SsrPage: NextPage = () => {
    const {data, loading} = useQuery(GET_SAMPLE_LIST)
    if (loading) {
        return (
            <main>
                <p>...loading</p>
            </main>
        )
    }
    return (
        <main>
            <h1>{ data.sampleList.title }</h1>
        </main>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const client = initializeApollo()
    client.query<SampleList>({query: GET_SAMPLE_LIST})
    return addApolloState(client, {
        props: {}
    })
}

export default SsrPage
