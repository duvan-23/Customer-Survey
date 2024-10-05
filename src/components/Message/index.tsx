import { useFormContext } from "../../contexts/Form/context";

const Message = ()=>{
    const {
        openModal
      }=useFormContext();
    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/10`}>
            <div className="relative bg-gradient-to-r from-indigo-200 via-purple-300 to-pink-200 rounded-lg shadow-lg overflow-hidden w-full max-w-lg">
                <div className="p-8 space-y-4 text-center">
                    <h3 className="text-3xl font-semibold italic text-gray-800 mb-2">
                        Dear Customer
                    </h3>
                    <p className="text-gray-700 text-base leading-relaxed">
                        {openModal.text}
                    </p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-300 to-blue-400"></div>
            </div>
        </div>
    );
};

export { Message }