import { NextSeo } from 'next-seo'

import Wrapper from '../components/wrapper'
import Header from '../components/header'
import Item from '../components/item'

export default function Snippets({ snippets }) {
    return (
        <Wrapper>
            <NextSeo
                title="Snippets"
                description="A collection of code snippets I commonly use. Imported from the GitHub Gists REST API."
            />

            <Header />

            <h1>Snippets</h1>

            <p>
                A collection of code snippets I commonly use. Imported from the
                GitHub Gists REST API.
            </p>

            {snippets.map((snippet) => (
                <Item
                    key={snippet.title}
                    title={snippet.title}
                    description={snippet.description}
                    code={snippet.code}
                />
            ))}
        </Wrapper>
    )
}

export async function getServerSideProps() {
    const gists = await fetch(
        'https://api.github.com/users/AryanBeezadhur/gists'
    )
    const gistsJson = await gists.json()

    const snippets = []

    gistsJson.map((gist) => {
        snippets.push({
            title: gist.files[Object.keys(gist.files)[0]].filename,
            description: gist.description,
            code: gist.html_url
        })
    })

    return {
        props: { snippets }
    }
}