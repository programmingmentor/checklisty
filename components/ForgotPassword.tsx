'use client'

// import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { Slide, toast, ToastContainer } from 'react-toastify'

import { resetPassword, sendEmail } from '../lib/api'
import { delay } from '../lib/async'
import SectionWrapper from './hoc/SectionWrapper'

const ForgotPassword = () => {
    const router = useRouter()
    const [showReset, setShowReset] = useState(false)

    const initial = { email: '', code: '', newPassword: '' }
    const [formData, setFormData] = useState({ ...initial })

    const initialCode = { isCodeSent: false, inputCode: '' }
    const [codeData, setCodeData] = useState({ ...initialCode })
    console.log(formData)

    const handleSendCode = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault()

            try {
                const recoverCode = Math.floor(100000 + Math.random() * 900000).toString()
                setFormData((prev) => ({ ...prev, code: recoverCode }))
                await sendEmail({ email: formData.email, code: recoverCode })
                toast.success('Code sent to your Email!')
                setCodeData((prev) => ({ ...prev, isCodeSent: true }))
            } catch (error) {
                toast.warn('Please check your email and try again.')
                setCodeData((prev) => ({ ...prev, isCodeSent: false }))
                console.log(error)
            }
        },
        [formData.email]
    )

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            if (formData.newPassword === '') {
                toast.warn('Please enter a new password.')
                return
            }
            await resetPassword({ email: formData.email, newPassword: formData.newPassword })
            toast.success('Password reset successfully!')
            setFormData({ ...initial })
            setCodeData({ ...initialCode })
            await delay(2000)
            router.push('/sign-in')
        } catch (error) {
            toast.warn('Please check your email and try again.')
            console.log(error)
        }
    }

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={3000}
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
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=teal&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-white">Reset password</h2>
                </div>

                <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-5" action="#" method="POST">
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
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                                />
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input
                                id="reset-password"
                                name="reset-password"
                                type="checkbox"
                                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                                onClick={() => setShowReset(!showReset)}
                            />
                            <label htmlFor="reset-password" className="ml-2 block text-sm font-medium text-white">
                                Yes, I really want to reset my password
                            </label>
                        </div>
                        {showReset && (
                            <div className="" id="reset-password-fields">
                                {codeData.isCodeSent && (
                                    <div>
                                        <label htmlFor="code" className="block text-sm font-medium leading-6 text-white">
                                            Enter code from email
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="code"
                                                name="code"
                                                type="text"
                                                value={codeData.inputCode}
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 px-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                                                onChange={(e) => setCodeData((prev) => ({ ...prev, inputCode: e.target.value }))}
                                            />
                                        </div>
                                    </div>
                                )}
                                <div className="flex gap-1">
                                    <button
                                        type="submit"
                                        onClick={handleSendCode}
                                        className="w-full flex justify-center py-2 px-2 mt-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                                    >
                                        Send code
                                    </button>
                                </div>
                            </div>
                        )}
                        {codeData.isCodeSent && (
                            <>
                                <div>
                                    <label htmlFor="New password" className="block text-sm font-medium leading-6 text-white">
                                        New password
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="New password"
                                            name="New password"
                                            type="password"
                                            autoComplete="current-password"
                                            required
                                            value={formData.newPassword}
                                            onChange={(e) => setFormData((prev) => ({ ...prev, newPassword: e.target.value }))}
                                            className="block w-full rounded-md border-0 py-1.5 px-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        onClick={handleResetPassword}
                                        className="w-full flex justify-center py-2 px-2 mt-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                    >
                                        Reset Password
                                    </button>
                                </div>
                            </>
                        )}
                    </form>
                </div>
            </div>
        </>
    )
}
export default SectionWrapper(ForgotPassword, '')
