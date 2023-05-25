



const LoadingView = ({children,text=""}) => {
  return (
    <main className="w-full h-[80vh] flex flex-col justify-center items-center">
         <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
        <h1 className="text-2xl font-bold text-black mb-2">{text}</h1>
        {children}
    </main>
  )
}

export default LoadingView