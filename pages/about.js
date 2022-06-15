import React from 'react'
import Link from 'next/link'
import PageTitle from './components/PageTitle'

const About = () => {
    return (<div>
        <PageTitle title='Sobre' />
        <Link href="/">
            <a>Voltar</a>
        </Link>
        <h1>Sobre</h1>
    </div>)
}

export default About