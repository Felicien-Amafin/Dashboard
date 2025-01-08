import FormInput from '../formInput';
import Btn from '../btn';
import style from './style.module.css';
import { useState } from 'react';

const ProjectForm = ({onSubmit, form, values})=> {
    const [ formData, setFormData ] = useState({...values});

    const handleFormData = (e)=> {
        setFormData((prevForm)=> {
            const newForm = {...prevForm, 
                [e.target.name]: e.target.value
            }
            return newForm;
        })
    }

    return <form 
    className={`${style.form} flexColumn`} 
    onSubmit={(e)=> {onSubmit(e, formData)}}
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
        </div>
    </form>
}

export default ProjectForm;
