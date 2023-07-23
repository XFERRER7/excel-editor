'use client'

interface IInputCsvProps {
  fileSelected: boolean
  setFileSelected: React.Dispatch<React.SetStateAction<boolean>>
  readData: (file: File | undefined) => void
}

export const InputCsv = ({ fileSelected, setFileSelected, readData }: IInputCsvProps) => {

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
  }

  const handleDragEnter = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
  }

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files?.[0]
    if (file) {
      setFileSelected(true)
      readData(file)
    }
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {

    const file = event.target.files?.[0]

    setFileSelected(true)
    readData(file)

  }

  return (
    <div>
      <label
        htmlFor="dropzone-file"
        style={{
          borderRadius: '0.5rem',
        }}
        className={`flex flex-col items-center justify-center w-full h-64 border-2 
              border-zinc-700 border-dashed cursor-pointer
             ${fileSelected === true ? 'bg-zinc-600' : 'bg-zinc-700'}`}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
          </svg>
          {fileSelected === true ? (
            <div>
              <p className="mb-2 text-sm text-gray-500 font-semibold text-center">
                Arquivo selecionado:
              </p>
            </div>
          ) : (
            <>
              <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Clique para fazer upload</span> ou arraste e solte aqui</p>
              <p className="text-xs text-gray-500">Arquivos csv</p>
            </>
          )}
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          accept="text/csv"
          onChange={handleFileChange}
        />
      </label>
    </div>
  )
}
