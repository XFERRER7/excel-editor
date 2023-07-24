'use client'

import { useState } from 'react'
import Papa from 'papaparse'
import { useCSVDownloader } from 'react-papaparse'

import { InputCsv } from '@/components/InputCsv'
import { Button } from '@/components/ui/button'
import { TypographyH1 } from '@/components/ui/TypographyH1'
import { BoardActions } from '@/components/BoardActions'
import { ToastContainer } from 'react-toastify'

interface DataRow {
  [key: string]: any;
}

export default function Home() {

  const [fileSelected, setFileSelected] = useState(false)
  const [dataFile, setDataFile] = useState<any[]>([])
  const [finished, setFinished] = useState(false)

  const { CSVDownloader, Type } = useCSVDownloader()

  function readData(file: File | undefined) {

    if (file) {

      Papa.parse(file, {
        header: true,
        worker: true,
        step: function (row) {
          setDataFile((prevData) => [...prevData, row.data]);
        },
        complete: function () {
        }
      });

    }

  }

  function clearData() {
    setFileSelected(false)
    setDataFile([])
    setFinished(false)
  }

  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col gap-5 justify-center items-center 
    text-zinc-800 p-5">


      <div className="min-w-[40rem] max-w-[90%] px-8 rounded-lg">
        {
          !fileSelected ? (
            <>
              <InputCsv
                fileSelected={fileSelected}
                readData={readData}
                setFileSelected={setFileSelected}
              />
            </>
          )
            :
            (
              <div>
                <BoardActions
                  data={dataFile}
                  setData={setDataFile}
                  setFinished={setFinished}
                  finished={finished}
                />
              </div>
            )
        }
      </div>



      {
        finished && (
          <div className='flex space-x-10'>
            <Button
              variant='destructive'
              className='bg-zinc-500 hover:bg-zinc-600'
              onClick={clearData}
            >
              Cancelar
            </Button>

            <Button
              variant='destructive'
              className='bg-yellow-600 hover:bg-yellow-600'
              onClick={() => setFinished(false)}
            >
              Editar dados
            </Button>

            <CSVDownloader
              type={Type.Button}
              filename={'filename'}
              bom={true}
              config={{
                delimiter: ';',
              }}
              data={dataFile}
            >
              <Button
                className='bg-emerald-600 hover:bg-emerald-500'
              >
                Download
              </Button>
            </CSVDownloader>
          </div>
        )
      }

      <ToastContainer />

    </div>
  )
}
