import React from 'react';
import RegisterForm from '../components/Auth/RegisterForm';
import LoginForm from '../components/Auth/LoginForm';

function MainPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <RegisterForm />
      <LoginForm />
    </div>
  );
}

export default MainPage;
