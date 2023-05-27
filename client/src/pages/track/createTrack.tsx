import React, {useState} from 'react';
import Layout from "@/components/Layout";
import Stepper from "@/components/stepper";
import styles from '../../styles/tracks/createTrack.module.scss'
import Button from "@/components/Button";
import FileUpload from "@/components/FileUpload";
import axios from "axios";

const CreateTrack = () => {
    const [activeStep, setActiveStep] = useState(0)
    const [image, setImage] = useState('')
    const [audio, setAudio] = useState('')
    const [artist, setArtist] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [stepError, setStepError] = useState(false)
    const backStep = () => {
        if (activeStep > 0) setActiveStep(prev => prev -= 1)
    }
    const forwardStep = () => {
        if(!artist || !title || !description) return setStepError(true)
        if (activeStep < 2) {
            setActiveStep(prev => prev += 1)
            setStepError(false)
        } else {
            const formData = new FormData()
            formData.append('name', title)
            formData.append('artist', artist)
            formData.append('description', description)
            formData.append('image', image)
            formData.append('audio', audio)
            axios.post(process.env.NEXT_PUBLIC_GET_TRACKS, formData)
                .then(res => setActiveStep(prev => prev += 1))
                .catch(err => console.log(err))
        }
    }

    return (
        <Layout>
            <Stepper activeStep={activeStep}>
                <div>
                    {activeStep == 0 && <div className={styles.stepOne}>
                        <h3>Step One</h3>
                            <input
                                onChange={e => setTitle(e.target.value)}
                                value={title}
                                type={'text'} placeholder={'Track title'}
                                style={!title && stepError ? {border: 'solid red 2px', borderRadius: '15px'} : {}}
                            />
                            <input
                                onChange={e => setArtist(e.target.value)}
                                value={artist}
                                type={'text'} placeholder={'Artist name'}
                                style={!artist && stepError ? {border: 'solid red 2px', borderRadius: '15px'} : {}}
                            />
                            <input
                                onChange={e => setDescription(e.target.value)}
                                value={description}
                                type={'text'} placeholder={'Text description'}
                                style={!description && stepError ? {border: 'solid red 2px', borderRadius: '15px'} : {}}
                            />
                    </div>}
                    {activeStep == 1 && <div className={styles.stepTwo}>
                        <h3>Step Two</h3>
                        <FileUpload setFile={setImage} accept={'image/*'}><div>Image Upload</div></FileUpload>
                        {image && <div>{image.name}</div>}
                    </div>}
                    {activeStep == 2 && <div className={styles.stepThree}>
                        <h3>Step Three</h3>
                        <FileUpload setFile={setAudio} accept={'audio/*'}><div>Audio Upload</div></FileUpload>
                        {audio && <div>{audio.name}</div>}
                    </div>}
                    {activeStep == 3 && <div className={styles.stepFinal}>
                        <h3>Your track submitted!</h3>
                    </div>}
                </div>
            </Stepper>
            {activeStep != 3 &&
            <div className={styles.btns}>
                <Button onClick={backStep}>Back</Button>
                <Button onClick={forwardStep}>Next</Button>
            </div>
            }

        </Layout>
    )
        ;
};

export default CreateTrack;