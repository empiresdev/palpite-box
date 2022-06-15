import React from 'react'

const Footer = () => (
    <div className='bg-gray-700 p-4 mt-16'>
        <div className='container mx-auto text-center text-white'>
            Projeto desenvolvido por { }
            <a href='http://empiresdev.com' className='font-semibold hover:underline'>
                empiresdev
            </a>
            <div className='mt-4'>
                <img className='inline p-2 w-40' src="/images/logo_semana_fsm.png" />
                <img className='inline p-2 w-40' src="/images/logo_devpleno.png" />
            </div>
        </div>
    </div>
)

export default Footer