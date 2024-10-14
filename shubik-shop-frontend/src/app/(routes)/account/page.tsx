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
        <CreateAccountCompany onCompanyLogin={showLoginCompany} />
      )}

      <div className="pt-4 text-center">
        {view !== 'login' && <button onClick={showLogin}>Iniciar sesión como Persona</button>}
        {view !== 'login-company' && <button onClick={showLoginCompany}>Iniciar sesión como Empresa</button>}
        {view !== 'register-person' && <button onClick={showRegisterPerson}>Crear cuenta como Persona</button>}
        {view !== 'register-company' && <button onClick={showRegisterCompany}>Crear cuenta como Empresa</button>}
      </div>
    </div>
  );
};

export default AccountPage;
