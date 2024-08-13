"use client";

import './navBar.scss';
import { useState, useCallback } from 'react';
import { Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

type DrawerProps = {
    isOpen: boolean;
    onClose: () => void;
};


// Componente DrawerMenu
function DrawerMenu({ isOpen, onClose }: DrawerProps) {
    return (
        <Drawer 
            anchor='left' 
            open={isOpen} 
            onClose={onClose} 
            className='drawer-menu'
            sx={{
                "& .MuiDrawer-paper": {
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, rgba(68, 39, 0, 0.658) 0%, rgba(236, 171, 28, 0.2) 100%)',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                    overflow: 'hidden'
                }
            }}
        >
            <div role="presentation" className='drawer-header'>
                <ul className='drawer-itens' >
                    <li onClick={onClose}> <a href="/hpme">Home</a></li>
                    <li onClick={onClose}> <a href="/filmes">Filmes</a></li>
                    <li onClick={onClose}> <a href="/series">Séries</a></li>
                    <li onClick={onClose}> <a href="/sobre">Sobre</a></li>
                    <li onClick={onClose}> <a href="/contato">Contato</a></li>
                </ul>
            </div>
        </Drawer>
    );
}


export default function Navbar() {
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerOpen = useCallback(() => {
        setDrawerOpen(true);
    }, []);


    const handleDrawerClose = useCallback(() => {
        setDrawerOpen(false);
    }, []);

    return (
        <nav className='navbar'>
            <div className='navbar-header'>
                <MenuIcon 
                    fontSize='large'
                    aria-label='Open menu'
                    className='menu-icon'
                    onClick={handleDrawerOpen}
                />
                <h1 className='page-title'>App Movies</h1>
            </div>
            <DrawerMenu isOpen={isDrawerOpen} onClose={handleDrawerClose}/>
        </nav>
    )
}