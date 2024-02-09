import { changeAuthField, initializeForm, AuthFormKey, AuthState } from '../redux/authSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const useAuthForm = (form: AuthState['login' | 'register'], func: any, auth: string) => {
    const [load, setLoad] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        if (auth === 'register') {
            dispatch(
                changeAuthField({
                    form: 'register',
                    key: name as AuthFormKey,
                    value
                })
            );
        } else if (auth === 'login') {
            dispatch(
                changeAuthField({
                    form: 'login',
                    key: name as AuthFormKey,
                    value
                })
            );
        }
    };
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoad(true);
        try {
            if (auth === 'register') {
                await func[0]({
                    id: form.user_id,
                    password: form.password,
                    nick: (form as AuthState['register']).name
                }).unwrap();
            } else if (auth === 'login') {
                await func[0]({ id: form.user_id, password: form.password }).unwrap();
            }

            navigate('/');
            if (auth === 'register') {
                alert('회원가입이 완료되었습니다');
            }
        } catch (error) {
            console.error('오류:', error);
        } finally {
            setLoad(false);
        }
    };
    useEffect(() => {
        if (auth === 'register') dispatch(initializeForm('register'));
        else if (auth === 'login') dispatch(initializeForm('login'));
    }, [dispatch]);
    return { onChange, onSubmit, load };
};
