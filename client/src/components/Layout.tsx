import React from 'react';
import Navbar from "@/components/Navbar";
import Player from "@/components/Player";
import Head from "next/head";
import cookie from '../assets/cookie.png'

interface IProps {
    title: string
    children: React.ReactElement
}

const Layout: React.FC<IProps> = ({children, title}) => {



    return (
        <>
            <Head>
                <title>{title}</title>
                <link rel="shortcut icon" href={cookie.src} />
            </Head>
            <Navbar/>
            <main>{children}</main>
            <Player
            />
        </>
    );
};

export default Layout;