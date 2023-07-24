interface ITypographyH2Props {
  children: React.ReactNode
}

export function TypographyH1({ children }: ITypographyH2Props) {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-zinc-600">
      {children}
    </h1>
  )
}
