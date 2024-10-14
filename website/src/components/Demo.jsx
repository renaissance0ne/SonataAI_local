import React, { useState, useCallback, useRef } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { X } from 'lucide-react';

const API_URL = 'http://localhost:5000';

const Demo = () => {
    const [files, setFiles] = useState([]);
    const [predictions, setPredictions] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);

    const onDrop = useCallback((acceptedFiles) => {
        setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const removeFile = (fileToRemove) => {
        setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToRemove));
        setPredictions((prevPredictions) => {
            const newPredictions = { ...prevPredictions };
            Object.keys(newPredictions).forEach(genre => {
                newPredictions[genre] = newPredictions[genre].filter(song => song !== fileToRemove.name);
            });
            return newPredictions;
        });
    };

    const handleSubmit = async () => {
        if (files.length === 0) {
            fileInputRef.current.click();
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const results = await Promise.all(
                files.map(async (file) => {
                    const formData = new FormData();
                    formData.append('file', file);
                    const response = await axios.post(`${API_URL}/predict`, formData, {
                        headers: { 'Content-Type': 'multipart/form-data' }
                    });
                    return { name: file.name, genre: response.data.genre };
                })
            );

            const newPredictions = results.reduce((acc, result) => {
                if (!acc[result.genre]) {
                    acc[result.genre] = [];
                }
                acc[result.genre].push(result.name);
                return acc;
            }, {});

            setPredictions(newPredictions);
        } catch (error) {
            console.error('Error:', error);
            setError(error.response ? error.response.data : error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileInputChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    };

    return (
        <div className="w-full md:max-w-lg lg:max-w-2xl p-6 border rounded shadow">
            <div
                {...getRootProps()}
                className={`h-48 md:h-64 lg:h-64 border-2 border-dashed rounded flex items-center justify-center cursor-pointer ${
                    isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
            >
                <input {...getInputProps()} accept="audio/*" />
                <p className="text-center text-white font-medium text-lg">
                    {isDragActive
                        ? 'Drop the audio files here...'
                        : 'Drag audio files or click to upload'}
                </p>
            </div>
    
            {files.length > 0 && (
                <div className="mt-4">
                    <h3 className="font-semibold blue_gradient mb-2">Uploaded Files:</h3>
                    <ul className="space-y-2">
                        {files.map((file) => (
                            <li key={file.name} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                                <span className="truncate">{file.name}</span>
                                <button
                                    onClick={() => removeFile(file)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <X size={18} />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
    
            <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`mt-4 w-full p-2 rounded-3xl border-2 border-white ${
                    isLoading ? 'bg-gray-400' : 'blue_gradient hover:bg-blue-600'
                } text-white font-medium transition duration-300 ease-in-out flex items-center justify-center`}
            >
                {isLoading ? (
                    <>
                        Processing...
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
                    </>
                ) : (
                    files.length > 0 ? 'Predict Genres' : 'Upload audio files'
                )}
            </button>
    
            <input
                ref={fileInputRef}
                type="file"
                accept="audio/*"
                multiple
                onChange={handleFileInputChange}
                className="hidden"
            />
    
            {Object.keys(predictions).length > 0 && (
                <div className="mt-4">
                    <h3 className="font-semibold text-white text-lg mb-2 blue_gradient">Genres:</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {Object.entries(predictions).map(([genre, songs]) => (
                            <div key={genre} className="bg-gray-100 p-4 rounded">
                                <p className="font-medium orange_gradient">{genre}</p>
                                <ul className="list-disc list-inside text-sm font-semibold text-gray-600 mt-1">
                                    {songs.map((song, index) => (
                                        <li key={index} className="truncate">{song}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            )}
    
            {error && (
                <div className="mt-4 text-center text-red-500">
                    <p>Error: {error.toString()}</p>
                </div>
            )}
    
            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                .animate-spin {
                    animation: spin 1s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default Demo;