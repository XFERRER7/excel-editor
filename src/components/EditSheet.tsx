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
  values: string[]
  setEditData: React.Dispatch<React.SetStateAction<UnknownObject>>
}

export const EditSheet = ({ children, inputs, values, setEditData }: IEditSheetProps) => {

  const [formData, setFormData] = useState<UnknownObject>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }))
  }

  function saveData() {

    setEditData(formData)

    setFormData({})
  }

  useEffect(() => {
    inputs.forEach((input) => {
      setFormData((prevFormData) => ({ ...prevFormData, [input]: values[inputs.indexOf(input)] }))
    })
  }, [values])

  return (
    <Sheet>
      {children}
      <SheetContent
        className="min-w-[400px] bg-zinc-200 text-zinc-700 border-l border-0"
        side='left'
      >
        <SheetHeader>
          <SheetTitle className="text-zinc-700">Edite os dados</SheetTitle>
          <SheetDescription className="text-zinc-500">
            Faça alterações nos dados aqui. Clique em salvar quando terminar.
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
            <Button
              className="bg-blue-600"
              onClick={() => saveData()}
            >Salvar</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
