import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"
import { UnknownObject } from "./BoardActions"

interface IEditSheetProps {
  children: React.ReactNode
  inputs: string[]
  setCreatedItemData: React.Dispatch<React.SetStateAction<UnknownObject>>
}

export const AddItemSheet = ({ children, inputs, setCreatedItemData }: IEditSheetProps) => {

  const [formData, setFormData] = useState<UnknownObject>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }))
  }

  function saveData() {
    
    setCreatedItemData(formData)
    
    setFormData({})
  }

  return (
    <Sheet>
      {children}
      <SheetContent
        className="min-w-[400px] bg-zinc-900 text-white border-l border-zinc-900"
      >
        <SheetHeader>
          <SheetTitle className="text-white">Adicione um novo dado</SheetTitle>
          <SheetDescription className="text-zinc-300">
            Adicione um novo item para sua lista de dados
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">

          {
            inputs.map((input) => (
              <div key={input} className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor={input} className="text-right">
                  {input}
                </Label>
                <Input
                  id={input}
                  name={input}
                  className="col-span-3 text-black"
                  value={
                    formData[input] ? formData[input] : ''
                  }
                  onChange={handleInputChange}
                />
              </div>
            ))
          }

        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant='secondary' type="submit"
              onClick={() => saveData()}
            >Adicionar</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
