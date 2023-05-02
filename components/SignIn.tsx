'use client'
import 'react-toastify/dist/ReactToastify.css'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Slide, toast, ToastContainer } from 'react-toastify'

import { signin } from '../lib/api'
import SectionWrapper from './hoc/SectionWrapper'

const SignIn = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            await signin(formData)
            toast.success('You have successfully signed in!')
            setFormData({
                email: '',
                password: '',
            })
            setTimeout(() => {
                router.push('/')
            }, 2300)
        } catch (error) {
            toast.warn('Please check your email and password and try again.')
            console.log(error)
        }
    }
    return (
        <>
            <ToastContainer position="top-center" autoClose={1700} transition={Slide} hideProgressBar newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover={false} theme="light" />
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-4 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=violet&shade=600" alt="Your Company" />
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
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <Link href="/forgotpassword" className="font-semibold text-violet-600 hover:text-violet-500">
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                // onClick={() => router.push('/')}
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-violet-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Need an account?{' '}
                        <Link href="/signup" className="font-semibold leading-6 text-violet-600 hover:text-violet-500">
                            Sign up
                        </Link>
                    </p>
                    <div className="mt-5">
                        <p className="text-sm text-center text-gray-300">
                            By signing up, you agree to our
                            <a href="#" className="font-medium text-white hover:text-violet-500">
                                {' '}
                                Terms of Service
                            </a>{' '}
                            and{' '}
                            <a href="#" className="font-medium text-white hover:text-violet-500">
                                Privacy Policy
                            </a>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SectionWrapper(SignIn, '')
