import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ChatFloatingButton from '@/components/chat/ChatFloatingButton'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <ChatFloatingButton />
    </div>
  )
}
