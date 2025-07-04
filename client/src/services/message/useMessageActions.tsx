import { User } from '@/types/types.d'
import { Socket } from 'socket.io-client'

export const handleSendMessage = (
  socket: Socket,
  imageFile: File | null,
  idRoom: string | undefined,
  inputValue: string,
  user: User | null,
  setImageFile: (arg: File | null) => void,
) => {
  if (imageFile === null) {
    socket.emit('send_message', {
      roomID: idRoom,
      text: inputValue,
      id_user: user?._id,
      filename: null,
      buffer: null,
    })
  } else {
    const reader = new FileReader()
    reader.onload = () => {
      const base64string = reader.result
      if (base64string) {
        socket.emit('send_message', {
          roomID: idRoom,
          text: inputValue,
          id_user: user?._id,
          filename: imageFile.name,
          buffer: base64string,
        })
        setImageFile(null)
      }
    }
    reader.readAsDataURL(imageFile)
  }
}
