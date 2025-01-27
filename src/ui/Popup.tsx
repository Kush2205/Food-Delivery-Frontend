import { motion } from 'framer-motion'

function Popup({ message, closePopup }: { message: string, closePopup: () => void }) {
  return (
    <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative bg-neutral-800 p-8 w-[400px] h-[200px] rounded-lg shadow-lg text-center flex flex-col justify-center items-center"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            <div className="absolute -top-8 mt-12 left-1/2 transform -translate-x-1/2">
              
            </div>
            
            <p className="text-white text-2xl mb-4">{message}</p>
            <button
              onClick={closePopup}
              className="mt-4 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
  )
}

export default Popup