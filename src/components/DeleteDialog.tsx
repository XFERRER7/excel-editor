'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { useState } from "react"

interface IDialogProps {
  children: React.ReactNode
  setConfirmDelete: React.Dispatch<React.SetStateAction<boolean>>
}

export const DeleteDialog = ({ children, setConfirmDelete }: IDialogProps) => {

  const [open, setOpen] = useState(false)

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      {children}
      <DialogContent className=" bg-zinc-900 text-white  border-zinc-900">
        <DialogHeader>
          <DialogTitle>Tem certeza que deseja excluir este item?</DialogTitle>
          <DialogDescription>
            Esta ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <Button
          className="bg-red-500 hover:bg-red-400"
          onClick={() => {
            setConfirmDelete(true)
            setOpen(false)
          }}>
          Excluir
        </Button>
      </DialogContent>
    </Dialog>
  )
}
