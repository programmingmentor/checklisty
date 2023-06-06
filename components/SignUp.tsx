'use client'
// import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { Slide, toast, ToastContainer } from 'react-toastify'

import { signup } from '../lib/api'
import SectionWrapper from './hoc/SectionWrapper'
import TermsService from './TermsService'

const SignUp = () => {
    const initial = { name: '', email: '', password: '' }
    const router = useRouter()
    const [formData, setFormData] = useState({ ...initial })

    const handleSubmit = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()

            try {
                await signup(formData)
                toast.success('You have successfully signed up!')
                router.push('/')
                router.refresh()
            } catch (error) {
                toast.warn('The email you entered is already in use.')
                console.log(error)
            } finally {
                setFormData({ ...initial })
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [formData.name, formData.email, formData.password]
    )
    const renderInput = (id, name, type, value, autoComplete, required, className, onChange) => {
        return (
            <div>
                <label htmlFor={id} className="block text-sm font-medium leading-6 text-white">
                    {name}
                </label>
                <div className="mt-2">
                    <input id={id} name={name} type={type} value={value} autoComplete={autoComplete} required={required} className={className} onChange={onChange} />
                </div>
            </div>
        )
    }

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={1400}
                transition={Slide}
                hideProgressBar
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="light"
            />
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-2 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=teal&shade=600" alt="Your Company" />
                    <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-white">Sign up for an account</h2>
                </div>

                <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                        {renderInput('name', 'Name', 'text', formData.name, 'name', true, 'authFormInput', (e) => setFormData((prev) => ({ ...prev, name: e.target.value })))}
                        {renderInput('email', 'Email address', 'email', formData.email, 'email', true, 'authFormInput', (e) => setFormData((prev) => ({ ...prev, email: e.target.value })))}
                        {renderInput('password', 'Enter password', 'password', formData.password, 'new-password', true, 'authFormInput', (e) =>
                            setFormData((prev) => ({ ...prev, password: e.target.value }))
                        )}

                        <div>
                            <button type="submit" className="btnSigninup">
                                Sign up
                            </button>
                        </div>
                    </form>
                    <p className="mt-5 text-center text-sm text-gray-500">
                        Have an account?
                        <Link href="/sign-in" className="font-semibold leading-6 text-teal-600 hover:text-teal-500">
                            Sign in
                        </Link>
                    </p>
                    <TermsService />
                </div>
            </div>
        </>
    )
}
export default SectionWrapper(SignUp, '')
