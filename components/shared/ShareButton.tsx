'use client'

import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Share2 } from 'lucide-react'

interface ShareButtonProps {
  title: string
}

export default function ShareButton({ title }: ShareButtonProps) {
  async function handleShare() {
    const url = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({ title, url })
      } else {
        await navigator.clipboard.writeText(url)
        toast.success('Đã sao chép liên kết!')
      }
    } catch {
      // user cancelled or API not available
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={handleShare}>
      <Share2 className="size-4 mr-2" />
      Chia sẻ
    </Button>
  )
}
