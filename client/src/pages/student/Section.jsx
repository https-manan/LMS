import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'

const Section = () => {
    return (
        <div className="relative bg-linear-to-r from-zinc-800 to-zinc-900 dark:from-black dark:to-zinc-950 py-24 px-6 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
                Search courses here!!!
            </h1>
            <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto mb-10">
                Discover, Keep Learning and exploring.
            </p>

            <form  action="" className="flex items-center justify-center max-w-2xl mx-auto">
                <Input
                    type="text"
                    placeholder="Search for anything..."
                    className="w-full md:w-96 h-12 px-6 rounded-l-full bg-amber-50 text-black shadow-lg border-none focus-visible:ring-0"
                />
                <Button
                    className="h-12 bg-amber-50 text-zinc-900 px-8 rounded-r-full border-l border-zinc-200 hover:bg-zinc-200 transition-colors shadow-lg"
                >
                    Search
                </Button>
            </form>
        </div>
    )
}

export default Section
