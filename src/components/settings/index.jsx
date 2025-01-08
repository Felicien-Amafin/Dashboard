import style from './style.module.css';
import Btn from '../btn';
import { auth } from '../../firebase/config';
import { signOut, updatePassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/authSlice';
import { setCurrentWeekIndex, setProjectsList, setSearchTerm } from '../../store/projectsListSlice';
import { useState } from 'react';
import FormModal from '../formModal';
import { passwordForm } from '../../assets/constants';
import AlertBox from '../alertBox';

const Settings = ()=> {
    const [isFormOpened, setIsFormOpened] = useState(false);
    const [taskCompletedMess, setTaskCompletedMess] = useState('');
    const dispatch = useDispatch();

    const form = passwordForm;

    const handleSignOut = ()=> {
        signOut(auth)
        .then(()=> {
            dispatch(setUser(null));
            dispatch(setProjectsList(null));
            dispatch(setSearchTerm(''));
            dispatch(setCurrentWeekIndex(0));
        })
        .catch((error) => {
            alert(error);
        });
    }

    const handlePassWordChange = (e, formData)=> {
        e.preventDefault();
        const user = auth.currentUser;
        const password = formData.password;
        updatePassword(user, password)
        .then(()=> {
            setIsFormOpened(false);
            setTaskCompletedMess('Changement de mot de passe effectué.')
        })
        .catch((error) => {
            alert(error);
        });
    }

    return <>
        <ul className={`${style.settings} flexColumn`}>
            <li>
                <Btn
                btnStyle="settingBtn"
                text="Déconnexion"
                type="button"
                onClick={handleSignOut}
                />
            </li>
            <li>
                <Btn
                btnStyle="settingBtn"
                text="Changer de mot de passe"
                type="button"
                onClick={()=> {setIsFormOpened(true)}}
                />
            </li>
        </ul>
        {isFormOpened && <FormModal
        onSubmit={handlePassWordChange}
        onClose={()=> {setIsFormOpened(false)}}
        form={form}
        values={null}
        />}
        {taskCompletedMess && <AlertBox mess={taskCompletedMess}>
        <Btn
        btnStyle="alertBtn"
        text="OK"
        type="button"
        onClick={()=> {setTaskCompletedMess('')}}
        />
      </AlertBox>}
    </>
}

export default Settings;