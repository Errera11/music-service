import React, {useState} from 'react';
import Layout from "@/components/Layout";
import Stepper from "@/components/stepper";
import styles from '../../styles/tracks/createTrack.module.scss'
import Button from "@/components/Button";
import FileUpload from "@/components/FileUpload";

const CreateTrack = () => {
    const [activeStep, setActiveStep] = useState(0)
    const backStep = () => {
        if (activeStep > 0) setActiveStep(prev => prev -= 1)
    }
    const forwardStep = () => {
        if (activeStep < 3) setActiveStep(prev => prev += 1)

    }
    const [image, setImage] = useState()
    const [audio, setAudio] = useState()
    return (
        <Layout>
            <Stepper activeStep={activeStep}>
                <div>
                    {activeStep == 0 && <div className={styles.stepOne}>
                        <h3>Step One</h3>
                        <input type={'text'} placeholder={'Track title'}/>
                        <input type={'text'} placeholder={'Artist name'}/>
                        <input type={'text'} placeholder={'Text description'}/>
                    </div>}
                    {activeStep == 1 && <div>
                        <h3>Step Two</h3>
                        <FileUpload setFile={setImage} accept={'image/*'}><div>Image Upload</div></FileUpload>
                    </div>}
                    {activeStep == 2 && <div>
                        <h3>Step Three</h3>
                        <FileUpload setFile={setAudio} accept={'audio/*'}><div>Audio Upload</div></FileUpload>
                    </div>}
                </div>
            </Stepper>
            <div className={styles.btns}>
                <Button onClick={backStep}>Back</Button>
                <Button onClick={forwardStep}>Next</Button>
            </div>

        </Layout>
    )
        ;
};

export default CreateTrack;