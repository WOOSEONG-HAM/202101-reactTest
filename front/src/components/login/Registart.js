import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import './login.css';

import { RegisterAPI } from '../../api/loginAPI';

const Registart = (props) => {
    
    const [registartData, setRegistartData] = useState({
        userId: '',
        password: '',
        name: '',
    })
    const onClick = () => {
        RegisterAPI(registartData);
        props.history.push('/');
    }
    const onChangeId = (e) => {
        setRegistartData({
            ...registartData,
            userId: e.target.value,
        })
    }
    const onChangePw = (e) => {
        setRegistartData({
            ...registartData,
            password: e.target.value,
        })
    }
    const onChangeName = (e) => {
        setRegistartData({
            ...registartData,
            name: e.target.value,
        })
    }

    return(
        <>
            <div className="login-page">
                <div className="form">
                <div className="login-form">
                    <input type="text" name="userId" placeholder="아이디" onChange={onChangeId}/>
                    <input type="password" name="password" placeholder="비밀번호" onChange={onChangePw}/>
                    <input type="text" name="name" placeholder="이름" onChange={onChangeName}/>
                    <input type="button" className="button registerBtn" value="회원가입" onClick={onClick}/>
                    <p className="message">이미 가입하셨나요? <Link to="/login">로그인</Link></p>
                </div>
                </div>
            </div>
        </>
    )
}

export default withRouter(Registart);