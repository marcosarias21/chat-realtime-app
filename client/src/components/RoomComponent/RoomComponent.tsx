import { useAuthStore } from '@/store/authStore'
import { MessageChat } from '@/types/types.d'

type Prop = {
  contentChat?: MessageChat[]
}

const RoomComponent: React.FC<Prop> = ({ contentChat }) => {
  const { user } = useAuthStore()
  return (
    <div className="flex min-h-[60%] w-full flex-col items-center justify-between rounded border-1 border-gray-300">
      <div className="h-full w-full overflow-y-scroll p-2">
        {contentChat?.map((content, index) => (
          <div
            className={`mb-1 flex ${content?.user?.username != user?.username && 'justify-end text-gray-700'}`}
            key={index}
          >
            <div
              className={`flex flex-col bg-blue-500 px-3 py-3 font-medium ${content?.user?.username !== user?.username ? 'flex flex-col rounded-t-2xl rounded-l-2xl bg-gray-300 text-gray-700' : 'rounded-t-2xl rounded-r-2xl text-white/90'}`}
            >
              <p>{content.message}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex w-full">
        <input
          className="block w-full border border-gray-400 px-4 py-3 text-sm font-medium focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:outline-none dark:text-white dark:placeholder-gray-400"
          type="text"
          placeholder="Enter message"
        />
        <button className="bg-blue-400 px-2 text-white">Enviar</button>
      </div>
    </div>
  )
}

export default RoomComponent
