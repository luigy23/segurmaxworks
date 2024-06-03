import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import NavBar from './Componentes/NavBar'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Segurmax Control de Ingresos',
  description: 'Control de Ingresos y Egresos',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
     
        {children}
        </Providers>
        </body>
    </html>
  )
}
