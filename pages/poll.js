import React, { useState } from 'react'
import Head from 'next/head'
import PageTitle from './components/PageTitle'

const Poll = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        whatsapp: '',
    })

    const [success, setSuccess] = useState(false)
    const [retorno, setRetorno] = useState({})

    const save = async () => {
        try {
            const response = await fetch('/api/save', {
                method: 'POST',
                body: JSON.stringify(form)
            })
            const data = await response.json()
            setSuccess(data.showCoupon);
            setRetorno(data);
        } catch (err) {
            setSuccess(false);
            setRetorno(err);
        }
    }
    const onChange = evt => {
        const key = evt.target.name
        const value = evt.target.value
        setForm(old => ({
            ...old,
            [key]: value
        }));
    }
    return (<div className='pt-8'>
        <PageTitle title='Pesquisa' />
        <h1 className='text-center font-semibold my-4 text-2xl'>Críticas e sugestões</h1>
        <p className='text-center'>Texto de boas-vindas</p>
        {!success && <div className='w-1/3 mx-auto'>
            <label className='font-semibold'>Seu nome:</label>
            <input placeholder='Nome' name='name' type='text' className='p-4 block shadow bg-blue-100 my-2 rounded' onChange={onChange} value={form.name} />
            <label className='font-semibold'>E-mail:</label>
            <input placeholder='E-mail' name='email' type='text' className='p-4 block shadow bg-blue-100 my-2 rounded' onChange={onChange} value={form.email} />
            <label className='font-semibold'>Whatsapp:</label>
            <input placeholder='Whatsapp' name='whatsapp' type='text' className='p-4 block shadow bg-blue-100 my-2 rounded' onChange={onChange} value={form.whatsapp} />
            <button className='bg-blue-400 px-12 py-4 font-bold rounded-lg shadow-lg hover:shadow' onClick={save}>Salvar</button>
        </div>}
        {success && <div>{JSON.stringify(retorno)}</div>}
    </div>)
}


export default Poll