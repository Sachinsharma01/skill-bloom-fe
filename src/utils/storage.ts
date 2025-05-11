import supabase from "../supabase"

const documentUpload = async (file: File, bucketName: string, fileName: string | undefined = undefined) => {
    if (!file) return
    try {
        const { data, error } : { data: any, error: any } = await supabase.storage.from(bucketName).upload(fileName ?? file.name, file)
        console.log("data", data)
        if (error) {
            console.log("Error uploading file to supabase", error)
            return {
                error: true, 
                message: 'Error uploading file to server, please try again later'
            }
        }
        const signedURL = await getSignedURL(bucketName, file.name)
        return {
            error: false,
            message: 'File uploaded successfully',
            url: signedURL.data
        }
    } catch (error) {
        console.error(error)
        return {
            error: true,
            message: 'Error uploading file to server, please try again later'
        }
    }
}

const getSignedURL = async (bucketName: string, fileName: string) => {
    const { data, error } : { data: any, error: any } = await supabase.storage.from(bucketName).createSignedUrl(fileName, 60000000)
    if (error) {
        console.log("Error getting signed url", error)
        return {
            error: true,
            message: 'Error getting signed url'
        }
    }
    return {
        error: false,
        message: 'Signed url retrieved successfully',
        data: data.signedUrl
    }
}

export { documentUpload }