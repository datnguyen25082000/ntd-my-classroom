import React, { useState, useEffect } from 'react';
import { Tabs, Input, ModalCenter } from '../../components/common';
import { Button } from 'react-bootstrap';
import { MdFacebook } from 'react-icons/md';
import { AiFillGooglePlusCircle } from 'react-icons/ai';
import './Login.scss';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector, doLogin, doRegister } from '../../redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { EToken } from '../../constants';
import { SvgLogin } from '../../constants/images';

export const Login: React.FC<any> = ({ isOpen, setIsOpen }) => {
  const dispatch = useAppDispatch();

  const [message, setMessage] = useState('');
  const [kindModal, setKindModal] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const {
    register: register2,
    formState: { errors: errors2 },
    watch: watch2,
    handleSubmit: handleSubmit2,
  } = useForm();

  const onSubmit = (data: any) => {
    if (kindModal === 1) {
      const value = { username: data.login_username, password: data.login_password };

      dispatch(doLogin(value))
        .then(unwrapResult)
        .then((res: IResLogin) => {
          if (res.content && res.content.token) {
            const token = res.content.token;
            window.localStorage.setItem(EToken.loginToken, token);
            window.location.replace('/');
          } else {
            setMessage(res.message);
            setShowModal(true);
          }
        });
    } else if (kindModal === 2) {
      const value = {
        username: data.register_username,
        password: data.register_password,
        fullname: data.register_fullname,
      };

      dispatch(doRegister(value))
        .then(unwrapResult)
        .then((res: IResLogin) => {
          setMessage(res.message);
          setShowModal(true);
        });
    }
  };

  return (
    <div className="login-container">
      <img src={SvgLogin} alt="Image" />
      <div className="login-modal">
        <h1>NTD Classroom</h1>
        <Tabs
          titleTabs={[
            <div
              className="login-modal__title"
              onClick={() => {
                setKindModal(1);
              }}
            >
              <span>????ng nh???p</span> <hr />
            </div>,
            <div
              className="login-modal__title"
              onClick={() => {
                setKindModal(2);
              }}
            >
              <span>????ng k??</span> <hr />
            </div>,
            ,
          ]}
          bodyTabs={[
            <div className="login-modal__login">
              <Input
                label="T??n ????ng nh???p"
                type="text"
                placeholder="Nh???p t??n ????ng nh???p"
                {...register('login_username', {
                  required: 'Vui l??ng nh???p t??n ????ng nh???p',
                  maxLength: 40,
                })}
                error={errors.login_username ? errors.login_username.message : ''}
              />
              <Input
                label="M???t kh???u"
                type="password"
                showPassword={true}
                placeholder="Nh???p m???t kh???u"
                {...register('login_password', {
                  required: 'Vui l??ng nh???p m???t kh???u',
                  maxLength: 40,
                })}
                error={errors.login_password ? errors.login_password.message : ''}
              />
              <span className="login-modal__forgot-pass">Qu??n m???t kh???u?</span>
              <div className="login-modal__group-btn">
                <Button
                  variant={
                    watch('login_username') && watch('login_password') ? 'primary' : 'secondary'
                  }
                  disabled={watch('login_username') && watch('login_password') ? false : true}
                  className="login-modal__btn"
                  onClick={handleSubmit(onSubmit)}
                >
                  ????ng nh???p
                </Button>
                <Button variant="primary" className="login-modal__btn">
                  <MdFacebook size={25} /> <span>????ng nh???p b???ng Facebook</span>
                </Button>
                <Button className="login-modal__btn login-modal__btn--google">
                  <AiFillGooglePlusCircle size={25} />
                  <span>????ng nh???p b???ng Google+</span>
                </Button>
              </div>
            </div>,
            <div className="login-modal__register">
              <Input
                label="T??n ????ng nh???p"
                type="text"
                placeholder="Nh???p t??n ????ng nh???p"
                // titleAction="G???i m?? OTP"
                {...register2('register_username', {
                  required: 'Vui l??ng nh???p t??n ????ng nh???p',
                  maxLength: 40,
                })}
                error={errors2.register_username ? errors2.register_username.message : ''}
              />
              <Input
                label="H??? v?? t??n"
                type="text"
                placeholder="Nh???p h??? v?? t??n"
                // titleAction="G???i m?? OTP"
                {...register2('register_fullname', {
                  required: 'Vui l??ng nh???p h??? v?? t??n',
                  maxLength: 40,
                })}
                error={errors2.register_fullname ? errors2.register_fullname.message : ''}
              />
              <div className="login-modal__password">
                <Input
                  label="M???t kh???u"
                  type="password"
                  showPassword={true}
                  placeholder="Nh???p m???t kh???u"
                  {...register2('register_password', {
                    required: 'Vui l??ng nh???p m???t kh???u',
                    maxLength: 40,
                  })}
                  error={errors2.register_password ? errors2.register_password.message : ''}
                />
                <Input
                  label="Nh???p l???i m???t kh???u"
                  type="password"
                  showPassword={true}
                  placeholder="Nh???p l???i m???t kh???u"
                  {...register2('register_repassword', {
                    required: 'Nh???p l???i m???t kh???u kh??ng ch??nh x??c',
                    // minLength: { value: 6, message: 'Nh???p l???i m???t kh???u kh??ng ch??nh x??c' },
                    validate: (value) =>
                      value === watch2('register_repassword') ||
                      'Nh???p l???i m???t kh???u kh??ng ch??nh x??c',
                  })}
                  error={errors2.register_repassword ? errors2.register_repassword.message : ''}
                />
              </div>

              <div className="login-modal__group-btn">
                <Button
                  variant="primary"
                  className="login-modal__btn"
                  onClick={handleSubmit2(onSubmit)}
                >
                  ????ng k??
                </Button>
              </div>
            </div>,
          ]}
          classNameHeader="login-modal__header"
        ></Tabs>

        <ModalCenter
          show={showModal}
          onHide={() => setShowModal(false)}
          handleClose={() => setShowModal(false)}
          message={message}
        ></ModalCenter>
      </div>
    </div>
  );
};
