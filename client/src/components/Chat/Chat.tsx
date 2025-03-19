const Chat = () => {
  return (
    <div className="border-1 h-full border-gray-300 flex flex-col items-center justify-between rounded">
      <div>
        Mostrar mensajes
      </div>
      <div className="w-full flex">
        <input className="font-medium border-gray-400 py-3 px-4 block w-full border text-sm focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:outline-none dark:text-white dark:placeholder-gray-400" type="text" placeholder="Enter message" />
        <button className="text-white px-2 bg-blue-400">Enviar</button>
      </div>
    </div>
  )
}

export default Chat