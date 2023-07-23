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


  return (
    <div className="flex flex-col justify-center items-center space-y-10">
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow
              key={index}
              className={`cursor-pointer hover:opacity-80
              ${Object.keys(editData).length !== 0 && editData === item ? 'bg-zinc-100 text-zinc-900' : ''}
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
                >{item[header]}</TableCell>
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
            <SheetTrigger asChild>
              <Button 
              variant='secondary'
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
  
          <Button
            className="bg-blue-600 hover:bg-blue-500"
            onClick={() => setFinished(true)}
          >
            Confirmar alterações
          </Button>
  
        </div>
        )
      }

    </div>
  )
}