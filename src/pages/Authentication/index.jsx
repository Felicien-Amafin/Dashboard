import style from './style.module.css';
import AuthForm from "../../components/form/authForm";

const Authentication = ()=> {
    return <section className={`${style.authContainer} flexColumn`}>
       <AuthForm/>
    </section>
}

export default Authentication;