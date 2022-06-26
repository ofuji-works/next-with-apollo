import { NextPage, GetStaticProps } from 'next'
import { addApolloState, initializeApollo } from '@/libs'
import { GET_SAMPLE_LIST, SampleList } from '@/apis'
import { useQuery } from '@apollo/client'

const SsgPage: NextPage = () => {
    const { data, loading } = useQuery<SampleList>(GET_SAMPLE_LIST)
    if (loading) {
        return (
            <main>
                <p>...loading</p>
            </main>
        )
    }
    return (
        <main>
            <h1>{ data?.sampleList.title }</h1>
        </main>
    )
}

export const getStaticProps: GetStaticProps  = async () => {
    const client = initializeApollo()
    client.query<SampleList>({
        query: GET_SAMPLE_LIST
    })
    return addApolloState(client, {
        props: {}
    })
}

export default SsgPage
