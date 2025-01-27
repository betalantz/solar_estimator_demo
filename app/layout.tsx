// This is the root layout component for your Next.js app.
// Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
// @jsxRuntime classic
// @jsx jsx
import React from 'react'
// import { Manrope } from 'next/font/google'
import { cn } from '../lib/utils'
import './globals.css'
import type { Metadata } from 'next'

// const fontHeading = Manrope({
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-heading',
// })

// const fontBody = Manrope({
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-body',
// })

interface Props {
  children: React.ReactNode
}

const fontHeading = 'var(--font-heading)';
const fontBody = 'var(--font-body)';

export const metadata: Metadata = {
  title: "Solar Estimator Demo",
}

export default function Layout({ children }: Props ) {
  return (
    <html lang="en">
      <body 
        className={cn(
          'antialiased',
          fontHeading,
          fontBody
        )}
      >
        <div className="w-full max-w-4xl mx-auto p-6 sm:p-8 md:p-10">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold">Solar Estimator Dashboard</h1>
          <p className="text-muted-foreground">Get an estimate of your solar energy potential.</p>
        </div>
        {children}
        </div>
        </div>
      </body>
    </html>
  )
}