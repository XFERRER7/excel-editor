'use client'

import { useEffect, useState } from "react"
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from "./ui/table"
import { DialogTrigger } from "@radix-ui/react-dialog"
import { DeleteDialog } from "./DeleteDialog"
import { EditSheet } from "./EditSheet"
import { Button } from "./ui/button"
import { SheetTrigger } from "./ui/sheet"
import { toast } from "react-toastify"
import { AddItemSheet } from "./AddItemSheet"
import { Input } from "./ui/input"
import { Search } from "lucide-react"

export interface UnknownObject {
  [key: string]: any
}

interface IBoardActionsProps {
  data: UnknownObject[]
  finished: boolean
  setData: React.Dispatch<React.SetStateAction<UnknownObject[]>>
  setFinished: React.Dispatch<React.SetStateAction<boolean>>
}

export const BoardActions = ({ data, setData, finished, setFinished }: IBoardActionsProps) => {

  const [formData, setFormData] = useState<UnknownObject>({})
  const [editData, setEditData] = useState<UnknownObject>({})
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [createdItemData, setCreatedItemData] = useState<UnknownObject>({})

  let headers: string[] = []

  useEffect(() => {
    if (Object.keys(editData).length !== 0) {
      const newData = [...data]
      if (selectedItemIndex !== null) {
        newData[selectedItemIndex] = editData
        setData(newData)
      }
    }
  }, [editData])

  useEffect(() => {

    if (confirmDelete && selectedItemIndex !== null) {
      const newData = [...data]
      newData.splice(selectedItemIndex, 1)
      setData(newData)
      setSelectedItemIndex(null)
      setEditData({})
      setConfirmDelete(false)
    }

  }, [confirmDelete])

  useEffect(() => {

    if (Object.keys(createdItemData).length !== 0) {
      setData((prevData) => [...prevData, createdItemData])
      setCreatedItemData({})
    }

  }, [createdItemData])

  if (data && data.length !== 0) {
    headers = Object.keys(data[0])
  }

  function isValidNumber(data: string): boolean {
    const formattedPhone = data?.replace(/\D/g, '')
    return formattedPhone?.length === 11 || formattedPhone?.length === 12
  }

  function sendToWhatsapp(data: string) {
    const formattedPhone = '+55' + data.replace(/\D/g, '')

    if (formattedPhone.length !== 13 && formattedPhone.length !== 14) {
      alert('Número inválido. Deve conter 11 dígitos (sem o DDD) ou 12 dígitos (com o DDD).')
      return
    }

    const message = `Olá! Aqui é a Ana Jhulia, secretária da Dra. Marília Garrote, pneumologista pediátrica.
    Estamos entrando em contato para saber notícias de quem aí está sob nossos cuidados

    Percebemos que já faz mais de um ano desde a última consulta, e gostaríamos de oferecer a possibilidade de agendar um novo acompanhamento.

    O retorno regular, a cada 3 meses, é fundamental para garantir um crescimento saudável, sem cansaço ou tosse, e para que cada momento de brincar seja vivido com qualidade de vida!

    Se precisar, estamos à disposição para verificar o melhor dia e horário para o atendimento.`;

    // Codificar para URL
    const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
    const otherUrl = `whatsapp://send?phone=${formattedPhone}&text=${encodeURIComponent(message)}`;
    window.open(otherUrl, '_blank');
  }

  return (
    <div className="flex flex-col justify-center items-center space-y-10 mt-10">
      <div className="flex w-full items-center justify-between">
        <div className="relative w-96">
          <div
            className="absolute top-0 right-0 h-full flex items-center pr-3 pointer-events-none"
          >
            <Search size={18} color='#4b5563' />
          </div>
          <Input
            type="text"
            placeholder="Search"
            className="pr-10 h-11 border-zinc-300 focus-visible:ring-0"
          />
        </div>
        <Button
          className="bg-blue-600 hover:bg-blue-500"
          onClick={() => setFinished(true)}
        >
          Confirmar alterações
        </Button>
      </div>


      <Table className="bg-white">
        <TableHeader>
          <TableRow>
            {headers.map((header) => (
              <TableHead className="font-bold" key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((item, index) => (
            <TableRow
              key={index}
              className={`cursor-pointer hover:bg-zinc-200
              ${Object.keys(editData).length !== 0 && editData === item ? 'bg-zinc-300 text-zinc-700 hover:bg-zinc-300' : ''}
              `}
              onClick={() => {
                if (selectedItemIndex == index) {
                  setSelectedItemIndex(null)
                  setEditData({})
                  return
                }
                setEditData(item)
                setSelectedItemIndex(index)
              }}
            >
              {headers.map((header) => (
                <TableCell
                  className="font-medium"
                  key={header}
                >
                  {
                    isValidNumber(item[header]) ? (
                      <span className="text-blue-600 cursor-pointer ml-2"
                        onClick={() => sendToWhatsapp(item[header])}
                      >
                        {item[header]}
                      </span>
                    )
                      :
                      <>
                        {item[header]}
                      </>
                  }
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>

      </Table>


      {
        !finished && (
          <div className="flex w-full justify-between">

            <DeleteDialog setConfirmDelete={setConfirmDelete}>
              <DialogTrigger asChild>
                <Button
                  variant='destructive'
                  disabled={selectedItemIndex === null}
                >
                  Excluir</Button>
              </DialogTrigger>
            </DeleteDialog>

            <EditSheet
              inputs={headers}
              values={
                Object.keys(editData).length === 0 ? headers.map(() => '') : Object.values(editData)
              }
              setEditData={setEditData}
            >
              <SheetTrigger asChild className="">
                <Button
                  className="bg-zinc-500"
                  disabled={selectedItemIndex === null}
                >Editar</Button>
              </SheetTrigger>
            </EditSheet>

            <AddItemSheet
              inputs={headers}
              setCreatedItemData={setCreatedItemData}
            >
              <SheetTrigger asChild>
                <Button
                  className="bg-green-600 hover:bg-green-500"
                >Adicionar</Button>
              </SheetTrigger>
            </AddItemSheet>

          </div>
        )
      }

    </div>
  )
}