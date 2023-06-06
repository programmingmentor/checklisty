'use client'
import 'react-toastify/dist/ReactToastify.css'

// import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { Slide, toast, ToastContainer } from 'react-toastify'

import { signin } from '../lib/api'
import SectionWrapper from './hoc/SectionWrapper'
import TermsService from './TermsService'

const SignIn = () => {
    const initial = { email: '', password: '' }
    const [formData, setFormData] = useState({ ...initial })
    const router = useRouter()

    const handleSubmit = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()

            try {
                await signin(formData)
                toast.success('You have successfully signed in!')
                router.push('/')
                router.refresh()
            } catch (error) {
                toast.warn('Please check your email and password and try again.')
                console.log(error)
            } finally {
                setFormData({ ...initial })
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [formData.email, formData.password]
    )
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
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-4 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=teal&shade=600" alt="Your Company" />
                    <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-white">Sign in to your account</h2>
                </div>

                <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    autoComplete="email"
                                    required
                                    className="authFormInput"
                                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <Link href="/forgotpassword" className="font-semibold text-teal-600 hover:text-teal-500">
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    autoComplete="current-password"
                                    required
                                    className="authFormInput"
                                    onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                                />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="btnSigninup">
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Need an account?{' '}
                        <Link href="/signup" className="font-semibold leading-6 text-teal-600 hover:text-teal-500">
                            Sign up
                        </Link>
                    </p>
                    <TermsService />
                </div>
            </div>
        </>
    )
}
export default SectionWrapper(SignIn, '')