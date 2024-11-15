import Link from 'next/link'
import React from 'react'

const Success = () => {
    return (
        <div className="relative h-screen flex justify-center items-center bg-white">
            <div className="container relative">
                <div className="md:flex justify-center">
                    <div className="lg:w-2/5">
                        <div className="relative overflow-hidden rounded-md shadow-lg bg-white">
                            <div className="px-6 py-12 bg-primary_color  text-center">
                                <i className="mdi mdi-check-circle text-white text-6xl"></i>
                                <h5 className="text-white text-xl tracking-wide uppercase font-semibold mt-2">Success</h5>
                            </div>
                            <div className="px-6 py-12 text-center">
                                <p className="text-black font-semibold text-xl dark:text-white">Congratulations! 🎉</p>
                                <p className="text-slate-400 mt-4">Your account has been successfully created. <br /> Enjoy your journey. Thank you</p>
                                <div className="mt-6">
                                    <Link href="/login" className="py-2 px-5 inline-block tracking-wide align-middle duration-500 text-base text-center bg-orange-500 text-white rounded-md">Continue</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Success
