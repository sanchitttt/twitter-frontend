import React, { useState } from 'react';
import ReactFileReader from 'react-file-reader';
import EditNewImageStory from '../EditNewImageStory';
import Modal from '@mui/material/Modal'
import './styles.css';
import EditNewTextStory from '../EditNewTextStory';
import { Alert, AlertTitle, SnackbarContent } from '@mui/material';

function CreateNewStory({ setShowCreateNewStory }) {
    const [imageList, setImageList] = useState([]);
    const [showEditImageStory, setShowEditmageStory] = useState(false);
    const [showEditTextStory, setShowEditTextStory] = useState(false);
    const [showError,setShowError] = useState(false);

    const handleFiles = (files) => {
        let fileType = files.fileList[0].type;
        if (fileType.match(/image/g) !== null) {
            setImageList(files.base64);
            setShowEditmageStory(true);
            if(showError) setShowError(false);
        }
        else {
            setShowError(true)
        }   

    };

    return (
        <div id='createNewStoryContainer'>

            <div>
                <div id='createNewStoryCloseContainer' onClick={() => setShowCreateNewStory(false)}>
                    <img src='https://i.ibb.co/Hd13mN0/wrong-black.png' alt='closeIcon' />
                </div>
                <div></div>
            </div>


            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <input type='file' id='createImageStoryFileInput' style={{ display: 'none' }} />
                <ReactFileReader
                    fileTypes={[".csv", ".zip"]}
                    base64={true}
                    multipleFiles={true}
                    handleFiles={handleFiles}
                >
                    <div className='newStoryOptionsContainer' id='newStoryImage'>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div className='newStoryOptionsImageContainer'><img src='https://i.ibb.co/pzH0n5n/image-2.png' /></div>
                            <div className='newStoryOptionsText'>Create a photo story</div>
                        </div>
                    </div>
                </ReactFileReader>
                <div className='newStoryOptionsContainer' id='newStoryText'
                    onClick={() => setShowEditTextStory(true)}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div className='newStoryOptionsImageContainer'><img src='https://cdn-icons-png.flaticon.com/512/8988/8988943.png' /></div>
                        <div className='newStoryOptionsText'>Create a text story</div>
                    </div>
                </div>

            </div>

            <div></div>
            {showError && <Alert severity="info">
                <AlertTitle>Error uploading files</AlertTitle>
                Invalid file format
            </Alert>}
            <Modal open={showEditImageStory}>
                <div style={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <EditNewImageStory imageList={imageList} setShowEditmageStory={setShowEditmageStory} />
                </div>
            </Modal>

            <Modal open={showEditTextStory}>
                <div style={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <EditNewTextStory setShowEditTextStory={setShowEditTextStory} />
                </div>
            </Modal>

        </div>
    )
}

export default CreateNewStory;