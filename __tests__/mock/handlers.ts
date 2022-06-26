import { graphql } from 'msw'

export const handlers = [
    graphql.query('GetSampleList', (_, res, ctx) => {
        return res(ctx.data({
            sampleList: {
                id: 'graphqltest',
                title: 'graphql sample',
                description: 'graphql description'
            }
        }))
    })
]
