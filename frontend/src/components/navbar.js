import React from 'react';
import { useAuth } from '../context/AuthContext';

const NavBar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-white text-2xl">Mi Tienda</h1>
                <div className="flex items-center space-x-4">
                    <h2 className="text-white">Barra de navegación</h2>
                    {user ? (
                        <div className="flex items-center space-x-4">
                            <span className="text-white">Hola, {user.name}!</span>
                            <button 
                                onClick={logout} 
                                className="bg-red-500 text-white px-3 py-2 rounded"
                            >
                                Cerrar sesión
                            </button>
                        </div>
                    ) : (
                        <a href="/login" className="text-white">Iniciar sesión</a>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
