import style from './style.module.css';
import { auth } from '../../firebase/config';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';
import { authForm } from '../../assets/constants';
import FormInput from '../formInput';
import Btn from '../btn';

const AuthForm = ()=> {
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({});

    const form = authForm;

    const handleFormData = (e)=> {

        setFormData((prevForm)=> {
            const newForm = {...prevForm, 
                [e.target.name]: e.target.value
            }
            return newForm;
        })
    }

    async function handleSubmission(ev) {
        ev.preventDefault();

        setIsLoading(true);
        
        try {
            const userCred = await signInWithEmailAndPassword(auth, formData.email, formData.password);

            if(!userCred) {
                throw new Error();
            }

        } catch (error) {
            setError(error);
        }

        setIsLoading(false);
    }

    async function handlePwdReset() {
        const email = prompt('Entrez votre addresse email.');
        await sendPasswordResetEmail(auth, email);
        alert('Un email vous a été envoyé.')
    }

    return <form 
    className={`${style.form} flexColumn`} 
    onSubmit={(e)=> {handleSubmission(e)}}
    >
        <h2>{form.title}</h2>
        <div className={`${style.inputList} flexColumn`}>
            {form.input.map((input)=> {
                return <FormInput 
                    key={`${input.name}-key`} 
                    input={input} 
                    value={formData[input.name] ? formData[input.name] : ''}
                    onChange={handleFormData}
                />
            })}
            <Btn
            btnStyle="formBtn"
            text={form.btn}
            type="submit"
            onClick={null}
            />
            <Btn
            btnStyle="pwdResetBtn"
            text="Mot de passe oublié?"
            type="button"
            onClick={()=> {handlePwdReset()}}
            />
            {isLoading && <p className={style.formMess}>
            Connection en cours merci de patienter...
            </p>}
            {(error && !isLoading) && <p className={style.formMess}>
            Connection impossible. Email/mot de passe incorrect(s).
            </p>}
        </div>
    </form>
}

export default AuthForm;