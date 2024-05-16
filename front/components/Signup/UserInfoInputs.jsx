import React from 'react';
import { Input } from './styles';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

const UserInfoInputs = ({ register, watch, errors }) => {
  const { signUpStatus } = useSelector(state => state.user);

  return (
    <>
      <Input
        id="email"
        name="email"
        type="email"
        placeholder="아이디"
        {...register('email', {
          required: '이메일은 필수 입력입니다.',
          pattern: {
            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
            message: '이메일 형식에 맞지 않습니다.',
          },
        })}
        validateError={errors.email ? true : false}
      />
      {errors.email ? <div>이메일 형식을 만족하지 않습니다.</div> : null}
      {signUpStatus === '이미 사용중인 아이디입니다.' ? (
        <div>{signUpStatus}</div>
      ) : null}
      <Input
        id="nickname"
        name="nickname"
        type="text"
        placeholder="닉네임"
        {...register('nickname', {
          required: '닉네임은 필수 입력입니다.',
          minLength: {
            value: 2,
            message: '닉네임은 최소 2글자 이상이어야 합니다.',
          },
        })}
        validateError={errors.nickname ? true : false}
      />
      {errors.nickname ? (
        <div>닉네임은 최소 2글자 이상이어야 합니다.</div>
      ) : null}
      <Input
        id="password"
        name="password"
        type="password"
        placeholder="비밀번호"
        {...register('password', {
          required: '비밀번호는 필수 입력입니다.',
          pattern: {
            value:
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i,
            message:
              '비밀번호는 문자, 숫자, 특수문자를 포함한 8자 이상의 형식이여야 합니다.',
          },
        })}
        validateError={errors.password ? true : false}
      />
      {errors.password ? (
        <div>
          비밀번호는 문자, 숫자, 특수문자를 포함한 8자 이상의 형식이여야 합니다.
        </div>
      ) : null}
      <Input
        id="passwordConfirm"
        name="passwordConfirm"
        type="password"
        placeholder="비밀번호 확인"
        {...register('passwordConfirm', {
          required: '비밀번호 확인은 필수 입력입니다.',
          validate: value =>
            value === watch('password') || '비밀번호가 일치하지 않습니다.',
        })}
        validateError={errors.passwordConfirm ? true : false}
      />
      {errors.passwordConfirm ? <div>비밀번호가 일치하지 않습니다.</div> : null}
    </>
  );
};

UserInfoInputs.propTypes = {
  register: PropTypes.func.isRequired,
  watch: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default UserInfoInputs;
