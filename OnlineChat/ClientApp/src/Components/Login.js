import React from 'react';

const Login = (props) => {
    return (
        <div className="card card-body sans d-inline-block text-right">
            <input className="form-control mb-2 rtl" placeholder="نام کاربری..." onChange={props.user} />
            <input className="form-control mb-2 rtl" placeholder="رمز عبور..." onChange={props.pass} type="password" />
            <button className="btn btn-primary float-left" onClick={props.login}>
                {props.loading && (
                    <div className="spinner-border loading-sm align-middle mr-1 mt-1" role="status">
                        <span className="sr-only"></span>
                    </div>
                )}
                ورود
            </button>
            <a className="float-right mt-2" href="#">ثبت نام</a>
        </div>
    )
}

export default Login;