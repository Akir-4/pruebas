"use client";

import { useState } from 'react';
import Login from './components/Login';
import LoginCompany from './components/LoginCompany';
import CreateAccountPerson from './components/CreateAccountPerson';
import CreateAccountCompany from './components/CreateAccountCompany';

const AccountPage = () => {
  const [view, setView] = useState<'login' | 'login-company' | 'register-person' | 'register-company'>('login');

  // Funciones para cambiar las vistas
  const showLogin = () => setView('login');
  const showLoginCompany = () => setView('login-company');
  const showRegisterPerson = () => setView('register-person');
  const showRegisterCompany = () => setView('register-company');

  // Función para manejar el registro de la empresa
  const handleCompanyRegistrationSuccess = () => {
    setView('login-company'); // Cambia a la vista de login de la empresa
  };

  return (
    <div>
      {view === 'login' && (
        <Login onCompanyLogin={showLoginCompany} onRegisterPerson={showRegisterPerson} />
      )}
      {view === 'login-company' && (
        <LoginCompany onReturnToLogin={showLogin} onRegisterCompany={showRegisterCompany} />
      )}
      {view === 'register-person' && (
        <CreateAccountPerson onLogin={showLogin} />
      )}
      {view === 'register-company' && (
        <CreateAccountCompany onCompanyLogin={handleCompanyRegistrationSuccess} />
      )}


    </div>
  );
};

export default AccountPage;
