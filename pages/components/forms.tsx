import { useState } from "react"

export const Forms_Component = () => {
  const [description, setDescription] = useState ("")
  const handleCreateClick = async () => {
    console.log("handleCreate")
    await fetch("/api/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        description: `${description}`
      })
    })
  }
  
    return (
        <form className="flex justify-center mt-10">
          <div className="bg-gray-50 p-8 rounded-lg">
            <h1 className="text-center mb-4">To-Do Create</h1>
            <div className="flex space-x-2 p-2 bg-white rounded-md">
              <input
                value={description}
                onChange={(e) => setDescription(e.currentTarget.value)}
                type="text"
                placeholder="Write here..."
                className="w-full outline-none"
              />
              <button 
              onClick={()=>handleCreateClick()}
              className="bg-green-500 px-2 py-1 rounded-md text-white font-semibold">
                send    
              </button>
            </div>
          </div>
        </form>
    )
}