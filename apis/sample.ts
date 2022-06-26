import {gql} from '@apollo/client'

export type SampleList = {
    sampleList: {
        id: string
        title: string
        description: string
    }
}

export const GET_SAMPLE_LIST = gql`
    query GetSampleList {
        sampleList {
            id
            title
            description
        }
    }
`
