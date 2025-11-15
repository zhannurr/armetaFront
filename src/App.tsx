import { useState } from 'react'

function PdfUpload() {
  const [files, setFiles] = useState<FileList | null>(null)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!files || files.length === 0) {
      alert('Выберите хотя бы один PDF')
      return
    }

    const formData = new FormData()

    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]) 
    }

    try {
      const response = await fetch('/post-pdfs', {
        method: 'POST',
        body: formData, 
      })

      if (response.ok) {
        alert("send")
      } else {
        alert("not send")
      }
    } catch (err) {
      console.error(err)
      alert('Ошибка соединения с сервером')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        accept="application/pdf"
        multiple
        onChange={(e) => setFiles(e.target.files)}
      />

      <button type="submit">Отправить</button>
    </form>
  )
}

export default PdfUpload
