import { server } from './mock'
import { render } from './utils'

import { screen } from '@testing-library/react'

import SsgPage from '@/pages/ssg'

beforeAll(() => {
    server.listen()
})

beforeEach(() => {
    server.resetHandlers()
})

afterAll(() => {
    server.close()
})

describe('getServerSideProps tests', () => {
    it('render title', async () => {
        render(<SsgPage />)
        expect(await screen.findByText('graphql sample')).toBeInTheDocument()
    })
})
