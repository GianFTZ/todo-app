import { useEffect } from "react";
import { useState } from "react";
import { WriteSVG } from "../svgs/writeSvg";


interface CardProps {
    TO_DO_LIST: any[];
}

export const Card_Component = ({TO_DO_LIST}: CardProps) => {
  
  const [toDos, setTodos] = useState<any[]>([
    ...TO_DO_LIST
  ])

  const [ID, setID] = useState(0)
  

  const handleDeleteClick = async () => {
    console.log("clicou")
    await fetch("/api/todo", {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: `${ID}`,
        description: 'sla'
      })
})
  }
  useEffect(()=>{console.log(`mudou, ${typeof(ID)}, ${ID}`)}, [ID])
    return (
        <div>

          {toDos.map((item: any, index: number) => (
            <div key={index + 1}  className="flex justify-center">
              <div className=" relative justify-center mt-6">
                <div className="absolute flex top-0 right-0 p-3 space-x-1">
                  <span>
                    <WriteSVG />
                  </span>
                  <span onClick={()=>{ setID(index), handleDeleteClick()}}>
                  <svg  xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                  </span>
                </div>
                <span className="absolute -left-3 -top-3 bg-green-500 flex justify-center items-center rounded-full w-8 h-8 text-gray-50 font-bold">
                  {index}
                </span>
                <p className="bg-white px-12 py-8 rounded-lg w-80">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
    )
}