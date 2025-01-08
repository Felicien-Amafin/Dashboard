import style from './style.module.css';

const FormInput = ({input, onChange, value})=> {
    return <div className={`${style.formInput} flexColumn`}>
        <label htmlFor={input.label}>{input.label}</label>
        <input 
        className="formElmt" 
        type={input.type} 
        name={input.name} 
        required 
        onChange={onChange}
        value={value}
        />
    </div>
}

export default FormInput;