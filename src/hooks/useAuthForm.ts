import { changeAuthField, initializeForm, AuthFormKey } from '../redux/authSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLocalJoinMutation } from '../api/queries';
export const useAuthForm = () => {
    const [load, setLoad] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const userJoin = useLocalJoinMutation();
    const { form } = useAppSelector(({ auth }) => ({
        form: auth.register
    }));
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        dispatch(
            changeAuthField({
                form: 'register',
                key: name as AuthFormKey,
                value
            })
        );
    };
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoad(true);
        try {
            await userJoin[0]({
                id: form.user_id,
                password: form.password,
                nick: form.name
            }).unwrap();

            navigate('/');
            alert('회원가입이 완료되었습니다');
        } catch (error) {
            console.error('오류:', error);
        } finally {
            setLoad(false);
        }
    };
    useEffect(() => {
        dispatch(initializeForm('register'));
    }, [dispatch]);
    return { form, onChange, onSubmit, load };
};
