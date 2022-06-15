import React from 'react'
import styles from './styles.module.css'
import Link from 'next/link'

const Header = () => {
    return (
        <React.Fragment>
            <div className={styles.wrapper}>
                <div className='container mx-auto'>
                    <Link href='/'>
                        <a><img className="mx-auto w-40" src='/images/logo_palpitebox.png' alt="Palpite Box"></img>    </a>
                    </Link>
                </div>
            </div>
            <div className={styles.wrapper + ' text-center font-semibold'}>
                <Link href="/poll">
                    <a className='px-2 hover:underline'>Pesquisa</a>
                </Link>
                <Link href="/about">
                    <a className='px-2 hover:underline'>Sobre</a>
                </Link>
                <Link href="/contact">
                    <a className='px-2 hover:underline'>Contato</a>
                </Link>
            </div>
        </React.Fragment>
    )
}

export default Header