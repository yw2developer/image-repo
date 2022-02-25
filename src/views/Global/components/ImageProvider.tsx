import React, { useState } from 'react';

export type ImageProviderProps = {
    deletedPrimaryKey: string | undefined,
    setDeletedPrimaryKey: (key: string) => void
};

export const ImageContext = React.createContext<ImageProviderProps>({
    deletedPrimaryKey: undefined,
    setDeletedPrimaryKey: () => { console.log("Not set") }
});

const ImageProvider = ({ children }: any) => {

    const [ deletedPrimaryKey, setDeletedPrimaryKey ] = useState<string>()

    return (
        <ImageContext.Provider
            value={{
                deletedPrimaryKey,
                setDeletedPrimaryKey
            }}>
                {children}
        </ImageContext.Provider>
    );
}

export default ImageProvider;