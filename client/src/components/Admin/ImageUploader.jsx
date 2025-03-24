import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";

const ImageUploader = ({ image, setImage }) => {
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file); 
        }
    };

    return (
        <div className="flex flex-col items-center">
            <label className="cursor-pointer flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg bg-gray-100 hover:bg-gray-200">
                {image ? (
                    <img src={URL.createObjectURL(image)} alt="Uploaded" className="w-full h-full object-cover rounded-lg" />
                ) : (
                    <div className="text-center">
                        <FontAwesomeIcon icon={faCloudUploadAlt} className="text-4xl text-gray-500" />
                        <p className="text-gray-500">Click to upload image</p>
                    </div>
                )}
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </label>
        </div>
    );
};

export default ImageUploader;
