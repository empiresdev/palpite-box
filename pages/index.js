import Link from 'next/link'
import React from 'react'
import useSWR from 'swr'
import PageTitle from './components/PageTitle'

const fetcher = (...args) => fetch(...args).then(res => res.json())

const Index = () => {
    const { data, error } = useSWR('/api/get-promo', fetcher)

    return (
        <div>
            <PageTitle title='Seja bem vindo' />
            <p className='mt-12 text-center'>Texto de boas vindas ao site <br /> Segunda linha de textos.</p>
            <div className='text-center my-12'>
                <Link href='/poll'>
                    <a className='bg-blue-400 px-6 py-4 rounded-lg shadow-lg font-semibold text-white hover:shadow-none'>Dar opinião ou sugestão</a>
                </Link>
            </div>
            {!data && <p>Carregando...</p>}
            {!error && data && data.showCoupon &&
                <p className='my-12 text-center'>{data.message}</p>
            }
        </div>
    )
}

export default Index