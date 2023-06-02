import React, {useState} from 'react';
import Layout from "@/components/Layout";
import Stepper from "@/components/stepper";
import axios from "axios";
import styles from "@/styles/tracks/createTrack.module.scss";
import FileUpload from "@/components/FileUpload";
import Button from "@/components/Button";

const CreateAlbum = () => {
    const steps = ['Album Info', 'Download label']
    const [activeStep, setActiveStep] = useState(0)
    const [image, setImage] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [stepError, setStepError] = useState(false)
    const backStep = () => {
        if (activeStep > 0) setActiveStep(prev => prev -= 1)
    }
    const forwardStep = () => {
        if (!description || !title) return setStepError(true)
        if (activeStep < 1) {
            setActiveStep(prev => prev += 1)
            setStepError(false)
        } else {
            const formData = new FormData()
            formData.append('name', title)
            formData.append('description', description)
            formData.append('image', image)
            axios.post(process.env.NEXT_PUBLIC_GET_ALBUMS as string, formData)
                .then(res => setActiveStep(prev => prev += 1))
                .catch(err => console.log(err))
        }
    }

    return (
        <Layout title={'Create Track'}>
            <>
                <Stepper activeStep={activeStep} steps={steps}>
                    <div>
                        {activeStep == 0 && <div className={styles.stepOne}>
                            <h3>Step One</h3>
                            <input
                                onChange={e => setTitle(e.target.value)}
                                value={title}
                                type={'text'} placeholder={'Album title'}
                                style={!description && stepError ? {border: 'solid red 2px', borderRadius: '15px'} : {}}
                            />
                            <input
                                onChange={e => setDescription(e.target.value)}
                                value={description}
                                type={'text'} placeholder={'Album description'}
                                style={!description && stepError ? {border: 'solid red 2px', borderRadius: '15px'} : {}}
                            />
                        </div>}
                        {activeStep == 1 && <div className={styles.stepTwo}>
                            <h3>Step Two</h3>
                            <FileUpload setFile={setImage} accept={'image/*'}>
                                <div>Image Upload</div>
                            </FileUpload>
                            {image && <div>{(image as any).name}</div>}
                        </div>}
                        {activeStep == 2 && <div className={styles.stepFinal}>
                            <h3>Album created!</h3>
                        </div>}
                    </div>
                </Stepper>
                {activeStep != 2 &&
                    <div className={styles.btns}>
                        <Button onClick={backStep}>Back</Button>
                        <Button onClick={forwardStep}>Next</Button>
                    </div>
                }
            </>
        </Layout>
    )
        ;
};

export default CreateAlbum;