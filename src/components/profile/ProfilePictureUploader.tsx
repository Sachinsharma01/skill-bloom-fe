import React, { useState } from 'react'
import { toast } from 'sonner'
import { isNullOrUndefined } from '../../utils'
import { documentUpload } from '../../utils/storage'
import { BUCKET_NAMES } from '../../utils/constants'
import { makeAPICall } from '../../utils/api'
import { useDispatch, useSelector } from 'react-redux'
import metaDataActions from '../../redux/actions/metaDataActions'

const ProfilePictureUploader = ({ user }: { user: any }) => {
  const [preview, setPreview] = useState(user?.profile_picture)
  const [file, setFile] = useState(null)
  const [signedURL, setSignedURL] = useState(null)
  const { token } = useSelector((state: any) => state.tokenReducer)
  const dispatch = useDispatch()
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile))
    }
  }

  const handleSave = () => {
    toast.loading('Saving profile picture...')
    if (isNullOrUndefined(file)) {
      toast.error('Please upload an image')
      return
    }
    if (isNullOrUndefined(preview)) {
      toast.error('Please upload an image')
      return
    }
    documentUpload(file, BUCKET_NAMES.PROFILE).then((res: any) => {
      console.log('upload response', res)
      if (res.error) toast.error(res.message)
      if (res.data || res.url) {
        // toast.success('Saved profile picture!')
        console.log('signed url', res.url)
        setSignedURL(res.url)
      }
      dispatch(metaDataActions.setMetaData({ ...user, profile_image: res.url }))
      console.log('preview', signedURL)
      makeAPICall(
        'updateProfile',
        {
          profile_image: res.url,
          id: user.id,
        },
        token as string,
      ).then((res: any) => {
        if (res.error) toast.error(res.message)
        console.log('res', res)
        if (res) {
          console.log('res', res)
          // dispatch(setUser(res.data))
        }
        toast.dismiss()
      })
    })
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-2 text-sm text-gray-600">Minimum 200x200 pixels, Maximum 6000x6000 pixels</div>

      {/* Image preview */}
      <div className="border border-gray-300 bg-gray-50 p-6 mb-4 flex items-center justify-center rounded-lg h-64 w-full">
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="max-h-52 max-w-full object-contain rounded"
          />
        ) : (
          <div className="text-gray-400 text-6xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 w-20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A4.002 4.002 0 0112 15a4.002 4.002 0 016.879 2.804M15 11a3 3 0 10-6 0 3 3 0 006 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 14v7m0 0H9m3 0h3"
              />
            </svg>
          </div>
        )}
      </div>

      {/* File Input */}
      <div className="flex items-center gap-4 mb-6">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-white file:bg-purple-500 hover:file:bg-purple-600"
        />
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="px-4 py-2 bg-purple-300 text-white font-semibold rounded-md cursor-pointer hover:bg-purple-400 disabled:opacity-50"
        disabled={isNullOrUndefined(file) || isNullOrUndefined(preview)}
      >
        Save
      </button>
    </div>
  )
}

export default ProfilePictureUploader
